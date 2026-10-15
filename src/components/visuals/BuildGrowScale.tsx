import { Icon } from "@stellar/design-system";
import { GrainGradientBg } from "@/components/visuals/GrainGradientBg";
import "./build-grow-scale.css";

/**
 * Flow viz · Build Grow Scale (Kate, 9 Oct). Figma 1678:4882.
 * Three glass nodes in a vertical ladder over the Gradient, connectors with end dots.
 * Connectors draw in sequence, 600 ms each; static under reduced motion. Ordered list.
 */
const STEPS = [
  { label: "Build", Icon: Icon.Code02, top: 62 },
  { label: "Grow", Icon: Icon.LineChartUp01, top: 198 },
  { label: "Scale", Icon: Icon.Dataflow03, top: 334 },
];

export function BuildGrowScale() {
  return (
    <div className="ladder" role="group" aria-label="Support ladder: Build, Grow, Scale">
      <GrainGradientBg className="ladder__bg" />
      <svg className="ladder__lines" viewBox="0 0 593 480" aria-hidden focusable="false">
        {[146, 282].map((y, i) => (
          <g key={y}>
            <line x1={296} y1={y} x2={296} y2={y + 52} pathLength={1} className="ladder__line" style={{ animationDelay: `${0.4 + i * 0.6}s` }} />
            <circle cx={296} cy={y} r={4} className="ladder__dot" style={{ animationDelay: `${0.4 + i * 0.6}s` }} />
            <circle cx={296} cy={y + 52} r={4} className="ladder__dot" style={{ animationDelay: `${0.9 + i * 0.6}s` }} />
          </g>
        ))}
      </svg>
      <ol className="ladder__nodes">
        {STEPS.map((s, i) => (
          <li key={s.label} className="ladder__node" style={{ top: s.top, animationDelay: `${i * 0.6}s` }}>
            <s.Icon width={24} height={24} aria-hidden />
            <span>{s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
