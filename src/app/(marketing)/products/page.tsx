import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { ProductsExplorer } from "@/components/product/products-explorer";

export const metadata: Metadata = {
  title: "SSDs & storage products",
  description:
    "Browse NUCLIEX SATA and NVMe SSDs. Full specifications, warranty terms, and datasheets for every drive.",
};

export default function ProductsPage() {
  return (
    <>
      <Section spacing="tight" className="pt-16 md:pt-20">
        <p className="text-label text-brand-500 uppercase">Products</p>
        <h1 className="mt-3 font-display text-display-2 font-bold text-brand-900">
          SSDs &amp; storage products
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-fg-muted">
          Every drive we list carries its full specification, the conditions we
          measured it under, and its exact warranty term. Products still in
          validation are marked — nothing here pretends to ship before it does.
        </p>
      </Section>

      <Section spacing="tight" className="pb-16 md:pb-20">
        {/* Filtering is client-side in static export mode */}
        <Suspense fallback={null}>
          <ProductsExplorer />
        </Suspense>
      </Section>

      {/* Roadmap band — clearly separated so future products never read as current */}
      <Section tone="subtle" spacing="tight">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-h3 font-semibold text-brand-900">
              Memory, external drives, and enterprise storage are on the roadmap.
            </h2>
            <p className="mt-2 max-w-[60ch] text-body text-fg-muted">
              Planned products are listed separately and are not purchasable —
              we don&rsquo;t sell what we haven&rsquo;t built.
            </p>
          </div>
          <Link
            href="/products/roadmap"
            className="inline-flex shrink-0 items-center gap-2 text-body font-medium text-brand-500 hover:text-brand-600"
          >
            View the roadmap
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
