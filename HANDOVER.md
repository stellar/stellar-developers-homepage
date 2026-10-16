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
- Netlify: build `npm run build`, publish `out/`, deploy preview per PR, deploy on merge to `main`

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
| `src/app/page.tsx` | Section order (Hero → Pillar cards → Network → Primitives → Tooling → Ramps → Ecosystem → Support + Previews + Start building) |
| `src/app/globals.css` | Token bridge, shared layout (`.pillar`, `.features`, `.ctas`), media module, code panels, nav, theme switcher |
| `src/components/sections/*` | One file per section; copy lives here |
| `src/components/shell/*` | Header, Nav (desktop), MobileMenu (sheet), ThemeSwitcher, Footer |
| `src/components/panels/*` | Ledger panel, tabbed code panels (content for Primitives and Tooling tabs) |
| `src/components/visuals/*` | Hero dot grid (Edison's export), grain gradient, scattered dots, ecosystem orbit, Build/Grow/Scale ladder |
| `src/lib/docs.ts` | `docsUrl()` helper, see Links below |
| `public/partners/*.png` | Partner logos exported from Figma |
| `netlify.toml` | Build settings, `/docs` rewrite, production env |

## Theming

The site ships both SDS palettes. Flipping the `sds-theme-light` / `sds-theme-dark` class on `<html>` switches everything. The switcher in the header (System / Light / Dark) saves to `localStorage` and a small inline script applies it before first paint.

Four developer-brand tokens from Edison's handoff are defined in `globals.css` with Light and Dark values read from the Figma variables: `--clr-dev-surface-deep`, `--clr-dev-on-deep`, `--clr-dev-connector`, `--sds-clr-dev-dot-grid` (plus `--clr-dev-orbit` for the ecosystem ring). The two WebGL/canvas visuals read these at runtime and re-read on theme change.

SDS adds prose margins and list markers by default. `globals.css` resets those for `p`, `ul`, `ol` and headings because this is a composed page, not prose.

## Links to the docs

Every docs link goes through `docsUrl("/path")`. In production (`NEXT_PUBLIC_DOCS_BASE="/docs"`, set in `netlify.toml`) that produces relative `/docs/...` paths, which is correct once the site is served from developers.stellar.org. Everywhere else (local dev, Netlify deploy previews) it produces `https://developers.stellar.org/docs/...` so links work before cutover. Paths were checked against both the live docs and the Mintlify preview; the structure is unchanged by the migration.

## Analytics

Both existing SDF sites use Google Tag Manager with GA4 behind it. The docs (and the USDT0 launch page) report into GA4 property **developers.Stellar.org**, measurement ID `G-ZCT4GYX8KN`, via container `GTM-M2JLH37`.

- v1 of this site loads the GA4 tag directly with that measurement ID, so home page and docs land in one property.
- Later: a new GTM container for the home page, so Comms can manage marketing tags without touching the repo. Needs GTM access (Catherine).
- Mintlify side: add `GTM-M2JLH37` under `integrations.gtm.tagId` in `docs.json` so /docs keeps reporting after migration.

## The /docs proxy and cutover (Steph + ops)

1. Confirm SDF's Mintlify plan supports hosting under a subpath and configure `/docs` in Mintlify.
2. Tell Maz the production Mintlify hostname. The rewrite in `netlify.toml` currently points at the migration preview host and needs updating.
3. Agree the DNS cutover date with ops: `developers.stellar.org` → Netlify. Netlify then forwards `/docs/*` to Mintlify.

## Reviewing and shipping

- Push to `main` deploys production. Open a PR to get a preview URL from Netlify.
- No branch rule during the build. After v1 is live, a terraform PR to `stellar/terraform` adds a one-approval rule on `main` (repo config lives in `github/repos.auto.tfvars.json`, entry `stellar-developers-homepage`).
- Copilot code review runs on every PR (org-wide rule). Security reports go through SDF's HackerOne program, which lists developers.stellar.org and public stellar repos in scope.

## Content that is static on purpose

- Ledger panel in Network: sample data, no live fetch. Footer says so.
- Code tabs in Primitives and Tooling: commands verified 8 Oct 2026 against stellar-cli v28, npm, skills.stellar.org, raven.stellar.org and the x402 docs.
- Partner carousel: six partners with one-line descriptions taken from each partner's site (MoneyGram's from the Stellar docs). Logos exported from Figma.

## Open items

- Netlify site connected to this repo (SDF Netlify team).
- GTM access for Maz (Catherine).
- /docs subpath, docs.json GTM ID, DNS cutover (Steph, ops).
- Copy pass with Kate: partner one-liners, Network lead, Ramps tile tagline, 99.998% uptime stat, hero CTA label.
- Developer Previews link currently goes to stellar.org/blog/developers; Adam to confirm a filtered feed.
- Regional starter pack button points at regionalstarterpack.com; confirm.
- Post-v1: terraform PR for the review rule.

## Design references

Figma file FXJqH4KJR2OL949ml7HPqY: V7 Light desktop (1836-5807), V7 Dark desktop (1884-10852), tablet (1884-11167), mobile (1884-11463), component library (1474-3362), Edison's corrections (1886-12694). The working doc with decisions and the day-by-day log is the "developers.stellar.org Build Scope" Claude Doc.
