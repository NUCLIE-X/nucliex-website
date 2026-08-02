import type { Metadata } from "next";
import { products } from "@/data/products";
import { Section } from "@/components/layout/section";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "NVMe SSDs",
  description:
    "M.2 NVMe SSDs for gaming, content creation, and workstation builds.",
};

export default function NvmeSsdPage() {
  const drives = products.filter((product) => product.family === "nvme-ssd");

  return (
    <>
      <Section spacing="tight" className="pt-16 md:pt-20">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "NVMe SSDs" },
          ]}
        />
        <p className="text-label text-brand-500 uppercase">NVMe SSDs</p>
        <h1 className="mt-3 font-display text-display-2 font-bold text-brand-900">
          M.2 drives for builds that outgrow SATA
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-fg-muted">
          Gaming, content creation, and workstation loads want the bandwidth
          only NVMe gives. Our NVMe line follows the same rule as everything we
          make: no figure is published before it&rsquo;s verified.
        </p>
      </Section>

      <Section className="pt-0">
        {drives.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {drives.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-2xl rounded-lg border border-dashed border-border p-8">
            <h2 className="text-h3 font-semibold text-brand-900">
              The NVMe line-up is being finalised.
            </h2>
            <p className="mt-3 max-w-[60ch] text-body text-fg-muted">
              Models and validated specifications are published here the moment
              they clear testing. If you&rsquo;re planning a build or a bulk
              order now, talk to us — we&rsquo;ll tell you exactly what&rsquo;s
              coming and when.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="/contact">Talk to us</Button>
              <Button href="/products/roadmap" variant="secondary">
                View the roadmap
              </Button>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
