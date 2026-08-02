import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

// noindex until the client's legal advisor supplies real text ({{TBD:legal}}).
export const metadata: Metadata = {
  title: "Warranty policy",
  description: "The NUCLIEX warranty policy — term, coverage, and claim process.",
  robots: { index: false, follow: true },
};

export default function WarrantyPolicyPage() {
  return (
    <Section spacing="tight" className="py-16 md:py-20" containerSize="narrow">
      <h1 className="text-display-2 font-display text-brand-900 font-bold">Warranty policy</h1>
      <p className="text-body-sm text-fg-subtle mt-4">
        Draft structure — final terms are supplied by {company.legalName}.
        {" {{TBD:legal}} {{TBD:warranty_years}}"}
      </p>
      <Prose className="mt-10">
        <h2>Warranty term</h2>
        <p>
          {"{{TBD:warranty_years}}"} — stated in years per product, printed on
          the product page and the packaging.
        </p>
        <h2>What is covered</h2>
        <p>{"{{TBD:legal}}"} — failure in normal use within the term.</p>
        <h2>What is not covered</h2>
        <p>
          {"{{TBD:legal}}"} — physical damage, tampering, and the precise
          exclusion list. No exclusions are added after purchase.
        </p>
        <h2>How to claim</h2>
        <p>
          Raise an RMA with the drive&rsquo;s serial number. The step-by-step
          process and its timelines are published on the RMA page.
        </p>
        <h2>Replacement drives</h2>
        <p>{"{{TBD:legal}}"} — how warranty continues on a replacement unit.</p>
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
