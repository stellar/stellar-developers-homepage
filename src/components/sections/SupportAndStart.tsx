import Link from "next/link";
import { Icon } from "@stellar/design-system";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { VizModule } from "@/components/ui/VizModule";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BuildGrowScale } from "@/components/visuals/BuildGrowScale";
import "./support-start.css";
import { docsUrl } from "@/lib/docs";

// 08 · Support + 09 · Developer Previews + 10 · Start building — V6 Figma 1679:5675.
export function SupportAndStart() {
  return (
    <section className="support" aria-label="Support, developer previews and start building">
      <div className="container-page support__inner">
        <div id="support" className="pillar pillar--media-left">
          <div className="pillar__copy">
            <p className="eyebrow">Support</p>
            <h2 className="h2">Support that scales with you</h2>
            <ul className="features nav-list">
              <FeatureItem icon={<Icon.Code02 width={16} height={16} />} title="Build">Funding to bring your project to life.</FeatureItem>
              <FeatureItem icon={<Icon.LineChartUp01 width={16} height={16} />} title="Grow">Support to drive adoption and reach.</FeatureItem>
              <FeatureItem icon={<Icon.Dataflow03 width={16} height={16} />} title="Scale">Potential investment to accelerate growth.</FeatureItem>
            </ul>
            <p className="pillar__note">Explore the Stellar Community Fund, Marketing Grants, and other funding opportunities for projects building on Stellar.</p>
            <div className="ctas">
              <ButtonLink href="https://stellar.org/grants-and-funding" variant="primary" size="md" icon={<Icon.ArrowRight width={14} height={14} aria-hidden />}>See Programs</ButtonLink>
            </div>
          </div>
          <div className="pillar__media">
            <VizModule><BuildGrowScale /></VizModule>
          </div>
        </div>

        <div className="support__cards">
          {/* 09 · Developer Previews. Feed = stellar.org blog filtered to Developer Previews (URL to confirm with Adam). */}
          <div id="previews" className="card-previews">
            <p className="eyebrow eyebrow--lilac">Developer Previews</p>
            <h2 className="card-previews__h2">What’s coming to the network</h2>
            <p className="pillar__note">Previews showcase the latest developer tooling releases, feature updates and protocol capabilities.</p>
            <Link href="https://stellar.org/blog/developers/" className="link-primary">All developer previews <Icon.ArrowRight width={14} height={14} aria-hidden /></Link>
          </div>
          {/* 10 · Start building (reversed) */}
          <div id="start" className="card-start">
            <h2 className="card-start__h2">Start building</h2>
            <p className="card-start__lead">Install the Stellar CLI, fund a testnet account, add trustlines and send your first payment in minutes.</p>
            <div className="ctas">
              <ButtonLink href={docsUrl("/tools/quickstart")} variant="primary" size="lg" icon={<Icon.ArrowRight width={14} height={14} aria-hidden />}>Quickstart</ButtonLink>
              <ButtonLink href="https://discord.gg/Q2xfSRAhS" variant="tertiary" size="lg" icon={<Icon.ArrowUpRight width={14} height={14} aria-hidden />}>Join the community</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
