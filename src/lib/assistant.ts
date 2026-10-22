import type { AssistantApi, AssistantConfig, AssistantEvent } from "@/types/mintlify";

/**
 * Mintlify assistant widget, opened from our own search bar in the header (DocsSearch).
 *
 * Loaded on demand (first hover, focus or tap on the bar), not on page load: the runtime is ~1.2MB of JS.
 * Pinned to one runtime version because hiding Mintlify's floating "Ask assistant" button depends on its internals.
 * Mintlify has no option to hide it (checked 21 Oct 2026, runtime 0.0.75), and its shadow root forces every style on
 * its host element, so page CSS on <mintlify-assistant> has no effect. Instead we move the host into a wrapper we own
 * (#assistant-root) and hide the wrapper while the host's data-state is "closed". Re-test the hide when bumping VERSION.
 */
export const WIDGET_ID = "mint_widget_2b3d5573-7f2d-44eb-947e-6eced343e2c1";
const VERSION = "0.0.75";
const SRC = `https://widget.mintlify.com/versions/${VERSION}/embed.js`;
const HOST = "mintlify-assistant[data-mintlify-assistant-host]";
const ROOT_ID = "assistant-root";
const TIMEOUT_MS = 15_000; // slow mobile connections: the runtime is ~1.2MB
// Errors from ask() that mean this origin cannot use the widget (not on Mintlify's allowed origins, or widget disabled).
const UNAVAILABLE = new Set(["WIDGET_UNAVAILABLE", "WIDGET_DISABLED", "SESSION_FAILED"]);
const CLOSE_DELAY_MS = 300; // let the panel's exit animation finish before hiding the host

export type Status = "idle" | "loading" | "ready" | "failed";

let status: Status = "idle";
let ready: Promise<AssistantApi> | null = null;
let closeTimer: ReturnType<typeof setTimeout> | undefined;
let returnFocus: HTMLElement | null = null; // where keyboard focus goes when the panel closes
const listeners = new Set<() => void>();

function setStatus(s: Status) { status = s; listeners.forEach((l) => l()); }
export function getStatus() { return status; }
export function subscribeStatus(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb); }; }

/** Show or hide the wrapper around the widget. Hiding waits for the panel's exit animation. */
function setRootOpen(open: boolean) {
  clearTimeout(closeTimer);
  const apply = () => {
    document.getElementById(ROOT_ID)?.toggleAttribute("data-open", open);
    // The widget focuses its own (now hidden) button on close, so hand focus back to our search once it is hidden.
    if (!open && returnFocus?.isConnected) { returnFocus.focus({ preventScroll: true }); returnFocus = null; }
  };
  if (open) apply(); else closeTimer = setTimeout(apply, CLOSE_DELAY_MS);
}

/** Move the widget's host into our wrapper and follow its open/closed state. Returns false if the host is missing. */
function adoptHost(): boolean {
  const host = document.querySelector(HOST);
  if (!host) return false;
  let root = document.getElementById(ROOT_ID);
  if (!root) { root = document.createElement("div"); root.id = ROOT_ID; document.body.appendChild(root); }
  root.appendChild(host);
  new MutationObserver(() => setRootOpen(host.getAttribute("data-state") === "open")).observe(host, { attributes: true, attributeFilter: ["data-state"] });
  return true;
}

/** Widget appearance from the site's current theme (SDS class on <html>, set by ThemeSwitcher). */
function appearance(): NonNullable<AssistantConfig["appearance"]> {
  const dark = document.documentElement.classList.contains("sds-theme-dark");
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--sds-clr-lilac-09").trim();
  return { theme: dark ? "dark" : "light", ...(accent ? { accent } : {}) };
}

function onEvent(e: AssistantEvent) {
  // GA4: interaction only, never the question text.
  if (e.type === "open" || e.type === "close" || e.type === "ask") window.gtag?.("event", `assistant_${e.type}`, { source: e.source });
}

function loadScript(): Promise<AssistantApi> {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.type = "module";
    s.src = SRC;
    // Module scripts fire load after evaluating, and the runtime installs window.MintlifyAssistant at top level.
    s.onload = () => (window.MintlifyAssistant ? resolve(window.MintlifyAssistant) : reject(new Error("Mintlify assistant did not install")));
    s.onerror = () => reject(new Error("Mintlify assistant failed to load"));
    document.head.appendChild(s);
  });
}

/** Load and init the widget once. Safe to call repeatedly (hover, focus, submit); retries after a failure. */
export function loadAssistant(): Promise<AssistantApi> {
  if (ready) return ready;
  setStatus("loading");
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("Mintlify assistant timed out")), TIMEOUT_MS); });
  ready = Promise.race([
    loadScript().then(async (api) => {
      await api.init({
        id: WIDGET_ID,
        appearance: { ...appearance(), variant: "panel", radius: "8px", zIndex: 60 }, // font: the widget bundles Inter already
        labels: { title: "Stellar docs assistant", placeholder: "Ask about building on Stellar" },
        hooks: { event: onEvent },
        analytics: { capturePathname: false }, // Mintlify's own telemetry: keep page paths out
      });
      if (!adoptHost()) throw new Error("Mintlify assistant host not found; check VERSION in src/lib/assistant.ts"); // fall back to linking the docs
      // Follow the site's theme switcher, same signals as DotGridBackground.
      new MutationObserver(() => void api.update({ appearance: appearance() })).observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
      return api;
    }),
    timeout,
  ]).then(
    (api) => { clearTimeout(timer); setStatus("ready"); return api; },
    // Forget the failure so the next attempt retries; a slow load that lost the race usually finishes (init is idempotent).
    (err) => { clearTimeout(timer); ready = null; setStatus("failed"); throw err; },
  );
  return ready;
}

/**
 * Send a question to the assistant, or open it empty when the question is blank.
 * Rejects when the widget cannot be used here, so the caller can fall back to the docs.
 */
export async function askDocs(question: string, source: string, focusOnClose?: HTMLElement | null) {
  const api = await loadAssistant();
  returnFocus = focusOnClose ?? null;
  setRootOpen(true); // show the wrapper before the runtime lays out the panel
  const q = question.trim();
  try {
    if (q) await api.ask(q, { source, open: true, focus: true });
    else await api.open({ source, focus: true });
  } catch (err) {
    if (UNAVAILABLE.has((err as { code?: string })?.code ?? "")) { setStatus("failed"); void api.close(); }
    throw err;
  } finally {
    setRootOpen(document.querySelector(HOST)?.getAttribute("data-state") === "open"); // never leave the floating button showing
  }
}
