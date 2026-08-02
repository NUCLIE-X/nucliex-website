import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { QuoteForm } from "@/components/forms/quote-form";
import { company, isTbd } from "@/data/company";

// The action keeps its name through the flow: "Request a quote" button →
// "Request a quote" page → "Quote request sent." confirmation (CLAUDE.md §6).
export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Request a business or bulk quote from NUCLIEX — itemised, GST-compliant, and answered within one working day.",
};

export default function QuotePage() {
  return (
    <Section spacing="tight" className="py-16 md:py-20">
      <Breadcrumb
        className="mb-8"
        items={[
          { label: "Home", href: "/" },
          { label: "Business", href: "/business" },
          { label: "Request a quote" },
        ]}
      />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-display-2 font-display text-brand-900 font-bold">
            Request a quote
          </h1>
          <p className="text-body-lg text-fg-muted mt-4 max-w-[56ch]">
            Tell us what you need and when. We reply within one working day
            with an itemised, GST-compliant quote.
          </p>
          <div className="mt-10">
            <QuoteForm />
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="border-border rounded-lg border p-6">
            <h2 className="text-h4 text-brand-900 font-medium">Prefer to talk?</h2>
            <p className="text-body-sm text-fg-muted mt-2">
              Call or email and ask for sales — same one-working-day promise.
            </p>
            <dl className="text-body-sm mt-4 space-y-2">
              <div>
                <dt className="text-label text-fg-subtle uppercase">Phone</dt>
                <dd className="text-fg mt-1">{company.phone}</dd>
              </div>
              <div>
                <dt className="text-label text-fg-subtle uppercase">Email</dt>
                <dd className="text-fg mt-1">
                  {isTbd(company.salesEmail) ? company.salesEmail : (
                    <a href={`mailto:${company.salesEmail}`} className="text-brand-500">
                      {company.salesEmail}
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}
