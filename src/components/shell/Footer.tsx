import Link from "next/link";
import { Logo } from "@stellar/design-system";

const COLUMNS = [
  { title: "Build", links: [["Docs", "/docs/"], ["Quickstart", "/docs/build/smart-contracts/getting-started/"], ["Toolkits", "/docs/tools/"], ["Smart contracts", "/docs/build/smart-contracts/"]] },
  { title: "Ecosystem", links: [["Partners", "#ecosystem"], ["Validators & Apps", "/docs/validators/"], ["Developer Preview", "#previews"], ["For Agents", "/docs/build/agents/"]] },
  { title: "Community", links: [["GitHub ↗", "https://github.com/stellar"], ["Discord ↗", "https://discord.gg/stellardev"], ["Stack Exchange ↗", "https://stellar.stackexchange.com"], ["Events", "https://stellar.org/events"]] },
  { title: "Resources", links: [["Network status ↗", "https://status.stellar.org"], ["Developer blog", "https://stellar.org/blog"], ["Stellar.org ↗", "https://stellar.org"], ["Contact", "https://stellar.org/contact"]] },
] as const;

export function Footer() {
  return (
    <footer className="w-full border-t" style={{ background: "var(--sds-clr-gray-01)", borderColor: "var(--sds-clr-gray-06)" }}>
      <div className="container-page py-16">
        <div className="grid grid-cols-2 tablet:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Logo.Stellar width={96} height={24} />
            <p className="mt-4 max-w-[288px] text-[14px] leading-[22px]" style={{ color: "var(--sds-clr-gray-11)" }}>
              Build where money already moves around the world
            </p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <h2 className="text-[12px] leading-4 font-semibold uppercase tracking-wide" style={{ color: "var(--sds-clr-gray-11)" }}>{c.title}</h2>
              <ul className="mt-6 space-y-2 text-[14px] leading-[22px]">
                {c.links.map(([label, href]) => (
                  <li key={label}><Link href={href} className="hover:underline underline-offset-4" style={{ color: "var(--sds-clr-gray-12)" }}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] leading-[18px] border-t" style={{ borderColor: "var(--sds-clr-gray-06)", color: "var(--sds-clr-gray-11)" }}>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--sds-clr-green-09)" }} />
            Network status
          </span>
          <span className="flex-1" />
          <Link href="https://stellar.org/terms-of-service">Terms</Link>
          <Link href="https://stellar.org/privacy-policy">Privacy</Link>
          <button type="button" className="underline-offset-4 hover:underline">Cookie settings</button>
          <span>© 2026 Stellar Development Foundation</span>
        </div>
      </div>
    </footer>
  );
}
