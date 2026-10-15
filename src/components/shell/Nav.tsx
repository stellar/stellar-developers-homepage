"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Build", href: "https://developers.stellar.org/docs/build", section: "build" },
  { label: "Resources", href: "#tooling", section: "tooling" },
  { label: "Docs", href: "https://developers.stellar.org/docs" },
  { label: "Ecosystem", href: "https://stellar.org/ecosystem", section: "ecosystem" },
  { label: "Blog", href: "https://stellar.org/blog/developers" },
];

/** Primary nav. The section in view gets the lilac underline, mirroring the Mintlify docs nav. */
export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const ids = NAV.map((n) => n.section).filter(Boolean) as string[];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Primary" className="nav hidden tablet:flex">
      {NAV.map((n) => (
        <Link key={n.label} href={n.href} className="nav__link" aria-current={n.section && n.section === active ? "true" : undefined}>
          {n.label}
        </Link>
      ))}
    </nav>
  );
}
