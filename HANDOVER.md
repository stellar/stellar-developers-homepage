# developers.stellar.org — handover

Status as of 16 Oct 2026. Owner: Maz (PMM). Co-maintainer: Steph (DevX). Design: Edison, on the Stellar Design System (SDS) maintained by MK.

## What this is

The new developer front door at the root of **developers.stellar.org**. A static Next.js site. The docs stay on Mintlify and are served under **/docs** on the same host, proxied by Netlify. Flow:

```
stellar.org → developers.stellar.org (this repo, Netlify) → developers.stellar.org/docs (Mintlify)
```

## Stack

- Next.js 16, React 19, TypeScript, static export (`output: "export"`, no server code)
- Tailwind 4 for layout only; colours, type and spacing come from `@stellar/design-system` tokens
- `@stellar/design-system` v4 for Badge, CopyText, icons, logo and Button styling
- `@phosphor-icons/react` for the few icons SDS does not ship (theme switcher, menu, socials)
- `@paper-design/shaders-react` for the grain-gradient module backgrounds
- Netlify: build `npm run build`, publish `out/`, deploy preview per PR, deploy on merge to `main`. Live at https://stellar-developers-homepage.netlify.app/ (connected 20 Oct 2026)

## Run it

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run lint
```

Node 22 or newer.

## Where things live

| Path | What |
|---|---|
| `src/app/layout.tsx` | Root layout: fonts, SDS stylesheet, theme bootstrap script, header, footer |
| `src/app/page.tsx` | Section order per the V8 frame (Hero → Network → Primitives → Ramps → Tooling → Ecosystem → Support + Previews + Start building). The pillar tiles / layer nav are out pending Edison's redesign (#21) |
| `src/app/globals.css` | Token bridge, shared layout (`.pillar`, `.features`, `.ctas`), media module, code panels, nav, theme switcher |
| `src/components/sections/*` | One file per section; copy lives here |
| `src/components/shell/*` | Header, Nav (desktop), MobileMenu (sheet), ThemeSwitcher, Footer (v8: logo, socials, legal line), CookieSettings |
| `src/components/panels/*` | Ledger panel, tabbed code panels (content for Primitives and Tooling tabs) |
| `src/components/visuals/*` | Hero dot grid (Edison's export), grain gradient, scattered dots, ecosystem orbit, Build/Grow/Scale ladder |
| `src/lib/docs.ts` | `docsUrl()` helper, see Links below |
| `public/partners/*.png` | Partner logos exported from Figma |
| `netlify.toml` | Build settings, `/docs` rewrite, production env |
| `src/app/not-found.tsx`, `src/app/error.tsx` | Branded 404 (exported to `out/404.html`) and the 500 runtime error boundary; both render `components/sections/ErrorPage` |

## Theming

The site ships both SDS palettes. Flipping the `sds-theme-light` / `sds-theme-dark` class on `<html>` switches everything. The switcher in the header (System / Light / Dark) saves to `localStorage` and a small inline script applies it before first paint.

Four developer-brand tokens from Edison's handoff are defined in `globals.css` with Light and Dark values read from the Figma variables: `--clr-dev-surface-deep`, `--clr-dev-on-deep`, `--clr-dev-connector`, `--sds-clr-dev-dot-grid` (plus `--clr-dev-orbit` for the ecosystem ring). The two WebGL/canvas visuals read these at runtime and re-read on theme change.

SDS adds prose margins and list markers by default. `globals.css` resets those for `p`, `ul`, `ol` and headings because this is a composed page, not prose.

## Links to the docs

Every docs link goes through `docsUrl("/path")`. In production (`NEXT_PUBLIC_DOCS_BASE="/docs"`, set in `netlify.toml`) that produces relative `/docs/...` paths, which is correct once the site is served from developers.stellar.org. Everywhere else (local dev, Netlify deploy previews) it produces `https://developers.stellar.org/docs/...` so links work before cutover. Paths were checked against both the live docs and the Mintlify preview; the structure is unchanged by the migration.

## Footer and cookie consent

Footer v8 (Figma 2100:17717) is logo + legal line only; the link columns were removed until destinations exist. Socials (GitHub, Discord, X, YouTube) live in `SOCIALS` in `Footer.tsx` and are shared with the mobile sheet. Legal links point at stellar.org: terms-of-service, privacy-policy, brand-policy.

Cookie settings follow stellar.org's OneTrust setup: `layout.tsx` loads `cdn.cookielaw.org/scripttemplates/otSDKStub.js` with `data-domain-script` from `NEXT_PUBLIC_ONETRUST_DOMAIN_SCRIPT_ID`, and the footer's "Cookie settings" button calls `window.Optanon.ToggleInfoDisplay()`. Both render only when that env var is set in Netlify. The domain script ID comes from SDF's OneTrust account (ask whoever runs stellar.org analytics); until it is set there is no banner and no Cookie settings link.

## Analytics

Both existing SDF sites use Google Tag Manager with GA4 behind it. The docs (and the USDT0 launch page) report into GA4 property **developers.Stellar.org**, measurement ID `G-ZCT4GYX8KN`, via container `GTM-M2JLH37`.

- v1 of this site loads the GA4 tag directly with that measurement ID, so home page and docs land in one property.
- Later: a new GTM container for the home page, so Comms can manage marketing tags without touching the repo. Needs GTM access (Catherine).
- Mintlify side: add `GTM-M2JLH37` under `integrations.gtm.tagId` in `docs.json` so /docs keeps reporting after migration. Do not create a new GA4 property or a new GTM container for /docs: the docs keep their existing container, the home page shares the same GA4 property, and only the home page gets its own container later.

## Docs search (Mintlify assistant)

The search bar in the header (`src/components/shell/DocsSearch.tsx`) opens the Mintlify AI assistant, widget ID `mint_widget_2b3d5573-7f2d-44eb-947e-6eced343e2c1`. Visitors type a question and press Enter, and the answer opens in a side panel (a full-screen sheet on phones). It returns AI answers with links to docs pages, not a list of search results. Under 768px the bar becomes a search icon that opens a full-width input under the header. ⌘K (Ctrl+K on Windows) focuses it from anywhere.

`src/lib/assistant.ts` loads the widget only on first hover, focus or tap of the bar, because the runtime is about 1.2MB. It is pinned to runtime `0.0.75` (`VERSION`) through `widget.mintlify.com/versions/0.0.75/embed.js`, which is not Mintlify's documented entry point (`/v1/embed.js`). If that URL ever disappears, the bar falls back to the docs link. Mintlify has no setting to hide its floating "Ask assistant" button, and the widget overrides any CSS on its own element. So `assistant.ts` moves the widget's `<mintlify-assistant>` element into `#assistant-root` and hides that wrapper whenever the element's `data-state` is `closed`. Re-test that the button stays hidden before bumping `VERSION`. If the widget fails to load (blocked, or slower than 15s), Enter sends visitors to the docs instead, and the next search retries. If the origin is not allowed or the widget is disabled, the panel opens and the first question gets an error from Mintlify, so the bar closes it and sends visitors to the docs.

Origins must be allowed in Mintlify's widget settings: `http://localhost:3100`, `https://stellar-developers-homepage.netlify.app`, `https://developers.stellar.org`. Deploy previews fall back to the docs link unless their origin is allowed too (unverified on a real preview, so check it on the first PR). On localhost, hCaptcha (Mintlify's bot protection) logs a "localhost detected" warning, which shows as the Next.js "1 Issue" badge in dev, and may show a puzzle before answering. Neither happens on a real domain. GA4 gets `docs_search_submit` and `assistant_open`/`assistant_close`/`assistant_ask` events with a `source`. Question text is never sent to GA. Mintlify receives the question by design. Its own telemetry is limited to metadata, with page paths turned off (`analytics.capturePathname: false`). There is no Content Security Policy on the site yet. If one is added, it needs the sources in Mintlify's widget docs (`widget.mintlify.com`, `api.mintlify.com`, `ph.mintlify.com`, hCaptcha).

## The /docs proxy and cutover (Steph + ops)

1. Confirm SDF's Mintlify plan supports hosting under a subpath and configure `/docs` in Mintlify.
2. Cutover done 22 Oct 2026 (stellar/ops#5026). Cloudflare routes `/` and the homepage assets to Netlify and everything else to Mintlify (`stellardevelopmentfoundation.mintlify.site`). The `/docs` rules in `netlify.toml` only matter on the Netlify review URL.

## Reviewing and shipping

- Push to `main` deploys production. Open a PR to get a preview URL from Netlify.
- No branch rule during the build. After v1 is live, a terraform PR to `stellar/terraform` adds a one-approval rule on `main` (repo config lives in `github/repos.auto.tfvars.json`, entry `stellar-developers-homepage`).
- Copilot code review runs on every PR (org-wide rule). Security reports go through SDF's HackerOne program, which lists developers.stellar.org and public stellar repos in scope.

## Content that is static on purpose

- Ledger panel in Network: sample data, no live fetch. Footer says so.
- Code tabs in Primitives and Tooling: commands verified 8 Oct 2026 against stellar-cli v28, npm, skills.stellar.org, raven.stellar.org and the x402 docs.
- Partner carousel: six partners with one-line descriptions taken from each partner's site (MoneyGram's from the Stellar docs). Logos exported from Figma.

## Tracking

Open work is tracked on the GitHub project board [Developer front door · developers.stellar.org](https://github.com/orgs/stellar/projects/106), linked to this repo. New issues on the repo land there automatically. Labels: design, infra, analytics, copy, a11y, bug, needs-info.

## Open items

- GTM access for Maz (Catherine).
- /docs subpath, docs.json GTM ID, DNS cutover (Steph, ops).
- Copy pass with Kate: partner one-liners, Network lead, Ramps tile tagline, 99.998% uptime stat, hero CTA label.
- Developer Previews link currently goes to stellar.org/blog/developers; Adam to confirm a filtered feed.
- Regional starter pack button points at regionalstarterpack.com; confirm.
- Post-v1: terraform PR for the review rule.
- Ask Mintlify for a supported option to hide the widget's floating button, then delete the `#assistant-root` wrapper in `src/lib/assistant.ts`.

## Design references

Figma file FXJqH4KJR2OL949ml7HPqY: V7 Light desktop (1836-5807), V7 Dark desktop (1884-10852), tablet (1884-11167), mobile (1884-11463), component library (1474-3362), Edison's corrections (1886-12694). The working doc with decisions and the day-by-day log is the "developers.stellar.org Build Scope" Claude Doc.
