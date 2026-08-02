import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ProcessSteps } from "@/components/ui/process-steps";
import { TrustPoints } from "@/components/ui/trust-points";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Business & enterprise storage",
  description:
    "Bulk pricing, GST invoicing, and dedicated support for IT companies, integrators, schools, and government buyers.",
};

const sectors = [
  "IT companies",
  "System integrators",
  "Retailers",
  "Schools & education",
  "Government",
  "SMBs & offices",
];

export default function BusinessPage() {
  return (
    <>
      <Section spacing="hero">
        <p className="text-label text-brand-500 uppercase">For business &amp; enterprise</p>
        <h1 className="text-display-2 font-display text-brand-900 mt-4 max-w-4xl font-bold">
          Storage and IT support for teams that can&rsquo;t afford downtime.
        </h1>
        <p className="text-body-lg text-fg-muted mt-6 max-w-[56ch]">
          Bulk pricing, GST invoicing, consistent supply, and a named contact
          who knows your setup. For IT companies, system integrators,
          retailers, schools, and government buyers.
        </p>
        <div className="mt-8">
          <Button href="/business/quote" size="lg">
            Request a business quote
          </Button>
        </div>
      </Section>

      <Section tone="subtle">
        <Reveal>
          <SectionHeader
            eyebrow="What business buyers get"
            title="The unglamorous things that make procurement easy"
          />
          <TrustPoints
            points={[
              {
                title: "Bulk pricing that stays quoted.",
                body: "Volume pricing in writing, honoured for the quoted period — not renegotiated at delivery.",
              },
              {
                title: "GST-compliant invoicing.",
                body: "Proper tax invoices with our GSTIN on every order, sized for your input credit paperwork.",
              },
              {
                title: "Consistent supply.",
                body: "We commit to quantities we can actually deliver, and tell you early if something changes.",
              },
              {
                title: "A named contact.",
                body: "One person who knows your orders, your setup, and your history — not a ticket queue.",
              },
              {
                title: "Support after the invoice.",
                body: "Warranty and RMA handling for your whole fleet, plus IT services under AMC if you want them.",
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow="Sectors" title="Who we supply" />
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
            {sectors.map((sector) => (
              <li key={sector} className="border-border text-body text-fg-muted border-t pt-4">
                {sector}
              </li>
            ))}
          </ul>
          <p className="text-body text-fg-muted mt-10 max-w-[68ch]">
            Government and education buyers: we understand tender documentation,
            compliance declarations, and formal quotation requirements. Ask for
            the paperwork you need with your quote and it arrives with the
            quote, not after three reminders.
          </p>
        </Reveal>
      </Section>

      <Section tone="subtle">
        <Reveal>
          <SectionHeader
            eyebrow="Procurement"
            title="From enquiry to delivery"
            lead="A real sequence — which is why it's numbered."
          />
          <ProcessSteps
            className="max-w-2xl"
            steps={[
              {
                title: "Send the requirement",
                detail: "Products, quantities, and timeline through the quote form — rough is fine.",
              },
              {
                title: "Quote within one working day",
                detail: "Itemised, GST-compliant, with validity stated.",
              },
              {
                title: "Confirm and schedule",
                detail: "You approve, we lock stock and agree the delivery date.",
              },
              {
                title: "Delivery and documentation",
                detail: "Goods, invoice, and warranty registration details together.",
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-h2 font-display text-brand-900 font-medium">
                Tell us what your fleet needs.
              </h2>
              <p className="text-body-lg text-fg-muted mt-3 max-w-[56ch]">
                One office or two hundred workstations — the process is the same.
              </p>
            </div>
            <Button href="/business/quote" size="lg" className="shrink-0">
              Request a business quote
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
