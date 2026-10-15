import { Icon } from "@stellar/design-system";
import { GrainGradientBg } from "@/components/visuals/GrainGradientBg";
import "./ecosystem-loop.css";

/**
 * Flow viz · Ecosystem loop (Centre = Your app). Figma 1530:4092.
 * Assets, Markets and Liquidity sit on a lilac ring with flow dots between them,
 * around "Your app" in lilac-09. Connectors draw in sequence, 600 ms each; static
 * under prefers-reduced-motion. Markup: ordered list + visually-hidden summary.
 * Geometry is the design's 593 × 480 frame; the module is scaled by its parent.
 */
const CX = 296.5, CY = 240, R = 172;
const pt = (deg: number) => ({ x: CX + R * Math.cos((deg * Math.PI) / 180), y: CY + R * Math.sin((deg * Math.PI) / 180) });
const arc = (a: number, b: number) => { const p = pt(a), q = pt(b); return `M ${p.x} ${p.y} A ${R} ${R} 0 0 1 ${q.x} ${q.y}`; };
// Nodes at -90° (top), 30° (bottom right), 150° (bottom left); arcs run clockwise between them.
const ARCS = [arc(-90, 30), arc(30, 150), arc(150, 270)];
const DOTS = [pt(-30), pt(90), pt(210)];

const NODES = [
  { key: "assets", label: "Assets", Icon: Icon.CoinsStacked01, left: 208.5, top: 26 },
  { key: "markets", label: "Markets", Icon: Icon.LineChartUp01, left: 67.61, top: 296.66 },
  { key: "liquidity", label: "Liquidity", Icon: Icon.SwitchHorizontal01, left: 349.39, top: 296.66 },
];

export function EcosystemLoop() {
  return (
    <div className="loop" role="group" aria-label="Ecosystem loop">
      <GrainGradientBg className="loop__bg" />
      <svg className="loop__ring" viewBox="0 0 593 480" aria-hidden focusable="false">
        {ARCS.map((d, i) => <path key={i} d={d} pathLength={1} className="loop__arc" style={{ animationDelay: `${i * 0.6}s` }} />)}
        {DOTS.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={5} className="loop__dot" style={{ animationDelay: `${0.3 + i * 0.6}s` }} />)}
      </svg>
      <ol className="loop__nodes">
        {NODES.map((n, i) => (
          <li key={n.key} className="loop__node" style={{ left: n.left, top: n.top, animationDelay: `${0.2 + i * 0.6}s` }}>
            <n.Icon width={24} height={24} aria-hidden />
            <span>{n.label}</span>
          </li>
        ))}
      </ol>
      <div className="loop__hub" aria-hidden>
        <Icon.CodeBrowser width={24} height={24} />
        <span>Your app</span>
      </div>
      <p className="sr-only">Assets, markets and liquidity form a loop around your app: assets are deposited as collateral in markets, markets are priced and exited through liquidity venues, and liquidity makes assets convertible and usable.</p>
    </div>
  );
}
