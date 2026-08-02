import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { company } from "@/data/company";

// Drafted by the site builder 2026-08-02; noindex until the client's legal
// advisor signs it off (docs/09 #8).
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
        Draft of 2 August 2026 — pending review by {company.legalName}&rsquo;s
        legal advisor before launch.
      </p>
      <Prose className="mt-10">
        <h2>Use of this site</h2>
        <p>
          This website is operated by {company.legalName}. By using it you
          agree to these terms. Use the site lawfully and don&rsquo;t attempt
          to disrupt it, probe it, or misuse its forms.
        </p>
        <h2>Product information</h2>
        <p>
          Product specifications are published with their source stated —
          where a figure is rated from retail packaging, the page says so, and
          fuller test-condition datasheets are published as they become
          available. Catalogue listings are information, not offers for sale;
          purchases are agreed through quotes and invoices.
        </p>
        <h2>Warranty</h2>
        <p>
          Product warranties are governed by the separate warranty policy on
          this site and the terms supplied with the product.
        </p>
        <h2>Intellectual property</h2>
        <p>
          The NUCLIEX name, logo, and the content of this site belong to{" "}
          {company.legalName}. Don&rsquo;t reuse them without written
          permission, except as allowed by law.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          The site is provided as-is. To the extent permitted by law,{" "}
          {company.legalName} is not liable for indirect or consequential loss
          arising from use of the site. Nothing here limits rights you have
          under Indian consumer law.
        </p>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India. Courts at Thane,
          Maharashtra have jurisdiction.
        </p>
      </Prose>
    </Section>
  );
}
