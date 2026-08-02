import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { company } from "@/data/company";

// noindex until the client's legal advisor supplies real text ({{TBD:legal}}).
export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How NUCLIEX INFOSYS handles personal data.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section spacing="tight" className="py-16 md:py-20" containerSize="narrow">
      <h1 className="text-display-2 font-display text-brand-900 font-bold">Privacy policy</h1>
      <p className="text-body-sm text-fg-subtle mt-4">
        Draft structure — final text is supplied by {company.legalName}&rsquo;s
        legal advisor. {"{{TBD:legal}}"}
      </p>
      <Prose className="mt-10">
        <h2>What we collect</h2>
        <p>
          {"{{TBD:legal}}"} — the categories of personal data collected through
          enquiry, quote, dealer, and warranty forms (name, contact details,
          business details, uploaded invoices), and the purpose of each.
        </p>
        <h2>How it is used</h2>
        <p>
          {"{{TBD:legal}}"} — responding to enquiries, fulfilling warranty
          service, and no third-party sale of data.
        </p>
        <h2>Cookies & analytics</h2>
        <p>
          This site uses cookieless analytics and sets no advertising or
          tracking cookies. {"{{TBD:legal}}"} — confirm final wording.
        </p>
        <h2>Data retention</h2>
        <p>{"{{TBD:legal}}"}</p>
        <h2>Your rights under the DPDP Act, 2023</h2>
        <p>
          {"{{TBD:legal}}"} — access, correction, and erasure requests, and how
          to raise them.
        </p>
        <h2>Grievance officer</h2>
        <p>
          {"{{TBD:legal}}"} — name, designation, and contact details of the
          grievance officer as required by the Digital Personal Data Protection
          Act, 2023.
        </p>
      </Prose>
    </Section>
  );
}
