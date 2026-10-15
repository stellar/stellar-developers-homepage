import Link from "next/link";
import { Icon } from "@stellar/design-system";
import type { ReactNode } from "react";

/** SDS / Feature item: 32px gray-03 frame + 16px icon, title 16/24 semibold, body 15/24, optional primary link. */
export function FeatureItem({ icon, title, children, link }: { icon: ReactNode; title: string; children: ReactNode; link?: { label: string; href: string } }) {
  return (
    <li className="feature">
      <span className="feature__icon" aria-hidden>{icon}</span>
      <div className="feature__copy">
        <h3 className="feature__title">{title}</h3>
        <p className="feature__body">{children}</p>
        {link ? (
          <Link href={link.href} className="link-primary">
            {link.label} <Icon.ArrowRight width={14} height={14} aria-hidden />
          </Link>
        ) : null}
      </div>
    </li>
  );
}
