"use client";

import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { Icon } from "@stellar/design-system";

type Status = "idle" | "copied" | "failed";

/**
 * Accessible copy-to-clipboard button: real <button>, live feedback, keyboard reachable.
 * Figma "Install snippet" 2004:14938: Copied shows for 1.5 s and is announced politely; if the
 * Clipboard API fails, show "Couldn't copy" and select the text so the user can copy manually.
 * `selectRef` names the element to select on failure; `selectPrevious` selects the button's
 * previous sibling instead (used for the ledger hashes).
 */
export function CopyButton({
  text,
  label,
  children,
  className,
  selectRef,
  selectPrevious,
}: {
  text: string;
  label: string;
  children?: ReactNode;
  className?: string;
  selectRef?: RefObject<HTMLElement | null>;
  selectPrevious?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), status === "copied" ? 1500 : 4000);
    return () => clearTimeout(t);
  }, [status]);

  const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget; // React nulls currentTarget after the await
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
      const target = selectRef?.current ?? (selectPrevious ? (button.previousElementSibling as HTMLElement | null) : null);
      if (target) {
        const range = document.createRange();
        range.selectNodeContents(target);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  };

  const failed = status === "failed";
  const copied = status === "copied";
  const cls = [className, failed ? "is-failed" : null].filter(Boolean).join(" ");
  const live = copied ? "Copied to clipboard" : failed ? "Couldn’t copy. The text is selected; copy it manually." : label;
  return (
    <button type="button" className={cls} onClick={copy} aria-label={live} aria-live="polite">
      {copied ? <Icon.Check width={14} height={14} aria-hidden /> : failed ? <Icon.AlertTriangle width={14} height={14} aria-hidden /> : <Icon.Copy01 width={14} height={14} aria-hidden />}
      {children ? <span>{copied ? "Copied" : failed ? "Couldn’t copy — select the text" : children}</span> : null}
    </button>
  );
}
