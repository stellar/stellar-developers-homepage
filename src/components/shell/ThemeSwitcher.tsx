"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Monitor, Sun, Moon, Check } from "@phosphor-icons/react/dist/ssr";

type Pref = "system" | "light" | "dark";
const KEY = "theme";

/** Apply a preference to <html>: SDS theme class + data-theme (read by DotGridBackground). */
export function applyTheme(pref: Pref) {
  const dark = pref === "dark" || (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const el = document.documentElement;
  el.classList.toggle("sds-theme-dark", dark);
  el.classList.toggle("sds-theme-light", !dark);
  el.setAttribute("data-theme", dark ? "dark" : "light");
  el.style.colorScheme = dark ? "dark" : "light";
}

const OPTIONS: { value: Pref; label: string; Icon: typeof Monitor }[] = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

export function ThemeSwitcher() {
  const [pref, setPref] = useState<Pref>("system");
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { const saved = localStorage.getItem(KEY) as Pref | null; if (saved === "light" || saved === "dark" || saved === "system") setPref(saved); } catch {}
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { try { if ((localStorage.getItem(KEY) ?? "system") === "system") applyTheme("system"); } catch { applyTheme("system"); } };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const choose = (p: Pref) => { setPref(p); try { localStorage.setItem(KEY, p); } catch {} applyTheme(p); setOpen(false); };
  const Current = OPTIONS.find((o) => o.value === pref)!.Icon;

  return (
    <div ref={root} className="theme">
      <button type="button" className="theme__btn" aria-haspopup="menu" aria-expanded={open} aria-controls={id} aria-label="Appearance" onClick={() => setOpen((v) => !v)}>
        <Current size={18} aria-hidden />
      </button>
      {open ? (
        <div id={id} role="menu" className="theme__menu">
          {OPTIONS.map((o) => (
            <button key={o.value} type="button" role="menuitemradio" aria-checked={pref === o.value} className="theme__item" onClick={() => choose(o.value)}>
              <o.Icon size={18} aria-hidden /> <span>{o.label}</span>
              {pref === o.value ? <Check size={16} weight="bold" aria-hidden className="theme__check" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
