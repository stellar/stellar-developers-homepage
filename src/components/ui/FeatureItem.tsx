import Link from "next/link";
import { Icon } from "@stellar/design-system";
import type { ReactNode } from "react";

/** SDS / Feature item: 32px gray-03 frame + 16px icon, title 16/24 semibold, body 15/24, optional primary link. */
type FeatureLink = { label: string; href: string };

export function FeatureItem({ icon, title, children, link, links }: { icon: ReactNode; title: string; children: ReactNode; link?: FeatureLink; links?: FeatureLink[] }) {
  const all = links ?? (link ? [link] : []);
  return (
    <li className="feature">
      <span className="feature__icon" aria-hidden>{icon}</span>
      <div className="feature__copy">
        <h3 className="feature__title">{title}</h3>
        <p className="feature__body">{children}</p>
        {all.length ? (
          <div className="feature__links">
            {all.map((l) => (
              <Link key={l.href} href={l.href} className="link-primary">
                {l.label} <Icon.ArrowRight width={14} height={14} aria-hidden />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}
