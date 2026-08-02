import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProcessSteps } from "@/components/ui/process-steps";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "RMA & replacement process",
  description:
    "How a NUCLIEX RMA works: the numbered steps, the timelines at each one, and what to have ready.",
};

// {{TBD:rma_process}} — the sequence below is the designed process; the
// client confirms timelines and any step changes before launch (docs/09 #5).
export default function RmaPage() {
  return (
    <>
      <Section spacing="tight" className="pt-16 md:pt-20">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Support", href: "/support" },
            { label: "RMA / replacement" },
          ]}
        />
        <p className="text-label text-brand-500 uppercase">RMA / replacement</p>
        <h1 className="text-display-2 font-display text-brand-900 mt-3 font-bold">
          What actually happens when a drive fails
        </h1>
        <p className="text-body-lg text-fg-muted mt-4 max-w-[56ch]">
          An RMA is a sequence with stated timelines, not a negotiation.
          Here is the whole of it.
        </p>
      </Section>

      <Section spacing="tight">
        <ProcessSteps
          className="max-w-2xl"
          steps={[
            {
              title: "Raise the RMA",
              detail:
                "Email support with your serial number, registration ID if you have one, and what's failing. We confirm receipt immediately.",
            },
            {
              title: `Decision within {{TBD:rma_hours}} hours`,
              detail:
                "Replacement or repair, stated plainly, with the shipping instructions if the drive needs to come to us.",
            },
            {
              title: "Send the drive",
              detail:
                "Pack it padded, include the RMA reference. Back up first if the drive still mounts — RMA processing wipes it.",
            },
            {
              title: "Resolution ships",
              detail:
                "The replacement or repaired drive ships back with the outcome documented. The warranty continues on the replacement.",
            },
          ]}
        />
      </Section>

      <Section spacing="tight">
        <h2 className="text-h2 font-display text-brand-900 font-medium">Have these ready</h2>
        <ul className="text-body text-fg-muted mt-6 max-w-2xl list-disc space-y-2 pl-6">
          <li>The drive&rsquo;s serial number (on the label).</li>
          <li>Your warranty registration ID, or the purchase invoice.</li>
          <li>Where and roughly when you bought it.</li>
          <li>A short description of the failure — what you saw, and when it started.</li>
        </ul>
        <p className="text-body text-fg-muted mt-6 max-w-[68ch]">
          Missing an invoice? Start the conversation anyway — a missing
          document changes the paperwork, not the outcome, if the drive is
          genuinely in term.
        </p>
      </Section>

      <Section tone="subtle" spacing="tight" className="mt-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-h3 text-brand-900 font-semibold">Start an RMA</h2>
            <p className="text-body text-fg-muted mt-2 max-w-[60ch]">
              Email {company.supportEmail} with the details above, or register
              your drive first so the record exists.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Button href="/support/warranty">Register your warranty</Button>
            <Button href="/contact" variant="secondary">
              Contact support
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
