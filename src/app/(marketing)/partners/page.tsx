import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ProcessSteps } from "@/components/ui/process-steps";
import { TrustPoints } from "@/components/ui/trust-points";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Become a NUCLIEX dealer or distributor",
  description:
    "Partner with an Indian storage brand: clear margins, dependable supply, and a fast RMA process.",
};

export default function PartnersPage() {
  return (
    <>
      <Section spacing="hero">
        <p className="text-label text-brand-500 uppercase">
          Dealers &amp; distributors
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-display-2 font-bold text-brand-900">
          Sell a brand that backs you up after the sale.
        </h1>
        <p className="mt-6 max-w-[56ch] text-body-lg text-fg-muted">
          Clear margins, dependable supply, and an RMA process that
          doesn&rsquo;t leave you explaining delays to your customer.
        </p>
        <div className="mt-8">
          <Button href="/partners/apply" size="lg">
            Apply to become a partner
          </Button>
        </div>
      </Section>

      <Section tone="subtle">
        <Reveal>
          {/* {{TBD:dealer_terms}} — margins/territory/minimums pending (docs/09 #17) */}
          <SectionHeader
            eyebrow="Why partner with NUCLIEX"
            title="What we actually offer partners"
            lead="Margin structure, territory policy, and minimum orders are being finalised — partners in the first conversations help shape them."
          />
          <TrustPoints
            points={[
              {
                title: "An RMA process that protects your reputation.",
                body: "When a customer's drive fails, you hand it to us and we handle it on stated timelines — you're never the one apologising for silence.",
              },
              {
                title: "Supply you can plan around.",
                body: "We confirm what we can deliver before you commit shelf space, and flag changes early.",
              },
              {
                title: "Marketing that doesn't need decoding.",
                body: "Honest spec sheets, datasheets, and product content your customers can verify.",
              },
              {
                title: "A direct line, not a portal queue.",
                body: "Partner enquiries go to a named person on the partner team.",
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Who we're looking for"
            title="Partners who value the after-sale as much as the sale"
            lead="Retailers, distributors, system integrators, and online sellers with a GST registration and a real customer base."
          />
        </Reveal>
      </Section>

      <Section tone="subtle">
        <Reveal>
          <SectionHeader
            eyebrow="Application"
            title="How the application works"
          />
          <ProcessSteps
            className="max-w-2xl"
            steps={[
              {
                title: "Apply online",
                detail:
                  "The form takes five minutes — business details, GSTIN, and what you want to stock.",
              },
              {
                title: "A real conversation",
                detail:
                  "The partner team calls within three working days to understand your market.",
              },
              {
                title: "Terms in writing",
                detail:
                  "Margins, supply expectations, and RMA handling — documented before you commit.",
              },
              {
                title: "Onboarding",
                detail:
                  "Product content, datasheets, and your direct contact. First order ships.",
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-h2 font-medium text-brand-900">
                Ready to stock NUCLIEX?
              </h2>
              <p className="mt-3 max-w-[56ch] text-body-lg text-fg-muted">
                Apply now — the partner team replies within three working days.
              </p>
            </div>
            <Button href="/partners/apply" size="lg" className="shrink-0">
              Apply to become a partner
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
