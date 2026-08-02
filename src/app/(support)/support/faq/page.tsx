import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Accordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/utility/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Straight answers on NUCLIEX warranty, RMA and replacements, products, and IT services.",
};

const groups = [...new Set(faqs.map((faq) => faq.group))];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Section spacing="tight" className="pt-16 md:pt-20">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Support", href: "/support" },
            { label: "FAQ" },
          ]}
        />
        <p className="text-label text-brand-500 uppercase">FAQ</p>
        <h1 className="mt-3 font-display text-display-2 font-bold text-brand-900">
          Asked often, answered straight
        </h1>
      </Section>

      <Section className="pt-0">
        <div className="max-w-3xl space-y-12">
          {groups.map((group) => (
            <div key={group}>
              <h2 className="text-h3 font-semibold text-brand-900">{group}</h2>
              <Accordion
                className="mt-4"
                items={faqs
                  .filter((faq) => faq.group === group)
                  .map((faq) => ({
                    id: faq.id,
                    title: faq.question,
                    content: faq.answer,
                  }))}
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
