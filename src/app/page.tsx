import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Phone } from "lucide-react";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeBlog } from "@/components/sections/home-blog";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { SpecRail } from "@/components/product/spec-rail";
import { ProductFrame } from "@/components/product/product-frame";
import { TrustPoints } from "@/components/ui/trust-points";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardMedia } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { activeFamilies } from "@/data/products";
import { company, isTbd } from "@/data/company";

export const metadata: Metadata = {
  title: { absolute: "NUCLIEX — SSDs & IT solutions engineered in India" },
  description:
    "SATA and NVMe SSDs, computer hardware, and professional IT services from NUCLIEX INFOSYS, Thane. Clear warranty, real support.",
};

// Six live, deliverable services (docs/05 §1) — chips on the services strip.
const serviceChips = [
  { label: "SSD & hardware upgrades", href: "/services/ssd-upgrades" },
  { label: "Repair & diagnostics", href: "/services/repair-diagnostics" },
  { label: "Windows & deployment", href: "/services/windows-deployment" },
  { label: "Data migration", href: "/services/data-migration" },
  { label: "Networking & CCTV", href: "/services/networking" },
  { label: "Annual maintenance contracts", href: "/services/amc" },
];

// Audiences from docs/01 §1 — use cases trace to the confirmed service/product scope.
const builtFor = [
  {
    title: "Consumer",
    intro: "PC builders, gamers, students, and content creators.",
    cases: [
      "Speed up a slowing laptop with an SSD upgrade",
      "Build a gaming rig on a sensible budget",
      "Keep coursework and projects on storage you trust",
    ],
    linkLabel: "Browse SSDs",
    href: "/products",
  },
  {
    title: "Professional",
    intro: "Developers, designers, engineers, and workstation users.",
    cases: [
      "Faster builds, exports, and project loads",
      "Workstation drives picked for sustained work",
      "Data migration handled without downtime",
    ],
    linkLabel: "See how we work",
    href: "/services",
  },
  {
    title: "Business",
    intro: "IT companies, integrators, retailers, schools, and government.",
    cases: [
      "Bulk supply with GST invoicing",
      "Office IT, networking, and CCTV under one AMC",
      "A named contact who knows your setup",
    ],
    linkLabel: "For business",
    href: "/business",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero */}
      <HomeHero />

      {/* 02 — Spec rail: company figures, only real numbers (docs/05 §3) */}
      <SpecRail
        items={[
          {
            value: "7 YEAR",
            label: "Warranty with registration",
            note: "GREEN Series: 5 years standard + 2 years extended registration benefit. T&C apply.",
          },
          { value: "{{TBD:rma_hours}} HR", label: "RMA first response" },
          { value: "{{TBD:service_count}}", label: "IT services delivered" },
          { value: "THANE, MH", label: "Service & support base" },
        ]}
      />

      {/* 03 — Product families: one card per real family, never padded */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Products"
            title="Two families, chosen deliberately"
            lead="We make the drives most machines actually need — SATA for dependable upgrades, NVMe for speed-hungry builds."
            action={
              <Button
                href="/products"
                variant="secondary"
                icon={ArrowRight}
                iconPosition="right"
              >
                All products
              </Button>
            }
          />
          <div className="grid gap-6 md:grid-cols-2">
            {activeFamilies.map((family) => (
              <Card key={family.key} interactive>
                <CardMedia>
                  <ProductFrame
                    ratio="16/9"
                    label={family.frameLabel}
                    src={family.image?.src}
                    alt={family.image?.alt}
                  />
                </CardMedia>
                <CardBody>
                  <h3 className="text-h3 font-semibold">
                    <Link
                      href={family.href as Route}
                      className="after:absolute after:inset-0"
                    >
                      {family.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-body text-fg-muted">
                    {family.descriptor}
                  </p>
                  <p className="mt-4 text-body font-medium text-brand-500">
                    View specifications
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 04 — Why NUCLIEX: hairline list, approved copy verbatim (docs/05 §3) */}
      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Why NUCLIEX"
            title="Built to be trusted, not just bought"
          />
          <TrustPoints
            points={[
              {
                title: "Engineered, then verified.",
                body: "Every drive is validated for sustained performance and endurance before it carries the NUCLIEX name. We publish the conditions our numbers were measured under.",
              },
              {
                title: "A warranty written in plain language.",
                body: "The term, what's covered, and what voids it — stated on the product page, not buried in a PDF.",
              },
              {
                title: "Support that answers.",
                body: "Phone, email, and remote support from a team based in Thane. You reach a person, not a queue.",
              },
              {
                title: "Honest specifications.",
                body: "No “up to” figures without the test conditions. If a number isn't verified, we don't print it.",
              },
            ]}
          />
        </Reveal>
      </Section>

      {/* 05 — Services strip: today's revenue (docs/05 §3) */}
      <Section tone="subtle">
        <Reveal>
          <SectionHeader
            eyebrow="IT services"
            title="We've been fixing and building IT systems since before we made drives."
            lead="Laptop and desktop upgrades, Windows deployment, data migration, networking, CCTV, and annual maintenance contracts for offices across Thane and Mumbai."
            action={
              <Button
                href="/services"
                variant="secondary"
                icon={ArrowRight}
                iconPosition="right"
              >
                View all services
              </Button>
            }
          />
          <ul className="flex flex-wrap gap-3">
            {serviceChips.map((chip) => (
              <li key={chip.href}>
                <Link
                  href={chip.href as Route}
                  className="duration-fast inline-flex h-11 items-center rounded-md border border-border-strong bg-surface px-5 text-body font-medium text-fg transition-colors ease-out hover:border-brand-500 hover:text-brand-500"
                >
                  {chip.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 md:hidden">
            <Button
              href="/services"
              variant="secondary"
              icon={ArrowRight}
              iconPosition="right"
            >
              View all services
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* 06 — Built for: consumer / professional / business */}
      <Section>
        <Reveal>
          <SectionHeader eyebrow="Built for" title="Who we build for" />
          <div className="grid gap-10 md:grid-cols-3">
            {builtFor.map((audience) => (
              <div key={audience.title} className="border-t border-border pt-6">
                <h3 className="text-h3 font-semibold">{audience.title}</h3>
                <p className="mt-1 text-body-sm text-fg-subtle">
                  {audience.intro}
                </p>
                <ul className="mt-4 space-y-2">
                  {audience.cases.map((useCase) => (
                    <li key={useCase} className="text-body text-fg-muted">
                      {useCase}
                    </li>
                  ))}
                </ul>
                <Link
                  href={audience.href as Route}
                  className="mt-4 inline-block text-body font-medium text-brand-500 hover:text-brand-600"
                >
                  {audience.linkLabel}
                </Link>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 07 — Warranty & support (dark), approved copy verbatim */}
      <Section tone="navy">
        <Reveal>
          <div className="max-w-2xl">
            <SectionHeader
              onDark
              eyebrow="Warranty & support"
              title="If something goes wrong, here's exactly what happens."
              lead="Register your product once. If a drive fails inside its warranty term, raise an RMA and we respond within {{TBD:rma_hours}} hours with a replacement or repair decision. No forms in triplicate, no proof-of-purchase games."
            />
            <div className="flex flex-wrap gap-4">
              <Button href="/support/warranty" variant="onDark">
                Register your warranty
              </Button>
              <Button href="/support/rma" variant="onDark">
                Start an RMA
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 08 — Blog: self-removing below three posts */}
      <HomeBlog />

      {/* 09 — CTA band (docs/05 §3) */}
      <Section tone="subtle">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-h2 font-medium text-brand-900">
                Tell us what you&rsquo;re building.
              </h2>
              <p className="mt-3 max-w-[56ch] text-body-lg text-fg-muted">
                Whether it&rsquo;s one laptop upgrade or two hundred
                workstations, we&rsquo;ll give you a straight answer.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-4">
              <Button href="/business/quote" size="lg">
                Request a quote
              </Button>
              {isTbd(company.phone) ? (
                <span className="flex items-center gap-2 text-body text-fg-muted">
                  <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                  {company.phone}
                </span>
              ) : (
                <Button
                  href={company.phoneHref}
                  variant="secondary"
                  size="lg"
                  icon={Phone}
                >
                  {company.phone}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
