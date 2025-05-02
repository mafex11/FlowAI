import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cabin_Sketch } from 'next/font/google';
import { AuthProviders } from "@/components/providers";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cabinSketch = Cabin_Sketch({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cabin-sketch',
});

export const metadata: Metadata = {
  title: "FlowAI - Smart Note Management",
  description: "AI-powered note organization and workflow optimization platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${cabinSketch.variable}`}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}