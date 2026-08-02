import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { company } from "@/data/company";

// noindex until the client's legal advisor supplies real text ({{TBD:legal}}).
export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms of use for the NUCLIEX website.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <Section spacing="tight" className="py-16 md:py-20" containerSize="narrow">
      <h1 className="font-display text-display-2 font-bold text-brand-900">
        Terms of use
      </h1>
      <p className="mt-4 text-body-sm text-fg-subtle">
        Draft structure — final text is supplied by {company.legalName}&rsquo;s
        legal advisor. {"{{TBD:legal}}"}
      </p>
      <Prose className="mt-10">
        <h2>Use of this site</h2>
        <p>{"{{TBD:legal}}"}</p>
        <h2>Product information</h2>
        <p>
          {"{{TBD:legal}}"} — specifications are published with measurement
          conditions; catalogue listings are not offers for sale.
        </p>
        <h2>Intellectual property</h2>
        <p>{"{{TBD:legal}}"}</p>
        <h2>Limitation of liability</h2>
        <p>{"{{TBD:legal}}"}</p>
        <h2>Governing law</h2>
        <p>{"{{TBD:legal}}"} — jurisdiction: Pune, Maharashtra, India.</p>
      </Prose>
    </Section>
  );
}
