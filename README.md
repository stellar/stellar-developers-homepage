# developers.stellar.org

The developer front door for Stellar. Static Next.js site, served at the root of developers.stellar.org, with the docs proxied to Mintlify under `/docs`.

Stack: Next.js (static export), TypeScript, Tailwind for layout, [@stellar/design-system](https://github.com/stellar/stellar-design-system) for components and tokens, Phosphor icons, Paper Shaders. Motion is CSS only. Deployed on Netlify.

```bash
npm ci
npm run dev
npm run build   # static export to ./out
```

Section order follows the V6 design handoff: Hero · Pillar cards · Network · Primitives · Tooling · Ramps · Ecosystem · Support · Developer Previews · Start building.

## Visual libraries (developer brand, V6)

Three sources, used exactly as dialed in the design handoff:

- **Grain gradient** (every module background): [Paper Shaders · grain-gradient](https://shaders.paper.design/grain-gradient), via `@paper-design/shaders-react` `GrainGradient`. Values in `src/components/visuals/GrainGradientBg.tsx`.
- **Dot pattern** (pillar cards): [Paper Shaders · dot-grid](https://shaders.paper.design/dot-grid) settings, exported from the Figma V7 tile as 51 fixed dots in `src/components/visuals/ScatteredDots.tsx` (fill = dot-grid token, so Light and Dark share one layout). Never combined with the gradient.
- **Hero dot grid** (interactive): [DotGridBackground jig](https://playground.willnewton.dev/p/dot-grid-background), exported as `src/components/visuals/DotGridBackground.tsx` (React only, no dependencies). Dot and background colours come from SDS tokens; static under `prefers-reduced-motion`.

Source for the shaders: [paper-design/shaders](https://github.com/paper-design/shaders).
