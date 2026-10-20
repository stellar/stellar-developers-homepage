"use client";

import { useEffect } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ErrorPage } from "@/components/sections/ErrorPage";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Runtime error boundary for the page tree (client-side failures). Renders the 500 variant
// inside the normal header + footer; "Try again" re-renders the segment that threw.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const arrow = <ArrowRight size={16} weight="bold" aria-hidden />;
  return (
    <ErrorPage
      code="500"
      reference={error.digest ? `500 · ${error.digest}` : undefined}
      actions={
        <>
          <button type="button" className="Button Button--primary Button--lg" onClick={reset}>
            <span className="Button__label">Try again</span>
            <span className="Button__icon">{arrow}</span>
          </button>
          <ButtonLink href="https://status.stellar.org" variant="tertiary" size="lg" icon={arrow}>Network status</ButtonLink>
        </>
      }
    />
  );
}
