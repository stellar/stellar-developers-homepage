# developers.stellar.org

The developer front door for Stellar. Static Next.js site, served at the root of developers.stellar.org, with the docs proxied to Mintlify under `/docs`.

Stack: Next.js (static export), TypeScript, Tailwind for layout, [@stellar/design-system](https://github.com/stellar/stellar-design-system) for components and tokens, Phosphor icons, framer-motion, Paper Shaders. Deployed on Netlify.

```bash
npm ci
npm run dev
npm run build   # static export to ./out
```

Section order follows the V6 design handoff: Hero · Pillar cards · Network · Primitives · Tooling · Ramps · Ecosystem · Support · Developer Previews · Start building.
