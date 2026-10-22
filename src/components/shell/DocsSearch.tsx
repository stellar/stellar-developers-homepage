"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { ArrowRight, MagnifyingGlass, CircleNotch, X } from "@phosphor-icons/react/dist/ssr";
import { askDocs, getStatus, loadAssistant, subscribeStatus } from "@/lib/assistant";
import { docsUrl } from "@/lib/docs";

const LABEL = "Search the docs"; // accessible name; the visible placeholder is "Search..."
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);
const warm = () => { void loadAssistant().catch(() => {}); };

// suppressHydrationWarning on the forms and inputs: Chrome on iOS stamps __gcruniqueid on them for autofill before hydration.
// Header entry to the Mintlify assistant (design: Steph, 21 Oct). >=768: inline bar. <768: icon that opens a full-width row under the header
// (our own input, focused inside the tap so iOS raises the keyboard). Enter sends the question; blank Enter opens the panel.
export function DocsSearch() {
  const status = useSyncExternalStore(subscribeStatus, getStatus, () => "idle" as const);
  const [q, setQ] = useState("");
  const [row, setRow] = useState(false);
  const bar = useRef<HTMLInputElement>(null);
  const rowInput = useRef<HTMLInputElement>(null);
  const id = useId();
  const busy = status === "loading";

  const openRow = useCallback(() => {
    warm();
    flushSync(() => setRow(true));
    rowInput.current?.focus();
  }, []);

  // Shortcut hint matches the platform; server renders the Mac form.
  const shortcut = useSyncExternalStore(() => () => {}, () => (isMac() ? "⌘K" : "Ctrl K"), () => "⌘K");

  // ⌘K / Ctrl+K jumps to search from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "k" || !(isMac() ? e.metaKey : e.ctrlKey) || e.altKey || e.shiftKey || e.repeat) return;
      if ((e.target as Element | null)?.closest?.("mintlify-assistant")) return; // typing in the assistant panel
      e.preventDefault();
      if (bar.current?.offsetParent) bar.current.focus(); else openRow();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openRow]);

  const submit = (source: string) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (document.activeElement as HTMLElement | null)?.blur(); // drop the mobile keyboard before the panel rises
    window.gtag?.("event", "docs_search_submit", { source });
    // ask() can stay pending (bot check, streaming), so reset the bar now rather than when it resolves.
    // Focus returns to the bar (or the mobile toggle) when the panel closes.
    const back = source === "homepage-header" ? e.currentTarget.querySelector("input") : document.querySelector<HTMLElement>(".docs-search__toggle");
    askDocs(q, source, back).catch(() => { if (getStatus() === "failed") window.location.assign(docsUrl("")); }); // widget blocked, timed out, or origin not allowed
    setQ("");
    setRow(false);
  };

  const onEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Escape") return;
    if (q) setQ(""); else { setRow(false); e.currentTarget.blur(); }
  };

  // Send button appears once there is text: phones show a keyboard "Search" key, but dictation and paste leave no obvious next step.
  const field = (ref: React.RefObject<HTMLInputElement | null>, inputId: string, hint?: React.ReactNode) => (
    <>
      <label htmlFor={inputId} className="sr-only">{LABEL}</label>
      <span className="docs-search__icon" aria-hidden>{busy ? <CircleNotch size={18} className="docs-search__spin" /> : <MagnifyingGlass size={18} />}</span>
      <input ref={ref} id={inputId} type="search" suppressHydrationWarning className="docs-search__input" placeholder="Search..." value={q}
             onChange={(e) => setQ(e.target.value)} onKeyDown={onEscape} onFocus={warm}
             autoComplete="off" enterKeyHint="search" aria-busy={busy} />
      {q.trim() ? (
        <button type="submit" className="docs-search__send" aria-label="Ask the docs assistant"><ArrowRight size={16} weight="bold" aria-hidden /></button>
      ) : hint}
    </>
  );

  return (
    <>
      <form role="search" suppressHydrationWarning className="docs-search docs-search--bar" onSubmit={submit("homepage-header")} onPointerEnter={warm}>
        {field(bar, `${id}-bar`, <kbd className="docs-search__kbd" aria-hidden>{shortcut}</kbd>)}
      </form>
      <button type="button" className="docs-search__toggle" aria-label={row ? "Close search" : LABEL} aria-expanded={row} aria-controls={`${id}-row`}
              onClick={() => (row ? setRow(false) : openRow())} onTouchStart={warm}>
        {row ? <X size={20} aria-hidden /> : <MagnifyingGlass size={20} aria-hidden />}
      </button>
      {row ? (
        <form id={`${id}-row`} role="search" className="docs-search docs-search--row" onSubmit={submit("homepage-mobile")}>
          {field(rowInput, `${id}-row-input`)}
        </form>
      ) : null}
    </>
  );
}
