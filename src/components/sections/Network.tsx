import Link from "next/link";
import { Icon } from "@stellar/design-system";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { MediaModule } from "@/components/ui/MediaModule";
import { LedgerPanel } from "@/components/panels/LedgerPanel";

// 03 · Network — V6 Figma 1679:5132. Copy from the 10/13 deck.
export function Network() {
  return (
    <section id="network" aria-labelledby="network-h2" className="pillar-section">
      <div className="container-page pillar">
        <div className="pillar__copy">
          <p className="eyebrow">Network</p>
          <h2 id="network-h2" className="h2">A foundation of network reliability</h2>
          <ul className="features nav-list">
            <FeatureItem icon={<Icon.BarChart07 width={16} height={16} />} title="Finality in seconds">
              Ledgers close in ~5 seconds, and their transactions are final when they do.
            </FeatureItem>
            <FeatureItem icon={<Icon.Dataflow03 width={16} height={16} />} title="A protocol built on trust">
              The Stellar Consensus Protocol reaches agreement through trusted validators, not mining or staking.
            </FeatureItem>
            <FeatureItem icon={<Icon.ShieldTick width={16} height={16} />} title="Native asset controls">
              Authorization, freeze, and clawback controls are set by the issuer and follow the asset. No contracts required.
            </FeatureItem>
          </ul>
          <Link href="https://developers.stellar.org/docs/learn/fundamentals" className="link-primary">
            Network fundamentals <Icon.ArrowRight width={14} height={14} aria-hidden />
          </Link>
        </div>
        <div className="pillar__media">
          <MediaModule label="Recent mainnet ledgers, sample data">
            <LedgerPanel />
          </MediaModule>
        </div>
      </div>
    </section>
  );
}
