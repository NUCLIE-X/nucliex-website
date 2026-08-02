"use client";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

// Plain recovery — no stack traces in production (docs/04 §12).
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Section spacing="hero">
      <div className="max-w-2xl">
        <p className="text-label text-fg-subtle uppercase">
          Something went wrong
        </p>
        <h1 className="mt-3 font-display text-display-2 font-bold text-brand-900">
          This page failed to load.
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-fg-muted">
          Try again — if it keeps happening, our support team can help.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button href="/support" variant="secondary">
            Get support
          </Button>
        </div>
      </div>
    </Section>
  );
}
