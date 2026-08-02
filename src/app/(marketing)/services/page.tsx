import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRight,
  Building2,
  FolderSync,
  HardDrive,
  Headset,
  Lightbulb,
  MonitorCog,
  Network,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  categoryLabels,
  services,
  type ServiceCategory,
} from "@/data/services";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ProcessSteps } from "@/components/ui/process-steps";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "IT services & support",
  description:
    "SSD upgrades, Windows deployment, data migration, networking, CCTV, and AMC for businesses in Pune.",
};

const icons: Record<string, LucideIcon> = {
  HardDrive,
  Wrench,
  MonitorCog,
  FolderSync,
  Network,
  Building2,
  ShieldCheck,
  Headset,
  Lightbulb,
};

const categoryOrder: ServiceCategory[] = [
  "hardware",
  "software",
  "network",
  "support",
  "consulting",
];

export default function ServicesPage() {
  return (
    <>
      <Section spacing="tight" className="pt-16 md:pt-20">
        <p className="text-label text-brand-500 uppercase">IT services</p>
        <h1 className="mt-3 font-display text-display-2 font-bold text-brand-900">
          The services that built this company
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-fg-muted">
          Before NUCLIEX made drives, we fixed machines, deployed Windows, ran
          office networks, and replaced a lot of failed storage. That work — for
          homes and offices across Pune — is still what we do every day.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="space-y-14">
          {categoryOrder.map((category) => {
            const group = services.filter(
              (service) => service.category === category,
            );
            if (group.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="border-b border-border pb-3 text-label text-fg-subtle uppercase">
                  {categoryLabels[category]}
                </h2>
                <ul>
                  {group.map((service) => {
                    const Icon = icons[service.icon] ?? Wrench;
                    return (
                      <li key={service.slug} className="border-b border-border">
                        <Link
                          href={`/services/${service.slug}` as Route}
                          className="group grid gap-2 py-6 transition-colors md:grid-cols-[24px_minmax(0,18rem)_1fr_auto] md:items-center md:gap-8"
                        >
                          <Icon
                            size={24}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="hidden text-brand-500 md:block"
                          />
                          <span className="duration-fast text-h4 font-medium text-fg transition-colors group-hover:text-brand-500">
                            {service.name}
                          </span>
                          <span className="max-w-[60ch] text-body text-fg-muted">
                            {service.summary}
                          </span>
                          <ArrowRight
                            size={20}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="duration-fast hidden text-fg-subtle transition-colors group-hover:text-brand-500 md:block"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="subtle">
        <Reveal>
          <SectionHeader
            eyebrow="How we work"
            title="The same sequence, every job"
            lead="Order matters here — which is why this list gets numbers."
          />
          <ProcessSteps
            className="max-w-2xl"
            steps={[
              {
                title: "Tell us the problem",
                detail:
                  "Phone, email, or the enquiry form — describe the machine, the office, or the plan.",
              },
              {
                title: "Assessment and a straight quote",
                detail:
                  "We diagnose or survey first, then quote in writing. No work starts before you approve it.",
              },
              {
                title: "The work gets done",
                detail: "On site or remotely, by the same team that quoted it.",
              },
              {
                title: "Verification and handover",
                detail:
                  "You see it working, and you get what was done in writing.",
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border p-8 md:flex-row md:items-center lg:p-10">
            <div>
              <p className="text-label text-brand-500 uppercase">
                Annual Maintenance Contracts
              </p>
              <h2 className="mt-2 text-h3 font-semibold text-brand-900">
                One contract, one number to call, no surprise invoices.
              </h2>
              <p className="mt-2 max-w-[60ch] text-body text-fg-muted">
                AMC customers get scheduled maintenance and priority response
                for everything we cover — from a named contact who knows the
                setup.
              </p>
            </div>
            <Button
              href="/services/amc"
              variant="secondary"
              className="shrink-0"
            >
              How AMC works
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
