"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Scales a 593 × 480 design-frame graphic (flow vizes) to the available width, like MediaModule. */
export function VizModule({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / 593)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="media">
      <div className="media__frame" style={{ transform: `scale(${scale})` }}>{children}</div>
    </div>
  );
}
