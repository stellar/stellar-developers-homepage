"use client";

import { useSyncExternalStore, type ComponentType, type SVGProps } from "react";
import { Icon } from "@stellar/design-system";
import "./layer-nav.css";

// Layer nav · v8 (Figma 2102:16503). Three tabs under the hero that jump to Network, Primitives and
// Ramps. Not sticky and no scroll-spy (Maz, 22 Oct): the highlighted tile is the last one chosen,
// Network by default, so it behaves like a tab strip rather than a position indicator.
type Layer = { id: string; label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> };

const LAYERS: Layer[] = [
  { id: "network", label: "Network", Icon: Icon.Dataflow03 },
  { id: "primitives", label: "Primitives", Icon: Icon.Cube01 },
  { id: "ramps", label: "Ramps", Icon: Icon.SwitchHorizontal01 },
];

// The URL hash is the source of truth: clicking a tab sets it, arriving on /#primitives selects that tab.
const subscribeHash = (cb: () => void) => { window.addEventListener("hashchange", cb); return () => window.removeEventListener("hashchange", cb); };
const readHash = () => window.location.hash.slice(1);

export function LayerNav() {
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const selected = LAYERS.some((l) => l.id === hash) ? hash : LAYERS[0].id;

  return (
    <nav className="layer-nav" aria-label="Layers">
      <div className="container-page layer-nav__row">
        {LAYERS.map((l) => (
          <a key={l.id} href={`#${l.id}`} className="layer-nav__item" aria-current={selected === l.id ? "true" : undefined}>
            <span className="layer-tile" aria-hidden><l.Icon width={14} height={14} /></span>
            <span className="layer-nav__label">{l.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
