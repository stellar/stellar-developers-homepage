"use client";

import { useId, useRef, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";

export type CodeTab = { id: string; label: string; lines: string[]; copy?: string };

/**
 * Tabbed code panel for the 504 × 324 code slot (Maz's Primitives and Tooling panels).
 * Inconsolata 14/22, tab pills in the header, optional Copy button for the active tab.
 */
export function CodeTabs({ tabs, defaultTab, showCopy = false, label }: { tabs: CodeTab[]; defaultTab?: string; showCopy?: boolean; label: string }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0].id);
  const base = useId();
  const preRef = useRef<HTMLPreElement>(null);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];
  const copyText = tab.copy ?? tab.lines.filter((l) => l.startsWith("$ ")).map((l) => l.slice(2)).join("\n");

  return (
    <div className="code-tabs">
      <div className="code-tabs__bar">
        <div role="tablist" aria-label={label} className="code-tabs__list">
          {tabs.map((t) => (
            <button key={t.id} role="tab" id={`${base}-${t.id}`} aria-selected={t.id === tab.id} aria-controls={`${base}-${t.id}-panel`}
              tabIndex={t.id === tab.id ? 0 : -1} className="code-tabs__tab" onClick={() => setActive(t.id)}
              onKeyDown={(e) => {
                const i = tabs.findIndex((x) => x.id === tab.id);
                let next: string | null = null;
                if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length].id;
                if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length].id;
                if (e.key === "Home") next = tabs[0].id;
                if (e.key === "End") next = tabs[tabs.length - 1].id;
                if (next) { e.preventDefault(); setActive(next); document.getElementById(`${base}-${next}`)?.focus(); }
              }}>
              {t.label}
            </button>
          ))}
        </div>
        {showCopy ? (
          <CopyButton text={copyText} label="Copy commands" className="code-tabs__copy" selectRef={preRef}>Copy</CopyButton>
        ) : null}
      </div>
      <pre ref={preRef} role="tabpanel" id={`${base}-${tab.id}-panel`} aria-labelledby={`${base}-${tab.id}`} className="code-tabs__body">
        {tab.lines.map((l, i) => (
          <span key={i} className={l.startsWith("#") || l.startsWith("✓") ? "code-tabs__comment" : undefined}>{l}{"\n"}</span>
        ))}
      </pre>
    </div>
  );
}
