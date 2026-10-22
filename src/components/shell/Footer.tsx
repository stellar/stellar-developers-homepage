import Link from "next/link";
import { GithubLogo, DiscordLogo, XLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { StellarLogo } from "@/components/ui/StellarLogo";
import { CookieSettings } from "./CookieSettings";
import "./footer.css";

// Social links, same set and order as the mobile sheet (Maz, 22 Oct).
export const SOCIALS = [
  { label: "Stellar on GitHub", href: "https://github.com/stellar", Icon: GithubLogo },
  { label: "Stellar developer Discord", href: "https://discord.com/invite/zVYdY3ktTn", Icon: DiscordLogo },
  { label: "Stellar developers on X", href: "https://x.com/BuildOnStellar", Icon: XLogo },
  { label: "Stellar Development Foundation on YouTube", href: "https://www.youtube.com/@StellarDevelopmentFoundation", Icon: YoutubeLogo },
] as const;

// Footer · v8 (Figma 2100:17717): logo + legal line only, link columns removed until destinations exist.
// Legal links match stellar.org. Socials added per Maz.
export function Footer() {
  return (
    <footer className="footer">
      <div className="container-page footer__inner">
        <div className="footer__brand">
          <StellarLogo width={96} height={24} />
          <ul className="nav-list footer__social" aria-label="Follow Stellar developers">
            {SOCIALS.map((s) => (
              <li key={s.href}><a href={s.href} className="icon-btn" aria-label={s.label} target="_blank" rel="noreferrer"><s.Icon size={20} aria-hidden /></a></li>
            ))}
          </ul>
        </div>
        <div className="footer__legal">
          <Link href="https://stellar.org/terms-of-service">Terms</Link>
          <Link href="https://stellar.org/privacy-policy">Privacy</Link>
          <Link href="https://stellar.org/brand-policy">Brand policy</Link>
          <CookieSettings />
          <span>© 2026 Stellar Development Foundation</span>
        </div>
      </div>
    </footer>
  );
}
