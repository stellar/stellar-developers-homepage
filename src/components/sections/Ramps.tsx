import { Icon } from "@stellar/design-system";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PartnerCarousel } from "@/components/ui/PartnerCarousel";
import "./ramps.css";
import { docsUrl } from "@/lib/docs";

// 06 · Ramps — V6 Figma 1679:5357. Copy from the 10/13 deck; partner cards back per Kate (V6 README).
// Partner logos exported from the Figma board (approved per Maz, 15 Oct).
const PARTNERS = [
  { name: "Etherfuse", tagline: "Tokenized sovereign bonds and USD to MXN", logo: "/partners/etherfuse.png", href: "https://www.etherfuse.com" },
  { name: "MoneyGram", tagline: "Cash to USDC and back at retail locations", logo: "/partners/moneygram.png", href: "https://www.moneygram.com" },
  { name: "Ramp Network", tagline: "Card and bank ramps in 150+ countries", logo: "/partners/ramp-network.png", href: "https://ramp.network" },
  { name: "Bitso", tagline: "Local payments and LatAm stablecoins", logo: "/partners/bitso.png", href: "https://bitso.com" },
  { name: "Manteca", tagline: "Ramp and payment APIs across Latin America", logo: "/partners/manteca.png", href: "https://www.manteca.dev" },
  { name: "Koywe", tagline: "Ramps across five Latin American markets", logo: "/partners/koywe.png", href: "https://www.koywe.com" },
];

export function Ramps() {
  return (
    <section id="ramps" aria-labelledby="ramps-h2" className="ramps">
      <div className="container-page ramps__inner">
        <div className="ramps__head">
          <div className="ramps__title">
            <p className="eyebrow">Ramps</p>
            <h2 id="ramps-h2" className="h2">Reach more local markets with every build</h2>
            <p className="pillar__note">Open-access ramps connect your app to cash, bank transfers, and local payment methods.</p>
          </div>
        </div>

        <div className="ramp-grid">
          <PartnerCarousel partners={PARTNERS} />
          <ul className="ramp-row ramp-row--2 nav-list">
            <li>
              <div className="ramp-card ramp-card--static">
                <div className="ramp-card__top">
                  <span className="ramp-card__mark"><Icon.ShieldTick width={20} height={20} aria-hidden /></span>
                </div>
                <div className="ramp-card__copy">
                  <h3 className="ramp-card__title">Build less, deploy around the world</h3>
                  <p className="ramp-card__body">Integrate with local ramp providers to reach users in new markets without building from scratch.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="ramp-card ramp-card--static">
                <div className="ramp-card__top">
                  <span className="ramp-card__mark"><Icon.CurrencyDollarCircle width={20} height={20} aria-hidden /></span>
                </div>
                <div className="ramp-card__copy">
                  <h3 className="ramp-card__title">Settle in local currency</h3>
                  <p className="ramp-card__body">Path payments can convert assets in transit, so senders and recipients can use different currencies.</p>
                </div>
              </div>
            </li>
          </ul>
          <div className="ctas">
            <ButtonLink href={docsUrl("/tools/ramps")} variant="primary" size="lg" icon={<Icon.ArrowRight width={14} height={14} aria-hidden />}>Explore ramp docs</ButtonLink>
            <ButtonLink href="https://www.regionalstarterpack.com/" variant="tertiary" size="lg" icon={<Icon.ArrowRight width={14} height={14} aria-hidden />}>Explore the regional starter pack</ButtonLink>
          </div>
        </div>

      </div>
    </section>
  );
}
