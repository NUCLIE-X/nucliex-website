import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { Download, FileQuestion, RefreshCcw, ShieldCheck } from "lucide-react";
import { company } from "@/data/company";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Card, CardBody } from "@/components/ui/card";
import { SerialLookupForm } from "@/components/forms/serial-lookup-form";

export const metadata: Metadata = {
  title: "Support, warranty & downloads",
  description:
    "Register a warranty, start an RMA, download datasheets, or reach the NUCLIEX support team.",
};

const entries = [
  {
    href: "/support/warranty",
    icon: ShieldCheck,
    title: "Warranty registration",
    body: "Register once — claims go faster when the record already exists.",
  },
  {
    href: "/support/rma",
    icon: RefreshCcw,
    title: "RMA / replacement",
    body: "The numbered process with timelines, and what to have ready.",
  },
  {
    href: "/support/downloads",
    icon: Download,
    title: "Downloads",
    body: "Datasheets, install guides, and warranty cards per product.",
  },
  {
    href: "/support/faq",
    icon: FileQuestion,
    title: "FAQ",
    body: "Straight answers on warranty, RMA, products, and services.",
  },
];

// This page is a trust asset — it gets the same design care as the homepage.
export default function SupportPage() {
  return (
    <>
      <Section spacing="tight" className="pt-16 md:pt-20">
        <p className="text-label text-brand-500 uppercase">Support</p>
        <h1 className="text-display-2 font-display text-brand-900 mt-3 font-bold">
          If something&rsquo;s wrong, start here.
        </h1>
        <p className="text-body-lg text-fg-muted mt-4 max-w-[56ch]">
          Warranty, replacements, documents, and people who answer. No ticket
          maze — pick the door that matches your problem.
        </p>
      </Section>

      <Section spacing="tight">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((entry) => (
            <Card key={entry.href} interactive>
              <CardBody>
                <entry.icon
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="text-brand-500"
                />
                <h2 className="text-h4 mt-4 font-medium">
                  <Link href={entry.href as Route} className="after:absolute after:inset-0">
                    {entry.title}
                  </Link>
                </h2>
                <p className="text-body-sm text-fg-muted mt-2">{entry.body}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section spacing="tight">
        <SerialLookupForm />
      </Section>

      <Section tone="subtle" spacing="tight" className="mt-8">
        <SectionHeader
          eyebrow="Contact channels"
          title="Reach a person"
          lead="Stated response times, not vague promises — exact figures are published with the contact details."
        />
        <dl className="grid gap-8 sm:grid-cols-3">
          <div className="border-border border-t pt-4">
            <dt className="text-label text-fg-subtle uppercase">Phone</dt>
            <dd className="text-body text-fg mt-2">{company.phone}</dd>
            <dd className="text-body-sm text-fg-subtle mt-1">{company.hours}</dd>
          </div>
          <div className="border-border border-t pt-4">
            <dt className="text-label text-fg-subtle uppercase">Support email</dt>
            <dd className="text-body text-fg mt-2">{company.supportEmail}</dd>
            <dd className="text-body-sm text-fg-subtle mt-1">
              First response: {"{{TBD:rma_hours}}"} hours
            </dd>
          </div>
          <div className="border-border border-t pt-4">
            <dt className="text-label text-fg-subtle uppercase">Remote support</dt>
            <dd className="text-body text-fg mt-2">By arrangement over phone or email</dd>
            <dd className="text-body-sm text-fg-subtle mt-1">
              Sessions start only with your consent
            </dd>
          </div>
        </dl>
      </Section>
    </>
  );
}
