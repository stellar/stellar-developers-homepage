import Link from "next/link";
import { StellarLogo } from "@/components/ui/StellarLogo";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const NAV = [
  { label: "Build", href: "#build" },
  { label: "Resources", href: "#tooling" },
  { label: "Docs", href: "/docs/" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Blog", href: "https://stellar.org/blog" },
];

// Header decision (13 Oct): one primary action, Developer Docs → /docs. No search, no theme toggle, no GitHub.
export function Header() {
  return (
    <header className="w-full h-16 sticky top-0 z-50 border-b"
            style={{ background: "var(--sds-clr-gray-01)", borderColor: "var(--sds-clr-gray-06)" }}>
      <div className="container-page h-full flex items-center gap-6">
        <Link href="/" aria-label="Stellar developers home" className="flex items-center">
          <StellarLogo width={96} height={24} />
        </Link>
        <nav aria-label="Primary" className="hidden tablet:flex items-center gap-5 text-[14px] leading-5">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className="hover:underline underline-offset-4"
                  style={{ color: "var(--sds-clr-gray-12)" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        <Link href="/docs/" className="inline-flex items-center gap-2 h-9 px-4 rounded-md text-[14px] font-medium"
              style={{ background: "var(--sds-clr-lilac-09)", color: "#fff" }}>
          Developer Docs <ArrowRight size={14} weight="bold" aria-hidden />
        </Link>
      </div>
    </header>
  );
}
