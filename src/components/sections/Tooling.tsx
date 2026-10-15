import Link from "next/link";
import { Icon } from "@stellar/design-system";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { MediaModule } from "@/components/ui/MediaModule";
import { ToolingTabs } from "@/components/panels/ToolingTabs";
import { docsUrl } from "@/lib/docs";

// 05 · Tooling — V6 Figma 1679:5320 (media right). Copy from the 10/13 deck.
// Figma reuses cpu-chip-01 for both MCP and x402; x402 uses credit-card-02 here (flagged).
export function Tooling() {
  return (
    <section id="tooling" aria-labelledby="tooling-h2" className="pillar-section">
      <div className="container-page pillar">
        <div className="pillar__copy">
          <p className="eyebrow">Tooling</p>
          <h2 id="tooling-h2" className="h2">Tools for developers and agents</h2>
          <p className="pillar__note">Build, test, and deploy with the Stellar CLI, JavaScript and Rust SDKs. Put your agent to work with MCP and skills. Reach network data with <Link href={docsUrl("/data/apis/rpc")} className="inline-link">Stellar RPC</Link>.</p>
          <ul className="features nav-list">
            <FeatureItem icon={<Icon.TerminalSquare width={16} height={16} />} title="Stellar CLI">
              Deploy contracts, issue assets and manage accounts from the terminal.
            </FeatureItem>
            <FeatureItem icon={<Icon.CodeBrowser width={16} height={16} />} title="SDKs">
              JavaScript, Go and Rust maintained by SDF; Python, Java, Kotlin, .NET, PHP, iOS and Flutter from the community.
            </FeatureItem>
            <FeatureItem icon={<Icon.CpuChip01 width={16} height={16} />} title="MCP and skills">
              Stellar Raven gives agents Stellar docs, live ecosystem data and playbooks; prebuilt skills cover contracts, wallets, assets and payments.
            </FeatureItem>
            <FeatureItem icon={<Icon.CreditCard02 width={16} height={16} />} title="x402">
              Agent payments over HTTP, so your agent can pay for what it uses.
            </FeatureItem>
          </ul>
          <Link href={docsUrl("/build/building-with-ai")} className="link-primary">
            Stellar for Agents <Icon.ArrowRight width={14} height={14} aria-hidden />
          </Link>
        </div>
        <div className="pillar__media">
          <MediaModule label="Tooling quick starts: CLI, SDKs, Skills, MCP and x402 commands">
            <ToolingTabs />
          </MediaModule>
        </div>
      </div>
    </section>
  );
}
