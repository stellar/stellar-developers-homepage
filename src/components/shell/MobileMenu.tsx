"use client";

import { useEffect, useId, useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { docsUrl } from "@/lib/docs";
import { ThemeSwitcher } from "@/components/shell/ThemeSwitcher";
import { SOCIALS } from "@/components/shell/Footer";

// Menu button (36px) and nav sheet for tablet and mobile (V7 frames 1884:11167 / 1884:11463).
const LINKS = [
  { label: "Build", href: docsUrl("/build") },
  { label: "Docs", href: docsUrl("") },
  { label: "Ecosystem", href: "https://stellar.org/ecosystem" },
  { label: "Blog", href: "https://stellar.org/blog/developers" },
];
const RESOURCES = [
  { title: "Stellar Lab", href: "https://lab.stellar.org/" },
  { title: "Skills", href: "https://skills.stellar.org/" },
  { title: "Block Explorers", href: docsUrl("/tools/developer-tools/block-explorers") },
  { title: "Build with AI", href: docsUrl("/build/building-with-ai") },
  { title: "Regional starter pack", href: "https://www.regionalstarterpack.com/" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  return (
    <>
      <button type="button" className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        {open ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
      </button>
      {open ? (
        <div id={id} className="sheet" role="dialog" aria-label="Site navigation">
          <nav aria-label="Primary" className="sheet__nav">
            {LINKS.slice(0, 1).map((l) => <a key={l.label} href={l.href} className="sheet__link" onClick={() => setOpen(false)}>{l.label}</a>)}
            <div className="sheet__group">
              <span className="sheet__label">Resources</span>
              {RESOURCES.map((r) => <a key={r.title} href={r.href} className="sheet__sub" onClick={() => setOpen(false)}>{r.title}</a>)}
            </div>
            {LINKS.slice(1).map((l) => <a key={l.label} href={l.href} className="sheet__link" onClick={() => setOpen(false)}>{l.label}</a>)}
          </nav>
          {/* Mobile only: appearance switcher + socials as one utility row (Maz, 22 Oct). The footer shows them from 768px up instead. */}
          <div className="sheet__foot">
            <ThemeSwitcher />
            {SOCIALS.map((s) => (
              <a key={s.href} href={s.href} className="sheet__icon" aria-label={s.label} target="_blank" rel="noreferrer"><s.Icon size={20} aria-hidden /></a>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
