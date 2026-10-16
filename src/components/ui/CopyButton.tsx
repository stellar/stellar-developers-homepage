"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "@stellar/design-system";

/** Accessible copy-to-clipboard button: real <button>, live "Copied" feedback, keyboard reachable. */
export function CopyButton({ text, label, children, className }: { text: string; label: string; children?: ReactNode; className?: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => { if (!done) return; const t = setTimeout(() => setDone(false), 1500); return () => clearTimeout(t); }, [done]);
  const copy = async () => { try { await navigator.clipboard.writeText(text); setDone(true); } catch { /* clipboard blocked; nothing to do */ } };
  return (
    <button type="button" className={className} onClick={copy} aria-label={done ? "Copied" : label} aria-live="polite">
      {done ? <Icon.Check width={14} height={14} aria-hidden /> : <Icon.Copy01 width={14} height={14} aria-hidden />}
      {children ? <span>{done ? "Copied" : children}</span> : null}
    </button>
  );
}
