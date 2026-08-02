import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getService } from "@/data/services";
import { company, isTbd } from "@/data/company";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact NUCLIEX INFOSYS",
  description:
    "Talk to our team about products, bulk orders, IT services, or support.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const serviceSlug =
    typeof params.service === "string" ? params.service : undefined;
  const service = serviceSlug ? getService(serviceSlug) : undefined;

  return (
    <Section spacing="tight" className="py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-label text-brand-500 uppercase">Contact</p>
          <h1 className="mt-3 font-display text-display-2 font-bold text-brand-900">
            Talk to us
          </h1>
          <p className="mt-4 max-w-[56ch] text-body-lg text-fg-muted">
            Products, bulk orders, IT services, or a drive that&rsquo;s
            misbehaving — one form, routed to the right person.
          </p>
          <div className="mt-10">
            <ContactForm
              defaultEnquiryType={service ? "services" : undefined}
              defaultMessage={
                service ? `Enquiry about: ${service.name}\n\n` : undefined
              }
            />
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-lg border border-border p-6">
            <h2 className="text-h4 font-medium text-brand-900">
              NUCLIEX INFOSYS
            </h2>
            <ul className="mt-4 space-y-4 text-body-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-fg-subtle"
                />
                <span className="text-fg-muted">
                  {company.addressLine}
                  <br />
                  {company.city}, {company.state}, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-fg-subtle"
                />
                <span className="text-fg-muted">{company.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-fg-subtle"
                />
                {isTbd(company.salesEmail) ? (
                  <span className="text-fg-muted">{company.salesEmail}</span>
                ) : (
                  <a
                    href={`mailto:${company.salesEmail}`}
                    className="text-brand-500"
                  >
                    {company.salesEmail}
                  </a>
                )}
              </li>
              <li className="flex items-center gap-3">
                <Clock
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-fg-subtle"
                />
                <span className="text-fg-muted">{company.hours}</span>
              </li>
            </ul>
          </div>

          {/* Map facade slot — an interaction-loaded embed replaces this the
              moment the registered address exists ({{TBD:address}}). A fake
              pin would be worse than no map. */}
          <div className="mt-6 rounded-lg border border-dashed border-border bg-surface-subtle p-6">
            <p className="text-body-sm text-fg-subtle">
              Map appears here once the registered address is published.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
