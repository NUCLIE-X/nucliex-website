import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { familyLabels, getProduct, products } from "@/data/products";
import { company } from "@/data/company";
import { env } from "@/lib/env";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpecRail } from "@/components/product/spec-rail";
import { SpecTable } from "@/components/product/spec-table";
import { ProductFrame } from "@/components/product/product-frame";
import { CapacitySelector } from "@/components/product/capacity-selector";
import { JsonLd } from "@/components/utility/json-ld";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.seo.title, description: product.seo.description };
}

const statusBadge = {
  available: { tone: "success" as const, label: "Available" },
  "coming-soon": { tone: "warning" as const, label: "Coming soon" },
  planned: { tone: "planned" as const, label: "Planned" },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const badge = statusBadge[product.status];
  const datasheet = product.documents.find((doc) => doc.type === "datasheet");

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: company.brand },
    description: product.summary,
    url: `${env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`,
    // No Offer until pricing is confirmed — a fake price is a policy violation.
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: env.NEXT_PUBLIC_SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${env.NEXT_PUBLIC_SITE_URL}/products`,
      },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Section spacing="tight" className="pt-16 md:pt-20">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductFrame
            ratio="4/3"
            label={`${product.name} · ${familyLabels[product.family]}`}
            src={product.images[0]?.src}
            alt={product.images[0]?.alt}
            priority
          />
          <div>
            <div className="flex items-center gap-4">
              <p className="text-label text-brand-500 uppercase">
                {familyLabels[product.family]}
              </p>
              <Badge tone={badge.tone}>{badge.label}</Badge>
            </div>
            <h1 className="mt-3 font-display text-display-2 font-bold text-brand-900">
              {product.name}
            </h1>
            <p className="mt-3 max-w-[56ch] text-body-lg text-fg-muted">
              {product.tagline}
            </p>

            {product.capacities.length > 0 ? (
              <CapacitySelector
                capacities={product.capacities}
                className="mt-8"
              />
            ) : (
              <p className="mt-8 text-body-sm text-fg-subtle">
                Capacity options: {"{{TBD:products}}"} — published after the
                line-up is confirmed.
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/business/quote">Request a quote</Button>
              {datasheet ? (
                <Button
                  href={datasheet.href}
                  variant="secondary"
                  icon={Download}
                >
                  Download datasheet
                </Button>
              ) : null}
            </div>

            <p className="mt-8 border-t border-border pt-4 text-body-sm text-fg-muted">
              Warranty:{" "}
              {product.warrantyYears !== null
                ? `${product.warrantyYears} years`
                : "{{TBD:warranty_years}} — exact term published before launch"}{" "}
              · {product.formFactor} · {product.interface}
            </p>
          </div>
        </div>
      </Section>

      <SpecRail items={product.highlights} />

      <Section spacing="tight">
        <h2 className="font-display text-h2 font-medium text-brand-900">
          Overview
        </h2>
        <p className="mt-4 max-w-[68ch] text-body text-fg-muted">
          {product.summary}
        </p>
      </Section>

      <Section spacing="tight">
        <h2 className="font-display text-h2 font-medium text-brand-900">
          Specifications
        </h2>
        {product.specs.length > 0 ? (
          <SpecTable
            specs={product.specs}
            className="mt-6 max-w-2xl"
            caption={`${product.name} specifications`}
          />
        ) : (
          <div className="mt-6 max-w-2xl rounded-lg border border-dashed border-border p-6">
            <p className="text-body text-fg-muted">
              {"{{TBD:specs}}"} — full specifications, including the conditions
              they were measured under, are published once validation completes.
              We don&rsquo;t print numbers we haven&rsquo;t verified.
            </p>
          </div>
        )}
      </Section>

      <Section spacing="tight">
        <h2 className="font-display text-h2 font-medium text-brand-900">
          What it&rsquo;s for
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {product.useCases.map((useCase) => (
            <li key={useCase} className="border-t border-border pt-4">
              <p className="text-body font-medium text-fg">{useCase}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="tight">
        <h2 className="font-display text-h2 font-medium text-brand-900">
          Warranty &amp; support
        </h2>
        <p className="mt-4 max-w-[68ch] text-body text-fg-muted">
          Register once and the warranty follows the drive. If it fails inside
          the term, the RMA process is a numbered sequence with stated timelines
          — not a negotiation.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="/support/warranty" variant="secondary">
            Register your warranty
          </Button>
          <Button href="/support/rma" variant="ghost">
            How RMA works
          </Button>
        </div>
      </Section>

      {product.documents.length > 0 ? (
        <Section spacing="tight">
          <h2 className="font-display text-h2 font-medium text-brand-900">
            Documents
          </h2>
          <ul className="mt-6 space-y-3">
            {product.documents.map((doc) => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  className="text-body font-medium text-brand-500 hover:text-brand-600"
                >
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section tone="subtle" spacing="tight" className="mt-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-h3 font-semibold text-brand-900">
              Planning an upgrade or a fleet refresh?
            </h2>
            <p className="mt-2 max-w-[60ch] text-body text-fg-muted">
              Tell us the machines and the workload — we&rsquo;ll recommend the
              right drive and quote it straight.
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
