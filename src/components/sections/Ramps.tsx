import Image from "next/image";
import Link from "next/link";
import { Icon } from "@stellar/design-system";
import { ButtonLink } from "@/components/ui/ButtonLink";
import "./ramps.css";

// 06 · Ramps — V6 Figma 1679:5357. Copy from the 10/13 deck; partner cards back per Kate (V6 README).
// Partner logos exported from the Figma board (approved per Maz, 15 Oct).
const PARTNERS = [
  { name: "Bitso", logo: "/partners/bitso.png", href: "https://bitso.com" },
  { name: "MoneyGram", logo: "/partners/moneygram.png", href: "https://www.moneygram.com" },
  { name: "Ramp Network", logo: "/partners/ramp-network.png", href: "https://ramp.network" },
  { name: "Etherfuse", logo: "/partners/etherfuse.png", href: "https://www.etherfuse.com" },
  { name: "Manteca", logo: "/partners/manteca.png", href: "https://www.manteca.dev" },
  { name: "Koywe", logo: "/partners/koywe.png", href: "https://www.koywe.com" },
];

const PARTNER_CARDS = [
  { name: "Etherfuse", tagline: "Pre-built connectors", logo: "/partners/etherfuse.png", href: "https://www.etherfuse.com" },
  { name: "MoneyGram", tagline: "API-first workflows", logo: "/partners/moneygram.png", href: "https://www.moneygram.com" },
  { name: "Ramp Network", tagline: "Connect instantly", logo: "/partners/ramp-network.png", href: "https://ramp.network" },
];

export function Ramps() {
  return (
    <section id="ramps" aria-labelledby="ramps-h2" className="ramps">
      <div className="container-page ramps__inner">
        <div className="ramps__head">
          <div className="ramps__title">
            <p className="eyebrow">Ramps</p>
            <h2 id="ramps-h2" className="h2">Reach more local markets with every build</h2>
          </div>
          <div className="ramps__lead">
            <p className="pillar__note">Open-access ramps connect your app to cash, bank transfers, and local payment methods.</p>
            <ul className="logo-strip nav-list" aria-label="Ramp partners">
              {PARTNERS.map((p) => (
                <li key={p.name}>
                  <a href={p.href} className="logo-slot" target="_blank" rel="noreferrer">
                    <Image src={p.logo} alt="" width={22} height={22} className="logo-slot__img" />
                    <span>{p.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ramp-grid">
          <ul className="ramp-row ramp-row--3 nav-list">
            {PARTNER_CARDS.map((c) => (
              <li key={c.name}>
                <a href={c.href} className="ramp-card" target="_blank" rel="noreferrer">
                  <div className="ramp-card__top">
                    <Image src={c.logo} alt="" width={40} height={40} className="ramp-card__logo" />
                    <Icon.ArrowUpRight width={16} height={16} aria-hidden className="ramp-card__ext" />
                  </div>
                  <div className="ramp-card__copy">
                    <h3 className="ramp-card__title">{c.name}</h3>
                    <p className="ramp-card__body">{c.tagline}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <ul className="ramp-row ramp-row--2 nav-list">
            <li>
              <Link href="/docs/learn/fundamentals/anchors/" className="ramp-card">
                <div className="ramp-card__top">
                  <span className="ramp-card__mark"><Icon.ShieldTick width={20} height={20} aria-hidden /></span>
                  <Icon.ArrowUpRight width={16} height={16} aria-hidden className="ramp-card__ext" />
                </div>
                <div className="ramp-card__copy">
                  <h3 className="ramp-card__title">Build less, deploy around the world</h3>
                  <p className="ramp-card__body">Providers handle local compliance and KYC, so you can expand without rebuilding.</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/docs/build/guides/transactions/" className="ramp-card">
                <div className="ramp-card__top">
                  <span className="ramp-card__mark"><Icon.CurrencyDollarCircle width={20} height={20} aria-hidden /></span>
                  <Icon.ArrowUpRight width={16} height={16} aria-hidden className="ramp-card__ext" />
                </div>
                <div className="ramp-card__copy">
                  <h3 className="ramp-card__title">Settle in local currency</h3>
                  <p className="ramp-card__body">Path payments can convert assets in transit, so senders and recipients can use different currencies.</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <div className="ctas">
          <ButtonLink href="/docs/tools/ramps/" variant="tertiary" size="md" icon={<Icon.ArrowRight width={14} height={14} aria-hidden />}>Explore ramp docs</ButtonLink>
          {/* Destination TBC: no "regional starter pack" page exists in the docs yet. Pointing at the ramps overview until DevRel confirms. */}
          <ButtonLink href="/docs/tools/ramps/" variant="tertiary" size="md" icon={<Icon.ArrowRight width={14} height={14} aria-hidden />}>Explore the regional starter pack</ButtonLink>
        </div>
      </div>
    </section>
  );
}
