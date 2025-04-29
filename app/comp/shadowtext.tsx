"use client";

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { useTheme } from "next-themes";

export function LineShadowTextDemo() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return (
    <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
      Learn
      <LineShadowText className="italic" shadowColor={shadowColor}>
        Fast
      </LineShadowText>
    </h1>
  );
}
