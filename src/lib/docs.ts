/**
 * Docs live at developers.stellar.org/docs (Mintlify, proxied under /docs on this host at cutover).
 * In production the site is served from developers.stellar.org, so links are relative "/docs/…".
 * Everywhere else (local dev, Netlify deploy previews) /docs does not exist on the host, so links
 * go to the absolute address. Set NEXT_PUBLIC_DOCS_BASE="/docs" in the production build (netlify.toml).
 */
const BASE = process.env.NEXT_PUBLIC_DOCS_BASE ?? "https://developers.stellar.org/docs";

export function docsUrl(path = ""): string {
  return `${BASE}${path.startsWith("/") || path === "" ? path : `/${path}`}`;
}
