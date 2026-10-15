import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "sm" | "md" | "lg" | "xl";

/**
 * A Next.js Link styled with the @stellar/design-system Button classes,
 * so CTAs are real anchors (crawlable, right-click to open) while matching
 * SDS Button exactly. Primary = lilac-09 / white; md 32px, lg 40px.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size; icon?: ReactNode; iconPosition?: "left" | "right" }) {
  const cls = ["Button", `Button--${variant}`, `Button--${size}`, className].filter(Boolean).join(" ");
  return (
    <Link className={cls} {...props}>
      {icon && iconPosition === "left" ? <span className="Button__icon">{icon}</span> : null}
      <span className="Button__label">{children}</span>
      {icon && iconPosition === "right" ? <span className="Button__icon">{icon}</span> : null}
    </Link>
  );
}
