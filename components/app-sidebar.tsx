"use client";

import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  FileText, 
  MessageSquare, 
  GitBranch, 
  Brain,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const sidebarNavItems = [
  {
    title: "Upload",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    title: "File Manager",
    href: "/dashboard/files",
    icon: FileText,
  },
  {
    title: "Chat with PDF",
    href: "/dashboard/chat",
    icon: MessageSquare,
  },
  {
    title: "Flowchart PDF",
    href: "/dashboard/flowchart",
    icon: GitBranch,
  },
  {
    title: "FlowAI",
    href: "/dashboard/flowai",
    icon: Brain,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">F L 0 W A I</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarNavItems.map((item) => (
            <SidebarMenuItem
              key={item.href}
              href={item.href}
              active={pathname === item.href}
              icon={<item.icon className="h-4 w-4" />}
            >
              {item.title}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-4 p-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
} 