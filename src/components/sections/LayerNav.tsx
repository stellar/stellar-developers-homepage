"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { Icon } from "@stellar/design-system";
import "./layer-nav.css";

// Layer nav · v8 (Figma 2102:16503, behaviour note 2102:18738). Sticky scroll-spy bar for the
// Network → Primitives → Ramps run. Lives inside the `.layers` wrapper so it can only stick there:
// it appears when Network reaches the header and leaves with the wrapper after Ramps.
type Layer = { id: string; label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> };

export const LAYERS: Layer[] = [
  { id: "network", label: "Network", Icon: Icon.Dataflow03 },
  { id: "primitives", label: "Primitives", Icon: Icon.Cube01 },
  { id: "ramps", label: "Ramps", Icon: Icon.SwitchHorizontal01 },
];

export function LayerNav() {
  const [active, setActive] = useState(LAYERS[0].id);
  const [stuck, setStuck] = useState(false); // in flow the bar has its own top rule; stuck, the header's rule takes over
  const bar = useRef<HTMLElement>(null);
  // Active = whichever layer covers the top third of the viewport (below header + bar).
  useEffect(() => {
    const els = LAYERS.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e);
    const pick = () => {
      const line = 128 + (window.innerHeight - 128) / 3;
      let current = LAYERS[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
      setStuck((bar.current?.getBoundingClientRect().top ?? 999) <= 64.5);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => { window.removeEventListener("scroll", pick); window.removeEventListener("resize", pick); };
  }, []);

  // Mobile: the row scrolls horizontally and the active item auto-centres.
  useEffect(() => {
    const el = bar.current?.querySelector<HTMLElement>(`[data-layer="${active}"]`);
    if (el && window.innerWidth < 768) el.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <>
      <nav ref={bar} className={stuck ? "layer-nav is-stuck" : "layer-nav"} aria-label="Layers">
      <div className="container-page layer-nav__row">
        {LAYERS.map((l) => (
          <a key={l.id} href={`#${l.id}`} data-layer={l.id} className="layer-nav__item" aria-current={active === l.id ? "true" : undefined}>
            <span className="layer-tile" aria-hidden><l.Icon width={14} height={14} /></span>
            <span className="layer-nav__label">{l.label}</span>
          </a>
        ))}
      </div>
      </nav>
    </>
  );
}
