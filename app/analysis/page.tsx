"use client";
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import * as pdfjsLib from 'pdfjs-dist';

// Fixed worker loading
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  ).toString();
}
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


type Node = {
  id: string;
  label: string;
  size: number;
};

type Edge = {
  source: string;
  target: string;
  strength: number;
};

export default function AnalysisPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
    multiple: true,
    onDrop: acceptedFiles => setFiles(acceptedFiles),
  });

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      formData
    );
    return response.data.secure_url;
  };

  const extractText = async (file: File) => {
    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => ('str' in item) ? item.str : '').join(' ') + '\n';
      }
      
      return text;
    }
    return await file.text();
  };

  const analyzeDocuments = async () => {
    setIsProcessing(true);
    try {
      // Upload files and extract text
      const contents = await Promise.all(files.map(async file => {
        await uploadToCloudinary(file);
        return extractText(file);
      }));

      // Analyze with Perplexity AI
      const response = await axios.post(
        'https://api.perplexity.ai/chat/completions',
        {
          model: 'sonar',
          messages: [{
            role: 'system',
            content: `Analyze these documents and output a JSON structure with nodes and edges representing key topics and their relationships. Use format: { nodes: { id: string, label: string, size: number }[], edges: { source: string, target: string, strength: number }[] }`
          }, {
            role: 'user',
            content: contents.join('\n\n')
          }]
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const analysis = JSON.parse(response.data.choices[0].message.content);
      setNodes(analysis.nodes);
      setEdges(analysis.edges);
    } catch (err) {
      setError('Error processing files. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Document Analysis System</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div {...getRootProps()} className="border-2 border-dashed p-4 text-center">
            <input {...getInputProps()} />
            <Button variant="outline">Upload Documents (PDF/TXT)</Button>
            <p className="mt-2 text-sm text-muted-foreground">
              {files.length > 0 
                ? `${files.length} files selected` 
                : 'Drag & drop files or click to select'}
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isProcessing && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="h-2" />
              <p className="mt-2 text-sm">Processing documents...</p>
            </div>
          )}

          {nodes.length > 0 && (
            <div className="mt-8 h-[600px] relative">
              <Canvas camera={{ position: [0, 0, 50], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                
                {nodes.map((node, i) => (
                  <TopicNode 
                    key={node.id}
                    node={node}
                    position={new THREE.Vector3(
                      Math.cos((i * Math.PI * 2) / nodes.length) * 20,
                      Math.sin((i * Math.PI * 2) / nodes.length) * 20,
                      0
                    )}
                  />
                ))}

                {edges.map((edge, i) => {
                  const sourceNode = nodes.find(n => n.id === edge.source);
                  const targetNode = nodes.find(n => n.id === edge.target);
                  if (!sourceNode || !targetNode) return null;
                  
                  return (
                    <Line
                      key={i}
                      points={[
                        [sourceNode.size * 2, 0, 0],
                        [targetNode.size * 2, 0, 0]
                      ]}
                      color="white"
                      lineWidth={edge.strength}
                    />
                  );
                })}

                <OrbitControls enableZoom={true} />
              </Canvas>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button 
            onClick={analyzeDocuments}
            disabled={files.length === 0 || isProcessing}
            className="w-full"
          >
            Analyze Documents
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function TopicNode({ node, position }: { node: Node; position: THREE.Vector3 }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <mesh 
      position={position}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[node.size]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      <Text
        position={[0, 0, node.size + 1]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.label}
      </Text>
    </mesh>
  );
}