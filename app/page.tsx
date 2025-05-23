"use client";

import { CalendarIcon, HomeIcon, MailIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { OrbitingCirclesDemo } from "../components/comp/orbit";
import { LineShadowTextDemo } from "../components/comp/shadowtext";
import { NumberTickerDemo } from "../components/comp/numticker";
import { MorphingTextDemo } from "../components/comp/textmorph";
import { FloatingDockDemo } from "../components/comp/dock";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { ContactForm } from "../components/comp/contact-form";
import { Button } from "@/components/ui/button";
import { PricingCard } from "../components/comp/pricing-card";
import { FeatureSection } from "../components/comp/feature-section";
import { IntroDisclosureDemo } from "../components/comp/introdisclosure";
import { SidePanel } from "@/components/ui/side-panel"
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';



function NavbarDemo() {
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Contact", link: "#contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <NavbarButton as="button">Login</NavbarButton>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <NavbarButton as="button" variant="primary">
            Book a call
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Login
            </NavbarButton>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Book a call
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  calendar: (props: IconProps) => <CalendarIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  x: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    </svg>
  ),
  youtube: (props: IconProps) => (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M29.41,9.26a3.5,3.5,0,0,0-2.47-2.47C24.76,6.2,16,6.2,16,6.2s-8.76,0-10.94.59A3.5,3.5,0,0,0,2.59,9.26,36.13,36.13,0,0,0,2,16a36.13,36.13,0,0,0,.59,6.74,3.5,3.5,0,0,0,2.47,2.47C7.24,25.8,16,25.8,16,25.8s8.76,0,10.94-.59a3.5,3.5,0,0,0,2.47-2.47A36.13,36.13,0,0,0,30,16,36.13,36.13,0,0,0,29.41,9.26ZM13.2,20.2V11.8L20.47,16Z" />
    </svg>
  ),
  github: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      />
    </svg>
  ),
};

const DATA = {
  navbar: [
    { href: "#", icon: HomeIcon, label: "Home" },
    { href: "#", icon: PencilIcon, label: "Blog" },
  ],
  contact: {
    social: {
      GitHub: { name: "GitHub", url: "#", icon: Icons.github },
      LinkedIn: { name: "LinkedIn", url: "#", icon: Icons.linkedin },
      X: { name: "X", url: "#", icon: Icons.x },
      email: { name: "Send Email", url: "#", icon: Icons.email },
    },
  },
};
const PLANS = [
  {
    title: "Monthly",
    price: "$5",
    duration: "month",
    features: [
      "Full access to all features",
      "Basic AI tools",
      "1GB Cloud Storage",
      "Email Support",
      "Regular Updates"
    ]
  },
  {
    title: "Annual",
    price: "$15",
    duration: "year",
    recommended: true,
    features: [
      "Everything in Monthly plus:",
      "Advanced AI tools",
      "5GB Cloud Storage",
      "Priority Support",
      "Exclusive Features",
      "Save 70% vs monthly"
    ]
  },
  {
    title: "3 Years",
    price: "$25",
    duration: "3 years",
    features: [
      "Everything in Annual plus:",
      "Premium AI tools",
      "15GB Cloud Storage",
      "24/7 VIP Support",
      "Early Access to Beta Features",
      "Save 83% vs monthly"
    ]
  }
];



export default function Home() {

  const [isOpen, setIsOpen] = useState(false)
 
  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const renderOpenButton = (handleToggle: () => void) => (
    <div
      className={cn(
        "flex items-center w-full justify-start pr-4 md:pl-4 py-1 md:py-1",
        isOpen ? "pr-3" : ""
      )}
    >
      <p className="text-xl font-black tracking-tight text-gray-900 sm:text-3xl">
        <span className="bg-gradient-to-t from-neutral-200 to-stone-300 bg-clip-text font-brand text-xl font-bold text-transparent sm:text-6xl">
          Open
        </span>
      </p>
      <Button
        className="rounded-r-[33px] py-8 ml-2 "
        onClick={handleIsOpen}
        variant="secondary"
      >
        {isOpen ? "close" : "open"}
      </Button>
    </div>
  )
  
  return (
    <div className="flex flex-col items-center justify-center pb-24 w-full">
    <NavbarDemo />

    {/* Hero Section */}
    <div className="flex-1 flex items-center justify-center w-full mt-40 md:mt-30">
      <div className="mx-auto max-w-screen-lg text-center w-full px-4 mt-30">
        <MorphingTextDemo />
        <a href="/try" className="mt-50 inline-block">
          <Button size="lg" className="text-lg px-8 py-6">
            Try Now - It's Free
          </Button>
        </a>
      </div>
    </div>

    {/* Stats Section */}
    <div className="relative h-48 md:h-64 w-full max-w-2xl mx-auto my-8">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full rounded-2xl"
        squareSize={2}
        gridGap={4}
        color="#6B7280"
        maxOpacity={0.3}
        flickerChance={0.05}
        height={300}
        width={700}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
        <LineShadowTextDemo />
        <span className="whitespace-pre-wrap text-4xl md:text-6xl tracking-tighter font-light text-black dark:text-white">
          <NumberTickerDemo />+ Students Using
        </span>
      </div>
    </div>

      <OrbitingCirclesDemo />

     {/* Features Section */}
     <FeatureSection />

     {/* Pricing Section */}
     <section className="w-full px-4 md:px-0 mt-20 mb-20" id="pricing">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
    Flexible Pricing Plans
  </h2>
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {PLANS.map((plan) => (
      <PricingCard
        key={plan.title}
        className={plan.recommended ? "border-primary/20" : ""}
        title={plan.title}
        price={plan.price}
        duration={plan.duration}
        features={plan.features}
        recommended={plan.recommended}
      />
    ))}
  </div>

</section>

<IntroDisclosureDemo/>

    {/* Contact Section */}
    <section className="w-full max-w-2xl px-4 md:px-0 mt-20 mb-40">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Get in Touch
      </h2>
      <div className="bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-2xl shadow-lg">
        <ContactForm />
      </div>
    </section>

    

    {/* Fixed Bottom Dock */}
    <div className="fixed bottom-14 left-0 right-0 z-50">
      <FloatingDockDemo />
    </div>
  </div>
   );
}