import { CodeTabs } from "@/components/panels/CodeTabs";

// Tooling panel (Maz, Figma 1679:5337): CLI · SDKs · Skills · MCP · x402, with Copy for the active tab.
// Commands verified 8 Oct 2026 against stellar-cli v28, npm, Go module path, skills.stellar.org, raven.stellar.org and the x402 docs quickstart.
const TABS = [
  { id: "cli", label: "CLI", lines: ["$ brew install stellar-cli", "$ winget install --id Stellar.StellarCLI", "$ stellar keys generate alice --network testnet --fund", "$ stellar contract init my-app", "", "# install (brew on macOS/Linux, winget on Windows)", "# funded testnet account · scaffolded project"] },
  { id: "sdks", label: "SDKs", lines: ["$ npm i @stellar/stellar-sdk", "$ go get github.com/stellar/go-stellar-sdk", "$ cargo add soroban-sdk", "", "# JavaScript, Go and Rust, maintained by SDF", "# Python · Java · Kotlin · .NET · PHP · iOS · Flutter from the community"] },
  { id: "mcp", label: "MCP", lines: ["$ claude mcp add --transport http stellar-raven \\", "    https://raven.stellar.org/mcp", "", "# Stellar Raven: docs, live ecosystem data, playbooks", "# works with any MCP client"], copy: "claude mcp add --transport http stellar-raven https://raven.stellar.org/mcp" },
  { id: "skills", label: "Skills", lines: ["$ /plugin marketplace add stellar/stellar-dev-skill", "$ /plugin install stellar-dev@stellar-dev", "", "# 9 official skills: contracts, wallets, assets, payments…", "# skills.stellar.org"], copy: "/plugin marketplace add stellar/stellar-dev-skill\n/plugin install stellar-dev@stellar-dev" },
  { id: "x402", label: "x402", lines: ["$ npm i @x402/core @x402/express @x402/fetch \\", "    @x402/stellar @stellar/stellar-sdk", "$ stellar keys generate my-x402-wallet --network testnet", "", "# agent payments over HTTP · facilitator on testnet and mainnet"], copy: "npm i @x402/core @x402/express @x402/fetch @x402/stellar @stellar/stellar-sdk\nstellar keys generate my-x402-wallet --network testnet" },
];

export function ToolingTabs() {
  return <CodeTabs tabs={TABS} defaultTab="cli" showCopy label="Tooling quick starts" />;
}
