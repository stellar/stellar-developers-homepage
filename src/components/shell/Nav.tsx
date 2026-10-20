"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { docsUrl } from "@/lib/docs";

// Every nav item leaves this page except Resources, which opens a menu (Figma 1475:5749).
// Opens on hover (and on click or focus for touch and keyboard). Underline shows on hover, focus, and while open.
const RESOURCES = [
  { title: "Stellar Lab", href: "https://lab.stellar.org/" },
  { title: "Skills", href: "https://skills.stellar.org/" },
  { title: "Block Explorers", href: docsUrl("/tools/developer-tools/block-explorers") },
  { title: "Build with AI", href: docsUrl("/build/building-with-ai") },
  { title: "Regional starter pack", href: "https://www.regionalstarterpack.com/" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <nav aria-label="Primary" className="nav">
      <Link href={docsUrl("/build")} className="nav__link">Build</Link>
      <div ref={root} className="nav__group" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <button type="button" className="nav__link nav__link--btn" aria-haspopup="menu" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)} onFocus={() => setOpen(true)}>
          Resources
        </button>
        {open ? (
          <div id={id} role="menu" className="menu">
            {RESOURCES.map((r) => (
              <a key={r.title} role="menuitem" href={r.href} className="menu__item" target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onClick={() => setOpen(false)}>
                <span className="menu__title">{r.title}</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
      <Link href={docsUrl("")} className="nav__link">Docs</Link>
      <Link href="https://stellar.org/ecosystem" className="nav__link">Ecosystem</Link>
      <Link href="https://stellar.org/blog/developers" className="nav__link">Blog</Link>
    </nav>
  );
}
