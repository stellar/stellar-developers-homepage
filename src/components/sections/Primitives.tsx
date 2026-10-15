import { Icon } from "@stellar/design-system";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { MediaModule } from "@/components/ui/MediaModule";
import { PrimitivesTabs } from "@/components/panels/PrimitivesTabs";

// 04 · Primitives — V6 Figma 1679:5280 (media left). Copy from the 10/13 deck.
// Figma uses lock-01 for both Transactions and Privacy; Transactions gets switch-horizontal-01 here (flagged).
export function Primitives() {
  return (
    <section id="primitives" aria-labelledby="primitives-h2" className="pillar-section pillar-section--alt">
      <div className="container-page pillar pillar--media-left">
        <div className="pillar__copy">
          <p className="eyebrow">Primitives</p>
          <h2 id="primitives-h2" className="h2">Built-in primitives, extendable contracts</h2>
          <ul className="features nav-list">
            <FeatureItem icon={<Icon.CoinsStacked01 width={16} height={16} />} title="Tokens" link={{ label: "Tokens docs", href: "https://developers.stellar.org/docs/tokens" }}>
              Stellar Classic assets with issuer controls, built in. Stablecoins, RWAs, vaults and custom tokens from audited implementations.
            </FeatureItem>
            <FeatureItem icon={<Icon.Key01 width={16} height={16} />} title="Accounts and auth" link={{ label: "Contract accounts", href: "https://developers.stellar.org/docs/build/guides/contract-accounts" }}>
              Multisig, built in. Passkeys, smart wallets, session keys, delegated authorization and spending limits as smart contracts.
            </FeatureItem>
            <FeatureItem icon={<Icon.SwitchHorizontal01 width={16} height={16} />} title="Transactions" link={{ label: "Transactions docs", href: "https://developers.stellar.org/docs/build/guides/transactions" }}>
              Payments that convert to another asset on the way, fee sponsorship and sponsored reserves, built in. Contract calls on top.
            </FeatureItem>
            <FeatureItem icon={<Icon.Lock01 width={16} height={16} />} title="Privacy" link={{ label: "Privacy docs", href: "https://developers.stellar.org/docs/build/apps/privacy" }}>
              Native cryptography, built in. Implementations for Confidential Tokens and Private Payments.
            </FeatureItem>
          </ul>
        </div>
        <div className="pillar__media">
          <MediaModule label="Primitives code examples: built-in operations and smart contract crates">
            <PrimitivesTabs />
          </MediaModule>
        </div>
      </div>
    </section>
  );
}
