import Link from "next/link";
import { Icon } from "@stellar/design-system";
import { PatternDots } from "@/components/visuals/PatternDots";
import { Tag } from "@/components/ui/Tag";

// 02 · Pillar cards — V6 Figma 1679:5067, Layer tile component 1482:5157.
// Copy note from the frame: these three tiles are not in the 8 Oct copy deck
// ("Three layers. One network." came from the earlier prototype). Keep / rewrite / remove is Edison + Maz's call.
const TILES = [
  { n: "01", title: "Network", desc: "Reliable at scale.", tags: ["SCP", "RPC", "3–5s ledgers", "asset controls"], href: "#network", Icon: Icon.Dataflow03 },
  { n: "02", title: "Primitives", desc: "Start with proven building blocks.", tags: ["tokens", "smart accounts", "privacy", "smart contracts"], href: "#primitives", Icon: Icon.Cube01 },
  { n: "03", title: "Ramps", desc: "Reach new markets faster and easier.", tags: ["cash", "bank transfers", "local markets"], href: "#ramps", Icon: Icon.SwitchHorizontal01 },
];

export function PillarCards() {
  return (
    <section id="build" aria-label="What you build on" className="pillars">
      <div className="container-page">
        <ul className="pillars__grid nav-list">
          {TILES.map((t) => (
            <li key={t.n} className="tile">
              <div className="tile__media" aria-hidden>
                <PatternDots className="tile__pattern" />
                <div className="tile__icon"><t.Icon width={36} height={36} /></div>
              </div>
              <div className="tile__body">
                <span className="tile__num">{t.n}</span>
                <h2 className="tile__title">{t.title}</h2>
                <p className="tile__desc">{t.desc}</p>
                <div className="tile__tags">{t.tags.map((g) => <Tag key={g}>{g}</Tag>)}</div>
                <Link href={t.href} className="tile__explore">
                  Explore <Icon.ArrowRight width={16} height={16} aria-hidden />
                  <span className="sr-only">: {t.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
