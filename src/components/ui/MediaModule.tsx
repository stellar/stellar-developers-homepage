"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { GrainGradientBg } from "@/components/visuals/GrainGradientBg";

/**
 * Media module (Components v2): Background slot 593 × 480 + fixed Code slot 528 × 372
 * with a 504 × 324 content area, Inconsolata 14/24. The frame is laid out at its
 * design size and scaled to the available width, so panels never reflow.
 */
export function MediaModule({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(672 / 593, e.contentRect.width / 593)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="media" role="img" aria-label={label}>
      <div className="media__frame" style={{ transform: `scale(${scale})` }}>
        <GrainGradientBg className="media__bg" />
        <div className="media__code">
          <div className="media__content">{children}</div>
        </div>
      </div>
    </div>
  );
}
