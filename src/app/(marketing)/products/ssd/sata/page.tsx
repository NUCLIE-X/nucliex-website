import type { Metadata } from "next";
import { products } from "@/data/products";
import { Section } from "@/components/layout/section";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "SATA SSDs",
  description:
    "Reliable 2.5-inch SATA SSDs for laptop and desktop upgrades, with published performance figures.",
};

export default function SataSsdPage() {
  const drives = products.filter((product) => product.family === "sata-ssd");

  return (
    <>
      <Section spacing="tight" className="pt-16 md:pt-20">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "SATA SSDs" },
          ]}
        />
        <p className="text-label text-brand-500 uppercase">SATA SSDs</p>
        <h1 className="text-display-2 font-display text-brand-900 mt-3 font-bold">
          The upgrade most machines actually need
        </h1>
        <p className="text-body-lg text-fg-muted mt-4 max-w-[56ch]">
          A 2.5-inch SATA SSD is still the highest-impact upgrade for a working
          laptop or desktop. Ours are validated for sustained performance, and
          we publish the conditions every figure was measured under.
        </p>
      </Section>

      <Section className="pt-0">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {drives.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
