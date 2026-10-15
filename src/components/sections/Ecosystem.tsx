import { Icon } from "@stellar/design-system";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { VizModule } from "@/components/ui/VizModule";
import { EcosystemLoop } from "@/components/visuals/EcosystemLoop";

// 07 · Ecosystem — V6 Figma 1679:5377 (media right). Copy from the 10/13 deck.
export function Ecosystem() {
  return (
    <section id="ecosystem" aria-labelledby="ecosystem-h2" className="pillar-section">
      <div className="container-page pillar">
        <div className="pillar__copy">
          <p className="eyebrow">Ecosystem</p>
          <h2 id="ecosystem-h2" className="h2">A complete financial ecosystem</h2>
          <ul className="features nav-list">
            <FeatureItem icon={<Icon.CoinsStacked01 width={16} height={16} />} title="Assets with real world utility" link={{ label: "Explore assets", href: "/docs/tokens/" }}>
              Choose from stablecoins and local- and U.S. dollar-denominated permissionless RWAs.
            </FeatureItem>
            <FeatureItem icon={<Icon.LineChartUp01 width={16} height={16} />} title="Active markets" link={{ label: "Explore markets", href: "https://stellar.org/ecosystem/projects" }}>
              Integrate lending, credit, vaults, and derivatives protocols.
            </FeatureItem>
            <FeatureItem icon={<Icon.SwitchHorizontal01 width={16} height={16} />} title="Liquidity options" link={{ label: "Learn about liquidity on Stellar", href: "/docs/learn/fundamentals/liquidity-on-stellar-sdex-liquidity-pools/" }}>
              Access liquidity on Stellar and across other networks through DEXs, AMMs, and aggregators.
            </FeatureItem>
          </ul>
        </div>
        <div className="pillar__media">
          <VizModule>
            <EcosystemLoop />
          </VizModule>
        </div>
      </div>
    </section>
  );
}
