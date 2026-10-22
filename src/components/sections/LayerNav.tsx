import type { ComponentType, SVGProps } from "react";
import { Icon } from "@stellar/design-system";
import "./layer-nav.css";

// Layer nav · v8 (Figma 2102:16503). Three tabs under the hero that jump to Network, Primitives and
// Ramps. Not sticky (Maz, 22 Oct): one pinned bar on the page is enough, so no scroll-spy either.
type Layer = { id: string; label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> };

const LAYERS: Layer[] = [
  { id: "network", label: "Network", Icon: Icon.Dataflow03 },
  { id: "primitives", label: "Primitives", Icon: Icon.Cube01 },
  { id: "ramps", label: "Ramps", Icon: Icon.SwitchHorizontal01 },
];

export function LayerNav() {
  return (
    <nav className="layer-nav" aria-label="Layers">
      <div className="container-page layer-nav__row">
        {LAYERS.map((l) => (
          <a key={l.id} href={`#${l.id}`} className="layer-nav__item">
            <span className="layer-tile" aria-hidden><l.Icon width={14} height={14} /></span>
            <span className="layer-nav__label">{l.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
