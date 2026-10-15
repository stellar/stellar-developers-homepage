import Link from "next/link";
import { StellarLogo } from "@/components/ui/StellarLogo";
import "./footer.css";

const COLUMNS = [
  { title: "Build", links: [["Docs", "/docs/"], ["Quickstart", "/docs/build/smart-contracts/getting-started/"], ["Toolkits", "/docs/tools/"], ["Smart contracts", "/docs/build/smart-contracts/"]] },
  { title: "Ecosystem", links: [["Partners", "#ramps"], ["Validators & Apps", "/docs/validators/"], ["Developer Preview", "#previews"], ["For Agents", "/docs/build/agents/"]] },
  { title: "Community", links: [["GitHub ↗", "https://github.com/stellar"], ["Discord ↗", "https://discord.gg/stellardev"], ["Stack Exchange ↗", "https://stellar.stackexchange.com"], ["Events", "https://stellar.org/events"]] },
  { title: "Resources", links: [["Network status ↗", "https://status.stellar.org"], ["Developer blog", "https://stellar.org/blog"], ["Stellar.org ↗", "https://stellar.org"], ["Contact", "https://stellar.org/contact"]] },
] as const;

// Footer — V6 Figma 1836:6067: gray-02, brand column 380 + four flex columns, bottom row with a single rule.
export function Footer() {
  return (
    <footer className="footer">
      <div className="container-page footer__inner">
        <div className="footer__cols">
          <div className="footer__brand">
            <StellarLogo width={96} height={24} />
            <p>Build where money already moves around the world</p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title} className="footer__col">
              <h2 className="footer__title">{c.title}</h2>
              <ul className="nav-list footer__links">
                {c.links.map(([label, href]) => (
                  <li key={label}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span className="footer__status"><span className="dot dot--green" aria-hidden />Network status</span>
          <div className="footer__legal">
            <Link href="https://stellar.org/terms-of-service">Terms</Link>
            <Link href="https://stellar.org/privacy-policy">Privacy</Link>
            <button type="button">Cookie settings</button>
            <span>© 2026 Stellar Development Foundation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
