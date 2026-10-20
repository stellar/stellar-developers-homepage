import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { docsUrl } from "@/lib/docs";
import "./error-page.css";

// System error pages — Figma "Error page content" 2004:15186, full pages 2012:33614 (1440),
// 2012:33906 (768), 2012:33730 (390). Sits inside the normal header + footer so people can
// always navigate away. The code is a visual label; the real <h1> is the sentence.
export type ErrorCode = "404" | "403" | "500";

const COPY: Record<ErrorCode, { title: string; body: string }> = {
  "404": {
    title: "This page doesn’t exist",
    body: "It may have moved during a docs update, or the link is mistyped. Start from the Developer Docs, or head back home.",
  },
  "403": {
    title: "You don’t have access to this page",
    body: "It may be limited to a partner program or a Developer Preview. Sign in with the account that has access, or contact us to request it.",
  },
  "500": {
    title: "Something went wrong on our side",
    body: "We’ve been notified and are looking into it. Try again in a moment. If it keeps happening, check network status.",
  },
};

const arrow = <ArrowRight size={16} weight="bold" aria-hidden />;

export function ErrorPage({ code, actions, reference }: { code: ErrorCode; actions?: ReactNode; reference?: string }) {
  const { title, body } = COPY[code];
  return (
    <section className="error-page" aria-labelledby="error-h1">
      <div className="container-page error-page__inner">
        <p className="error-page__code" aria-hidden>{code}</p>
        <h1 id="error-h1" className="error-page__title">{title}</h1>
        <p className="error-page__body">{body}</p>
        <div className="error-page__actions">
          {actions ?? (
            <>
              <ButtonLink href={docsUrl("")} variant="primary" size="lg" icon={arrow}>Developer Docs</ButtonLink>
              <ButtonLink href="/" variant="tertiary" size="lg" icon={arrow}>Back to home</ButtonLink>
            </>
          )}
        </div>
        {reference ? <p className="error-page__ref">Reference: {reference}</p> : null}
      </div>
    </section>
  );
}
