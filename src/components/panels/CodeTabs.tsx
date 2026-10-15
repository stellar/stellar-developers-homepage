"use client";

import { useId, useState } from "react";
import { CopyText, Icon } from "@stellar/design-system";

export type CodeTab = { id: string; label: string; lines: string[]; copy?: string };

/**
 * Tabbed code panel for the 504 × 324 code slot (Maz's Primitives and Tooling panels).
 * Inconsolata 14/22, tab pills in the header, optional Copy button for the active tab.
 */
export function CodeTabs({ tabs, defaultTab, showCopy = false, label }: { tabs: CodeTab[]; defaultTab?: string; showCopy?: boolean; label: string }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0].id);
  const base = useId();
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];
  const copyText = tab.copy ?? tab.lines.filter((l) => l.startsWith("$ ")).map((l) => l.slice(2)).join("\n");

  return (
    <div className="code-tabs">
      <div className="code-tabs__bar">
        <div role="tablist" aria-label={label} className="code-tabs__list">
          {tabs.map((t) => (
            <button key={t.id} role="tab" id={`${base}-${t.id}`} aria-selected={t.id === tab.id} aria-controls={`${base}-${t.id}-panel`}
              tabIndex={t.id === tab.id ? 0 : -1} className="code-tabs__tab" onClick={() => setActive(t.id)}
              onKeyDown={(e) => { const i = tabs.findIndex((x) => x.id === tab.id); if (e.key === "ArrowRight") setActive(tabs[(i + 1) % tabs.length].id); if (e.key === "ArrowLeft") setActive(tabs[(i - 1 + tabs.length) % tabs.length].id); }}>
              {t.label}
            </button>
          ))}
        </div>
        {showCopy ? (
          <CopyText textToCopy={copyText} doneLabel="Copied">
            <button type="button" className="code-tabs__copy"><Icon.Copy01 width={14} height={14} aria-hidden /> Copy</button>
          </CopyText>
        ) : null}
      </div>
      <pre role="tabpanel" id={`${base}-${tab.id}-panel`} aria-labelledby={`${base}-${tab.id}`} className="code-tabs__body">
        {tab.lines.map((l, i) => (
          <span key={i} className={l.startsWith("#") || l.startsWith("✓") ? "code-tabs__comment" : undefined}>{l}{"\n"}</span>
        ))}
      </pre>
    </div>
  );
}
