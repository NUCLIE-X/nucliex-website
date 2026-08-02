import Link from "next/link";
import type { Route } from "next";
import { familyLabels, type Product } from "@/data/products";
import { Card, CardBody, CardMedia } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductFrame } from "@/components/product/product-frame";

const statusBadge: Record<Product["status"], { tone: "success" | "warning" | "planned"; label: string }> = {
  available: { tone: "success", label: "Available" },
  "coming-soon": { tone: "warning", label: "Coming soon" },
  planned: { tone: "planned", label: "Planned" },
};

/**
 * Status badge is mandatory (docs/06 §3) — a non-shipping product must never
 * read as buyable. Headline figures render only when confirmed.
 */
export function ProductCard({ product }: { product: Product }) {
  const badge = statusBadge[product.status];
  const confirmedHighlights = product.highlights
    .filter((h) => !h.value.includes("{{TBD"))
    .slice(0, 2);

  return (
    <Card interactive>
      <CardMedia>
        <ProductFrame
          ratio="4/3"
          label={`${product.name} · ${familyLabels[product.family]}`}
          src={product.images[0]?.src}
          alt={product.images[0]?.alt}
        />
      </CardMedia>
      <CardBody>
        <div className="flex items-center justify-between gap-4">
          <p className="text-label text-fg-subtle uppercase">{familyLabels[product.family]}</p>
          <Badge tone={badge.tone}>{badge.label}</Badge>
        </div>
        <h3 className="text-h3 mt-3 font-semibold">
          <Link href={`/products/${product.slug}` as Route} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="text-body text-fg-muted mt-2">{product.tagline}</p>
        <p className="text-body-sm text-fg-subtle mt-3">
          {product.capacities.length > 0
            ? `${product.capacities[0]} – ${product.capacities[product.capacities.length - 1]} · `
            : ""}
          {product.formFactor} · {product.interface}
        </p>
        {confirmedHighlights.length > 0 ? (
          <dl className="border-border mt-4 flex gap-8 border-t pt-4">
            {confirmedHighlights.map((h) => (
              <div key={h.label}>
                <dd className="text-data font-mono tnum text-brand-900 order-1 font-medium">
                  {h.value}
                </dd>
                <dt className="text-label text-fg-subtle order-2 uppercase">{h.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}
        <p className="text-body text-brand-500 mt-4 font-medium">View specifications</p>
      </CardBody>
    </Card>
  );
}
