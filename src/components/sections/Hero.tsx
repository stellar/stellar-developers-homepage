import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DotGridBackground } from "@/components/visuals/DotGridBackground";
import { docsUrl } from "@/lib/docs";

// 01 · Hero — V6 Option B (dots only). Figma 1696:6224 / 1679:4918.
// Stats and labels follow the V6 page frame (copy 10/13); the Option B frame's
// shorter labels ("~$0.0007 avg fee") are flagged for the copy pass.
const STATS = [
  { value: "~5s", label: "Settlement time" },
  { value: "<$0.001", label: "Avg. transaction cost" },
  { value: "99.998%", label: "Lifetime network uptime" },
];

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-h1" className="hero">
      <div className="container-page hero__inner">
        <div className="hero__copy">
          <h1 id="hero-h1" className="hero__h1">Build where money already moves around the world</h1>
          <p className="hero__lead">Reliable rails, financial building blocks, and an ecosystem of connected markets.</p>
          <dl className="hero__proof">
            {STATS.map((s) => (
              <div key={s.label} className="hero__stat">
                <dd className="hero__stat-value">{s.value}</dd>
                <dt className="hero__stat-label">{s.label}</dt>
              </div>
            ))}
          </dl>
          <div className="hero__ctas">
            <ButtonLink href={docsUrl("/tools/quickstart")} variant="primary" size="lg" icon={<ArrowRight size={16} weight="bold" aria-hidden />}>
              Get started
            </ButtonLink>
          </div>
        </div>
        <div className="hero__canvas" aria-hidden>
          <DotGridBackground />
        </div>
      </div>
    </section>
  );
}
