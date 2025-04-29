// app/comp/feature-section.tsx
import { cn } from "@/lib/utils";
import { RocketIcon, UploadIcon, MagnifyingGlassIcon, LightningBoltIcon, FileTextIcon } from "@radix-ui/react-icons";
import { FaHashtag } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa6";

const features = [
  {
    icon: <UploadIcon className="h-8 w-8" />,
    title: "Smart Note Upload & Parsing",
    description: [
      "Support PDFs, Word, and image files (with OCR)",
      "Extract clean, structured text from notes",
      "Foundation for all downstream features"
    ]
  },
  {
    icon: <FaRegFolderOpen className="h-8 w-8" />,
    title: "Auto-Organization by Course Code/Topics",
    description: [
      "Use NLP to detect subject names, module headers",
      "Automatically group notes under courses/modules",
      "Makes notes browsable and searchable"
    ]
  },
  {
    icon: <MagnifyingGlassIcon className="h-8 w-8" />,
    title: "Search Function (Keyword + Semantic)",
    description: [
      "Search for terms, phrases, or questions",
      "Match based on keywords and related meaning",
      "Saves time finding exact content"
    ]
  },
  {
    icon: <LightningBoltIcon className="h-8 w-8" />,
    title: "Mind Map Generator for Topics",
    description: [
      "Extract main topics and subtopics from notes",
      "Visualize hierarchy and relationships",
      "Great for understanding interconnections"
    ]
  },
  {
    icon: <FaHashtag className="h-8 w-8" />,
    title: "Tagging & Highlighting Key Concepts",
    description: [
      "Detect and tag definitions/formulas",
      "Highlight exam-important content",
      "Enhances readability and review"
    ]
  },
  {
    icon: <FileTextIcon className="h-8 w-8" />,
    title: "Auto-Summary of Notes",
    description: [
      "Summarize long notes into concise overviews",
      "Display summaries per note/topic/module",
      "Efficient for last-minute revision"
    ]
  }
];

export function FeatureSection() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🚀 Top 6 Features to Start With
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for effective note management and learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <ul className="space-y-2 pl-2">
                {feature.description.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-primary">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}