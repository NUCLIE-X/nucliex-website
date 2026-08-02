import type { Metadata } from "next";
import { roadmap } from "@/data/products";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Product roadmap",
  description:
    "Where the NUCLIEX product line is going: NVMe generations, memory, external and enterprise storage, and the software ecosystem — all clearly marked as planned.",
};

export default function RoadmapPage() {
  return (
    <>
      <Section spacing="tight" className="pt-16 md:pt-20">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Roadmap" },
          ]}
        />
        <p className="text-label text-brand-500 uppercase">Roadmap</p>
        <h1 className="text-display-2 font-display text-brand-900 mt-3 font-bold">
          What we&rsquo;re building next
        </h1>
        <p className="text-body-lg text-fg-muted mt-4 max-w-[56ch]">
          Everything on this page is planned, not purchasable. It ships when it
          passes the same validation as everything else we make — and moves to
          the catalogue only then.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((group) => (
            <div key={group.group} className="border-border border-t pt-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-h3 text-brand-900 font-semibold">{group.group}</h2>
                <Badge tone="planned">Planned</Badge>
              </div>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-body text-fg-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="subtle" spacing="tight">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-h3 text-brand-900 font-semibold">
              Need something on this list sooner?
            </h2>
            <p className="text-body text-fg-muted mt-2 max-w-[60ch]">
              Business and bulk buyers shape what we build first. Tell us what
              your fleet needs.
            </p>
          </div>
          <Button href="/business/quote" className="shrink-0">
            Request a quote
          </Button>
        </div>
      </Section>
    </>
  );
}
