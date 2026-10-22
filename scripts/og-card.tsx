// Source for public/brand/og-card.png. Not a live route: Cloudflare does not forward /opengraph-image to Netlify.
// To regenerate, move this file back to src/app/opengraph-image.tsx, run `npm run build`, copy out/opengraph-image to public/brand/og-card.png, and move it back.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Social card (1200 × 630) built from the page's own ingredients: Stellar logo, hero headline,
// lilac dot grid on gray-01. Pre-rendered at build (static export) and served at /opengraph-image.
export const dynamic = "force-static";
export const alt = "Stellar Developers: build where money already moves around the world";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Inter is fetched at build time from Google Fonts (TTF). If that fails the card falls back to the default sans.
async function inter(weight: 400 | 500) {
  try {
    // No User-Agent: Google Fonts then serves TTF, which next/og can read (it rejects woff2).
    const css = await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`).then((r) => r.text());
    const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

// Dot grid: 10 columns × 10 rows, sizes vary with a smooth field so it reads like the hero canvas.
function dots() {
  const out: { x: number; y: number; r: number; o: number }[] = [];
  const cols = 10, rows = 9, step = 40;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const f = (Math.sin(i * 0.9 + j * 0.6) + Math.cos(i * 0.4 - j * 0.8) + 2) / 4; // 0..1
    out.push({ x: i * step, y: j * step, r: 3 + f * 6, o: 0.35 + f * 0.65 });
  }
  return out;
}

export default async function OpenGraphImage() {
  const [regular, medium, logoSvg] = await Promise.all([inter(400), inter(500), readFile(path.join(process.cwd(), "public/brand/stellar-logo.svg"), "utf8")]);
  const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg.replace(/currentColor/g, "#171717")).toString("base64")}`;
  const fonts = [regular && { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const }, medium && { name: "Inter", data: medium, weight: 500 as const, style: "normal" as const }].filter(Boolean) as NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fcfcfc", fontFamily: "Inter", color: "#171717", position: "relative" }}>
        {/* dot grid, right side */}
        <div style={{ position: "absolute", right: 72, top: 135, width: 400, height: 360, display: "flex" }}>
          {dots().map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x + 20 - d.r, top: d.y + 20 - d.r, width: d.r * 2, height: d.r * 2, borderRadius: 999, background: "#aa99ec", opacity: d.o }} />
          ))}
        </div>
        {/* copy */}
        <div style={{ position: "absolute", left: 80, top: 72, bottom: 72, width: 640, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <img src={logo} width={160} height={40} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 60, lineHeight: 1.08, letterSpacing: -2.4, fontWeight: 400 }}>Build where money already moves around the world</div>
            <div style={{ fontSize: 24, lineHeight: 1.4, color: "#6f6f6f", fontWeight: 400 }}>Reliable rails, financial building blocks, and an ecosystem of connected markets.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, fontWeight: 500, color: "#6f6f6f" }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#6e56cf", display: "flex" }} />
            developers.stellar.org
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
