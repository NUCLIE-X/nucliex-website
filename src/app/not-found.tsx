import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

// Copy from docs/05-CONTENT.md §3 — states what happened, offers a way out.
export default function NotFound() {
  return (
    <Section spacing="hero">
      <div className="max-w-2xl">
        <p className="text-label text-fg-subtle uppercase">404</p>
        <h1 className="text-display-2 font-display text-brand-900 mt-3 font-bold">
          That page isn&rsquo;t here.
        </h1>
        <p className="text-body-lg text-fg-muted mt-4 max-w-[56ch]">
          It may have moved, or the link may be wrong.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/products">Browse products</Button>
          <Button href="/support" variant="secondary">
            Get support
          </Button>
          <Button href="/" variant="ghost">
            Go to homepage
          </Button>
        </div>
      </div>
    </Section>
  );
}
