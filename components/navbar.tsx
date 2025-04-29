"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed left-1/2 top-4 z-50 h-16 w-[95%] max-w-screen -translate-x-1/2 ",
        "border border-white/20 bg-white/10  ",
        "dark:border-white/10 dark:bg-black/10"
      )}
    >
      <div className="flex h-full items-center justify-center">
        <h1 className="text-2xl font-semibold text-black tracking-tight">
          F L 0 W A I   
        </h1>
      </div>
    </motion.nav>
  );
}