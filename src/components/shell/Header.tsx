import Link from "next/link";
import { StellarLogo } from "@/components/ui/StellarLogo";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ThemeSwitcher } from "@/components/shell/ThemeSwitcher";
import { Nav } from "@/components/shell/Nav";
import { docsUrl } from "@/lib/docs";

// Header decision (13 Oct): one primary action, Developer Docs → /docs. No search, no theme toggle, no GitHub.
export function Header() {
  return (
    <header className="w-full h-16 sticky top-0 z-50 border-b"
            style={{ background: "var(--sds-clr-gray-01)", borderColor: "var(--sds-clr-gray-06)" }}>
      <div className="container-page h-full flex items-center gap-6">
        <Link href="/" aria-label="Stellar developers home" className="flex items-center">
          <StellarLogo width={96} height={24} />
        </Link>
        <Nav />
        <div className="flex-1" />
        {/* Actions: Developer Docs + 36px toggle to its right (Maz, 16 Oct), 8px gap */}
        <div className="flex items-center gap-2">
          <Link href={docsUrl("")} className="inline-flex items-center gap-1 h-9 px-3 rounded-lg text-[14px] leading-5 font-semibold"
                style={{ background: "var(--sds-clr-lilac-09)", color: "#fff" }}>
            Developer Docs <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
