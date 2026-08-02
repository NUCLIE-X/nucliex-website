import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DealerForm } from "@/components/forms/dealer-form";

export const metadata: Metadata = {
  title: "Apply to become a partner",
  description:
    "Apply to become a NUCLIEX dealer or distributor. The partner team replies within three working days.",
};

export default function PartnerApplyPage() {
  return (
    <Section spacing="tight" className="py-16 md:py-20">
      <Breadcrumb
        className="mb-8"
        items={[
          { label: "Home", href: "/" },
          { label: "Partners", href: "/partners" },
          { label: "Apply to become a partner" },
        ]}
      />
      <div className="max-w-3xl">
        <h1 className="font-display text-display-2 font-bold text-brand-900">
          Apply to become a partner
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-fg-muted">
          Five minutes of detail about your business — the partner team will be
          in touch within three working days.
        </p>
        <div className="mt-10">
          <DealerForm />
        </div>
      </div>
    </Section>
  );
}
