import { Icon } from "@stellar/design-system";
import { GrainGradientBg } from "@/components/visuals/GrainGradientBg";
import "./ecosystem-loop.css";

/**
 * Flow viz · Ecosystem loop (Centre = Your app). Figma 1530:4092, corrections 15 Oct (note 07):
 * the ring is cut 6 px from each glass card, a travelling dot runs on the hidden full circle,
 * and dots render above the line and the cards. Connectors draw in sequence; static under
 * prefers-reduced-motion. Geometry is the design's 593 × 480 frame; the parent scales it.
 */
const CX = 296.5, CY = 240, R = 172, GAP = 6;
const NODES = [
  { key: "assets", label: "Assets", Icon: Icon.CoinsStacked01, left: 208.5, top: 26 },
  { key: "markets", label: "Markets", Icon: Icon.LineChartUp01, left: 67.61, top: 296.66 },
  { key: "liquidity", label: "Liquidity", Icon: Icon.SwitchHorizontal01, left: 349.39, top: 296.66 },
];
const W = 176, H = 84;
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (deg: number) => ({ x: CX + R * Math.cos(rad(deg)), y: CY + R * Math.sin(rad(deg)) });
const insideCard = (deg: number) => {
  const p = pt(deg);
  return NODES.some((n) => p.x >= n.left - GAP && p.x <= n.left + W + GAP && p.y >= n.top - GAP && p.y <= n.top + H + GAP);
};
// Visible arcs = runs of angles outside every (card + 6 px). Sampled at 0.25°.
function visibleArcs(): string[] {
  const step = 0.25, arcs: string[] = [];
  let start: number | null = null;
  const flush = (a: number, b: number) => { const p = pt(a), q = pt(b); const large = b - a > 180 ? 1 : 0; arcs.push(`M ${p.x.toFixed(2)} ${p.y.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${q.x.toFixed(2)} ${q.y.toFixed(2)}`); };
  for (let d = -90; d <= 270; d += step) {
    const out = !insideCard(d);
    if (out && start === null) start = d;
    if ((!out || d >= 270) && start !== null) { flush(start, out ? d : d - step); start = null; }
  }
  return arcs;
}
const ARCS = visibleArcs();
const DOTS = [pt(-30), pt(90), pt(210)];

export function EcosystemLoop() {
  return (
    <div className="loop" role="group" aria-label="Ecosystem loop">
      <GrainGradientBg className="loop__bg" />
      <svg className="loop__ring" viewBox="0 0 593 480" aria-hidden focusable="false">
        {ARCS.map((d, i) => <path key={i} d={d} pathLength={1} className="loop__arc" style={{ animationDelay: `${i * 0.6}s` }} />)}
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
      {/* Dots layer sits above the cards. The traveller follows the hidden full circle. */}
      <svg className="loop__dots" viewBox="0 0 593 480" aria-hidden focusable="false">
        {DOTS.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={5} className="loop__dot" style={{ animationDelay: `${0.3 + i * 0.6}s` }} />)}
      </svg>
      <span className="loop__traveller" aria-hidden />
      <p className="sr-only">Assets, markets and liquidity form a loop around your app: assets are deposited as collateral in markets, markets are priced and exited through liquidity venues, and liquidity makes assets convertible and usable.</p>
    </div>
  );
}
