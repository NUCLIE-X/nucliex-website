import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

// Drafted by the site builder 2026-08-02 from the confirmed 5+2 structure;
// noindex until the client's legal advisor signs it off (docs/09 #8).
export const metadata: Metadata = {
  title: "Warranty policy",
  description:
    "The NUCLIEX warranty policy — term, coverage, and claim process.",
  robots: { index: false, follow: true },
};

export default function WarrantyPolicyPage() {
  return (
    <Section spacing="tight" className="py-16 md:py-20" containerSize="narrow">
      <h1 className="font-display text-display-2 font-bold text-brand-900">
        Warranty policy
      </h1>
      <p className="mt-4 text-body-sm text-fg-subtle">
        Draft of 2 August 2026 — pending review by {company.legalName}&rsquo;s
        legal advisor before launch.
      </p>
      <Prose className="mt-10">
        <h2>Warranty term</h2>
        <p>
          GREEN Series: 5 years standard, plus 2 years extended registration
          benefit — 7 years in total for registered drives (terms and
          conditions apply). The term for every product is printed on its
          product page and packaging, and runs from the date of purchase on
          the invoice.
        </p>
        <h2>What is covered</h2>
        <p>
          Failure of the drive in normal use within the warranty term —
          manufacturing defects, component failure, and drives that stop
          operating to their published specification. If a covered drive
          fails, we repair or replace it. Data on the drive is not covered:
          keep backups, and see the RMA page before sending anything.
        </p>
        <h2>What is not covered</h2>
        <ul>
          <li>Physical damage — drops, crushing, bent connectors.</li>
          <li>Opening, modifying, or tampering with the drive.</li>
          <li>Liquid, fire, or electrical damage from outside the drive.</li>
          <li>A removed or defaced serial number label.</li>
          <li>Use outside the drive&rsquo;s published operating specification.</li>
        </ul>
        <h2>How to claim</h2>
        <p>
          Raise an RMA with the drive&rsquo;s serial number — the step-by-step
          process is on the RMA page. First response comes within 48 hours
          with a repair or replacement decision. A warranty registration ID or
          the purchase invoice speeds the claim; a missing invoice changes the
          paperwork, not the outcome, if the drive is genuinely in term.
        </p>
        <h2>Replacement drives</h2>
        <p>
          A repaired or replacement drive continues the original warranty term
          — the clock does not restart.
        </p>
        <h2>Contact</h2>
        <p>
          Warranty questions:{" "}
          <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>{" "}
          · {company.phone}.
        </p>
      </Prose>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/support/warranty">Register your warranty</Button>
        <Button href="/support/rma" variant="secondary">
          How RMA works
        </Button>
      </div>
    </Section>
  );
}
