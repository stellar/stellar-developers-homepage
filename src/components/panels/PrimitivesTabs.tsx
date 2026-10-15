import { CodeTabs } from "@/components/panels/CodeTabs";

// Primitives panel (Maz, Figma 1679:5288): Built in (classic ops via Stellar CLI) / Smart contracts (OpenZeppelin crates).
// Commands verified against stellar-cli v28; crate versions as of 8 Oct 2026. Illustrative, not a tutorial.
const TABS = [
  {
    id: "builtin",
    label: "Built in",
    lines: [
      "$ stellar tx new path-payment-strict-send \\",
      "    --source-account alice --destination GB… \\",
      "    --send-asset USDC:GA… --send-amount 100 \\",
      "    --dest-asset MXNe:GC… --dest-min 1700",
      "$ stellar tx new begin-sponsoring-future-reserves \\",
      "    --source-account alice --sponsored-id GB…",
      "$ stellar tx new set-trustline-flags \\",
      "    --source-account issuer --asset USDC:GA… \\",
      "    --trustor GB… --set-authorize",
      "",
      "# convert on the way · sponsor reserves · asset controls",
      "# no contract deployed",
    ],
  },
  {
    id: "contracts",
    label: "Smart contracts",
    lines: [
      "$ cargo tree --depth 1",
      "your_contract v0.1.0",
      "├── soroban-sdk v29.0.0",
      "├── stellar-tokens v0.7.2",
      "│     fungible · rwa · vault",
      "├── stellar-accounts v0.7.2",
      "│     passkeys · policies",
      "└── stellar-contract-utils v0.7.2",
      "      pausable · upgradeable",
      "",
      "✓ 3 audited crates · auth and replay protection",
      "  from the protocol",
    ],
  },
];

export function PrimitivesTabs() {
  return <CodeTabs tabs={TABS} defaultTab="contracts" label="Primitives examples" />;
}
