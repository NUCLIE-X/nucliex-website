import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { categoryLabels, getService, services } from "@/data/services";
import { env } from "@/lib/env";
import { company } from "@/data/company";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ProcessSteps } from "@/components/ui/process-steps";
import { JsonLd } from "@/components/utility/json-ld";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} — Thane`,
    description: service.summary,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: { "@type": "Organization", name: company.legalName },
    areaServed: ["Thane", "Mumbai", "Maharashtra", "India"],
    url: `${env.NEXT_PUBLIC_SITE_URL}/services/${service.slug}`,
  };

  const audienceLabel =
    service.audience.includes("consumer") &&
    service.audience.includes("business")
      ? "For homes and businesses"
      : service.audience.includes("business")
        ? "For businesses"
        : "For personal machines";

  return (
    <>
      <JsonLd data={serviceJsonLd} />

      <Section spacing="tight" className="pt-16 md:pt-20">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.name },
          ]}
        />
        <p className="text-label text-brand-500 uppercase">
          {categoryLabels[service.category]} · {audienceLabel}
        </p>
        <h1 className="mt-3 font-display text-display-2 font-bold text-brand-900">
          {service.name}
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-fg-muted">
          {service.summary}
        </p>
        {service.turnaround ? (
          <p className="mt-4 text-body-sm text-fg-subtle">
            Turnaround: {service.turnaround}
          </p>
        ) : null}
        <div className="mt-8">
          <Button href={`/contact?service=${service.slug}`}>
            Enquire about this service
          </Button>
        </div>
      </Section>

      <Section spacing="tight">
        <h2 className="font-display text-h2 font-medium text-brand-900">
          What you get
        </h2>
        <ul className="mt-6 max-w-2xl space-y-3">
          {service.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
                className="mt-1 shrink-0 text-brand-500"
              />
              <span className="text-body text-fg-muted">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {service.process ? (
        <Section spacing="tight">
          <h2 className="font-display text-h2 font-medium text-brand-900">
            How it works
          </h2>
          <ProcessSteps
            className="mt-6 max-w-2xl"
            steps={service.process.map(({ title, detail }) => ({
              title,
              detail,
            }))}
          />
        </Section>
      ) : null}

      <Section tone="subtle" spacing="tight" className="mt-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-h3 font-semibold text-brand-900">
              Ready when you are.
            </h2>
            <p className="mt-2 max-w-[60ch] text-body text-fg-muted">
              Describe the machines or the office and we&rsquo;ll come back with
              an assessment and a straight quote.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Button href={`/contact?service=${service.slug}`}>
              Enquire now
            </Button>
            <Button href="/services" variant="ghost">
              All services
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
