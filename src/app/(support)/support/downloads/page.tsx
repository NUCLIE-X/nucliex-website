import type { Metadata } from "next";
import { downloads } from "@/data/downloads";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DownloadTable } from "@/components/ui/download-table";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Datasheets, install guides, and warranty cards for NUCLIEX products — filterable by product and document type.",
};

export default function DownloadsPage() {
  return (
    <>
      <Section spacing="tight" className="pt-16 md:pt-20">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Support", href: "/support" },
            { label: "Downloads" },
          ]}
        />
        <p className="text-label text-brand-500 uppercase">Downloads</p>
        <h1 className="mt-3 font-display text-display-2 font-bold text-brand-900">
          Datasheets, guides &amp; documents
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-fg-muted">
          Every published document for every product, with version and date —
          the same files our own technicians use.
        </p>
      </Section>

      <Section className="pt-0">
        {downloads.length > 0 ? (
          <DownloadTable items={downloads} />
        ) : (
          // {{TBD:documents}} — registry is empty until real PDFs exist (docs/09 #13)
          <div className="max-w-2xl rounded-lg border border-dashed border-border p-8">
            <h2 className="text-h3 font-semibold text-brand-900">
              Documents are published with the first product launch.
            </h2>
            <p className="mt-3 max-w-[60ch] text-body text-fg-muted">
              Datasheets and install guides appear here the day their product
              does — versioned, dated, and kept current. Need something specific
              before then? Ask us directly.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="secondary">
                Ask for a document
              </Button>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
