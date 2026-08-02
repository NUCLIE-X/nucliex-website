import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { familyLabels, products, type Product } from "@/data/products";
import { Section } from "@/components/layout/section";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters, type FilterOption } from "@/components/product/product-filters";
import { Button } from "@/components/ui/button";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const filtered = ["family", "form", "capacity"].some((key) => params[key]);
  return {
    title: "SSDs & storage products",
    description:
      "Browse NUCLIEX SATA and NVMe SSDs. Full specifications, warranty terms, and datasheets for every drive.",
    // Filtered states never index — canonical content lives on the family pages.
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

function toList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function countBy(items: Product[], pick: (p: Product) => string[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const item of items) {
    for (const key of pick(item)) {
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }
  return map;
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const familyFilter = toList(params.family);
  const formFilter = toList(params.form);
  const capacityFilter = toList(params.capacity);

  const matches = products.filter((product) => {
    if (familyFilter.length && !familyFilter.includes(product.family)) return false;
    if (formFilter.length && !formFilter.includes(product.formFactor)) return false;
    if (capacityFilter.length && !product.capacities.some((c) => capacityFilter.includes(c)))
      return false;
    return true;
  });

  const familyCounts = countBy(products, (p) => [p.family]);
  const formCounts = countBy(products, (p) => [p.formFactor]);
  const capacityCounts = countBy(products, (p) => p.capacities);

  const familyOptions: FilterOption[] = [...familyCounts].map(([value, count]) => ({
    value,
    label: familyLabels[value as Product["family"]],
    count,
  }));
  const formOptions: FilterOption[] = [...formCounts].map(([value, count]) => ({
    value,
    label: value,
    count,
  }));
  const capacityOptions: FilterOption[] = [...capacityCounts].map(([value, count]) => ({
    value,
    label: value,
    count,
  }));

  return (
    <>
      <Section spacing="tight" className="pt-16 md:pt-20">
        <p className="text-label text-brand-500 uppercase">Products</p>
        <h1 className="text-display-2 font-display text-brand-900 mt-3 font-bold">
          SSDs &amp; storage products
        </h1>
        <p className="text-body-lg text-fg-muted mt-4 max-w-[56ch]">
          Every drive we list carries its full specification, the conditions we
          measured it under, and its exact warranty term. Products still in
          validation are marked — nothing here pretends to ship before it does.
        </p>
      </Section>

      <Section spacing="tight">
        <ProductFilters
          families={familyOptions}
          formFactors={formOptions}
          capacities={capacityOptions}
        />
      </Section>

      <Section spacing="tight" className="pb-16 md:pb-20">
        {matches.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-border rounded-lg border border-dashed px-6 py-16 text-center">
            <p className="text-body-lg text-fg font-medium">
              No products match these filters.
            </p>
            <div className="mt-4">
              <Button href="/products" variant="secondary">
                Clear filters
              </Button>
            </div>
          </div>
        )}
      </Section>

      {/* Roadmap band — clearly separated so future products never read as current */}
      <Section tone="subtle" spacing="tight">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-h3 text-brand-900 font-semibold">
              Memory, external drives, and enterprise storage are on the roadmap.
            </h2>
            <p className="text-body text-fg-muted mt-2 max-w-[60ch]">
              Planned products are listed separately and are not purchasable —
              we don&rsquo;t sell what we haven&rsquo;t built.
            </p>
          </div>
          <Link
            href="/products/roadmap"
            className="text-body text-brand-500 hover:text-brand-600 inline-flex shrink-0 items-center gap-2 font-medium"
          >
            View the roadmap
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
