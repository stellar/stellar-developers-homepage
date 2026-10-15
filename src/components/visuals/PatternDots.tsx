"use client";

import { useEffect, useState } from "react";
import { DotGrid } from "@paper-design/shaders-react";

/**
 * Pattern · Dots — one of the two background sources in the developer brand
 * (never combined with the Gradient). Paper Shaders DotGrid with Edison's
 * values: circle · size 7 · gap 72 × 72 · stroke 0 · sizeRange 1 ·
 * opacityRange 0.92 · rotation 180. Colours are read from SDS tokens at
 * runtime so the pattern follows the light/dark theme class.
 */
export function PatternDots({ back = "--clr-dev-surface-deep", fill = "--sds-clr-dev-dot-grid", className }: { back?: string; fill?: string; className?: string }) {
  const [colors, setColors] = useState<{ back: string; fill: string } | null>(null);

  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      setColors({ back: cs.getPropertyValue(back).trim() || "#20134b", fill: cs.getPropertyValue(fill).trim() || "#aa99ec" });
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, [back, fill]);

  if (!colors) return <div className={className} aria-hidden style={{ background: `var(${back})` }} />;
  return (
    <DotGrid
      className={className}
      aria-hidden
      colorBack={colors.back}
      colorFill={colors.fill}
      colorStroke={colors.fill}
      size={7}
      gapX={72}
      gapY={72}
      strokeWidth={0}
      sizeRange={1}
      opacityRange={0.92}
      rotation={180}
      shape="circle"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
