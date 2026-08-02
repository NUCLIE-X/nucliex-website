"use client";

import { useSearchParams } from "next/navigation";
import { familyLabels, products, type Product } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters, type FilterOption } from "@/components/product/product-filters";
import { Button } from "@/components/ui/button";

function countBy(items: Product[], pick: (p: Product) => string[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const item of items) {
    for (const key of pick(item)) {
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }
  return map;
}

/** STATIC EXPORT MODE: URL-synced filtering runs fully client-side. */
export function ProductsExplorer() {
  const searchParams = useSearchParams();
  const familyFilter = searchParams.getAll("family");
  const formFilter = searchParams.getAll("form");
  const capacityFilter = searchParams.getAll("capacity");

  const matches = products.filter((product) => {
    if (familyFilter.length && !familyFilter.includes(product.family)) return false;
    if (formFilter.length && !formFilter.includes(product.formFactor)) return false;
    if (capacityFilter.length && !product.capacities.some((c) => capacityFilter.includes(c)))
      return false;
    return true;
  });

  const familyOptions: FilterOption[] = [...countBy(products, (p) => [p.family])].map(
    ([value, count]) => ({
      value,
      label: familyLabels[value as Product["family"]],
      count,
    }),
  );
  const formOptions: FilterOption[] = [...countBy(products, (p) => [p.formFactor])].map(
    ([value, count]) => ({ value, label: value, count }),
  );
  const capacityOptions: FilterOption[] = [...countBy(products, (p) => p.capacities)].map(
    ([value, count]) => ({ value, label: value, count }),
  );

  return (
    <>
      <div className="pb-10">
        <ProductFilters
          families={familyOptions}
          formFactors={formOptions}
          capacities={capacityOptions}
        />
      </div>
      {matches.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <p className="text-body-lg font-medium text-fg">No products match these filters.</p>
          <div className="mt-4">
            <Button href="/products" variant="secondary">
              Clear filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
