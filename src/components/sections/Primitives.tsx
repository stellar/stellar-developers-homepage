import { Icon } from "@stellar/design-system";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { MediaModule } from "@/components/ui/MediaModule";
import { PrimitivesTabs } from "@/components/panels/PrimitivesTabs";
import { docsUrl } from "@/lib/docs";

// 04 · Primitives — V6 Figma 1679:5280 (media left). Copy from the 10/13 deck.
// Figma uses lock-01 for both Transactions and Privacy; Transactions gets switch-horizontal-01 here (flagged).
export function Primitives() {
  return (
    <section id="primitives" aria-labelledby="primitives-h2" className="pillar-section">
      <div className="container-page pillar pillar--media-left">
        <div className="pillar__copy">
          <p className="eyebrow">Primitives</p>
          <h2 id="primitives-h2" className="h2">Built-in primitives, extendable contracts</h2>
          <p className="pillar__note">Get started faster with primitives that are built into the protocol. Extend them with smart contracts.</p>
          <ul className="features nav-list">
            <FeatureItem icon={<Icon.CoinsStacked01 width={16} height={16} />} title="Tokens" link={{ label: "Tokens docs", href: docsUrl("/tokens") }}>
              Stellar Classic assets with native issuer controls. Audited implementations for stablecoins, RWAs, vaults and custom tokens.
            </FeatureItem>
            <FeatureItem icon={<Icon.Key01 width={16} height={16} />} title="Accounts and auth" link={{ label: "Contract accounts", href: docsUrl("/build/guides/contract-accounts") }}>
              Native multisig, plus smart contracts for passkeys, smart wallets, session keys, delegated authorization and spending limits.
            </FeatureItem>
            <FeatureItem icon={<Icon.SwitchHorizontal01 width={16} height={16} />} title="Transactions" link={{ label: "Transactions docs", href: docsUrl("/build/guides/transactions") }}>
              Path payments convert assets along the way. Fee sponsorship and sponsored reserves are native capabilities, with smart contract calls for additional logic.
            </FeatureItem>
            <FeatureItem icon={<Icon.Lock01 width={16} height={16} />} title="Privacy" link={{ label: "Privacy docs", href: docsUrl("/build/apps/privacy") }}>
              Protocol-level cryptographic primitives, plus developer previews for Confidential Tokens and Stellar Private Payments.
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
