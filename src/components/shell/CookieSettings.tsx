"use client";

declare global {
  interface Window { Optanon?: { ToggleInfoDisplay: () => void } }
}

// Same pattern as stellar.org (OneTrust): the control reopens the preference centre and only renders when
// NEXT_PUBLIC_ONETRUST_DOMAIN_SCRIPT_ID is configured, because without the stub there is nothing to open.
export const ONETRUST_ID = process.env.NEXT_PUBLIC_ONETRUST_DOMAIN_SCRIPT_ID ?? "";

export function CookieSettings() {
  if (!ONETRUST_ID) return null;
  return (
    <button type="button" onClick={() => window.Optanon?.ToggleInfoDisplay()}>Cookie settings</button>
  );
}
