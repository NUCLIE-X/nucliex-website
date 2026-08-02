import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WarrantyForm } from "@/components/forms/warranty-form";

export const metadata: Metadata = {
  title: "Register your warranty",
  description:
    "Register a NUCLIEX drive once and the warranty follows it — the policy in plain language, then the form.",
};

export default function WarrantyPage() {
  return (
    <Section spacing="tight" className="py-16 md:py-20">
      <Breadcrumb
        className="mb-8"
        items={[
          { label: "Home", href: "/" },
          { label: "Support", href: "/support" },
          { label: "Register your warranty" },
        ]}
      />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="font-display text-display-2 font-bold text-brand-900">
            Register your warranty
          </h1>
          <p className="mt-4 max-w-[56ch] text-body-lg text-fg-muted">
            Two minutes now saves the proof-of-purchase hunt later. Registration
            is a convenience, not a condition — an unregistered drive with an
            invoice is still covered.
          </p>
          <div className="mt-10">
            <WarrantyForm />
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-lg border border-border p-6">
            <h2 className="text-h4 font-medium text-brand-900">
              The policy, plainly
            </h2>
            <dl className="mt-4 space-y-4 text-body-sm">
              <div>
                <dt className="text-label text-fg-subtle uppercase">Term</dt>
                <dd className="mt-1 text-fg-muted">
                  GREEN Series: 5 years standard, extended to 7 years with the
                  registration benefit (T&amp;C apply). Registering below is what
                  activates the extra two years.
                </dd>
              </div>
              <div>
                <dt className="text-label text-fg-subtle uppercase">
                  What&rsquo;s covered
                </dt>
                <dd className="mt-1 text-fg-muted">
                  Drive failure in normal use. The full coverage list ships with
                  the warranty policy ({"{{TBD:legal}}"}).
                </dd>
              </div>
              <div>
                <dt className="text-label text-fg-subtle uppercase">
                  What voids it
                </dt>
                <dd className="mt-1 text-fg-muted">
                  Physical damage and tampering; the precise conditions are
                  stated in the same policy — no surprises added later.
                </dd>
              </div>
              <div>
                <dt className="text-label text-fg-subtle uppercase">
                  If a drive fails
                </dt>
                <dd className="mt-1 text-fg-muted">
                  Raise an RMA quoting your registration ID. First response
                  within {"{{TBD:rma_hours}}"} hours.
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}
