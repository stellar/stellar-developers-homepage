"use client";

import { useEffect, useState } from "react";
import { GrainGradient } from "@paper-design/shaders-react";

/**
 * Pattern · Gradient — the grain gradient behind every module graphic.
 * Paper Shaders GrainGradient with Edison's spec: colors #634ec1 #d5cdf9 #d7cbc6,
 * colorBack #000a0f, softness 0.7, intensity 0.24, noise 0.5, shape corners,
 * speed 0.5, scale 1. Standalone, never combined with Dots. Reduced motion: speed 0.
 */
export function GrainGradientBg({ className }: { className?: string }) {
  const [speed, setSpeed] = useState<number | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setSpeed(mq.matches ? 0 : 0.5);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  // Static fallback (SSR / before mount): the three spec colours as a plain gradient over colorBack.
  if (speed === null) {
    return <div className={className} aria-hidden style={{ background: "radial-gradient(120% 90% at 85% 20%, #d5cdf9 0%, #634ec1 45%, #000a0f 100%)" }} />;
  }
  return (
    <GrainGradient
      className={className}
      aria-hidden
      colors={["#634ec1", "#d5cdf9", "#d7cbc6"]}
      colorBack="#000a0f"
      softness={0.7}
      intensity={0.24}
      noise={0.5}
      shape="corners"
      speed={speed}
      scale={1}
      rotation={0}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
