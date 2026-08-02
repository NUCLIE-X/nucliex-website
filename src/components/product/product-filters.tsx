"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export type FilterOption = { value: string; label: string; count: number };

type ProductFiltersProps = {
  families: FilterOption[];
  formFactors: FilterOption[];
  capacities: FilterOption[];
};

/**
 * Real checkboxes in a real GET form (docs/04 §3): filtered views are
 * linkable, and the form submits without JavaScript. With JS, changes apply
 * immediately via router.replace. Filtered states are noindex'd by the page.
 */
export function ProductFilters({ families, formFactors, capacities }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const apply = () => {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      if (typeof value === "string" && value) params.append(key, value);
    }
    const query = params.toString();
    router.replace(query ? `/products?${query}` : "/products", { scroll: false });
  };

  const groups = [
    { name: "family", legend: "Family", options: families },
    { name: "form", legend: "Form factor", options: formFactors },
    { name: "capacity", legend: "Capacity", options: capacities },
  ].filter((group) => group.options.length > 0);

  const anyActive = groups.some((group) => searchParams.has(group.name));

  return (
    <form
      ref={formRef}
      method="get"
      action="/products"
      className="flex flex-wrap items-start gap-x-12 gap-y-6"
      aria-label="Filter products"
    >
      {groups.map((group) => (
        <fieldset key={group.name}>
          <legend className="text-label text-fg-subtle mb-3 uppercase">{group.legend}</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {group.options.map((option) => (
              <Checkbox
                key={option.value}
                name={group.name}
                value={option.value}
                label={`${option.label} (${option.count})`}
                defaultChecked={searchParams.getAll(group.name).includes(option.value)}
                onChange={apply}
              />
            ))}
          </div>
        </fieldset>
      ))}
      <div className="flex items-center gap-3 pt-6">
        {/* Only needed without JavaScript — with JS, changes apply on toggle. */}
        <Button type="submit" variant="secondary" size="sm">
          Apply filters
        </Button>
        {anyActive ? (
          <Button href="/products" variant="ghost" size="sm">
            Clear filters
          </Button>
        ) : null}
      </div>
    </form>
  );
}
