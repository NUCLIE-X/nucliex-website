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
        <h1 className="text-display-2 font-display text-brand-900 mt-3 font-bold">
          Datasheets, guides &amp; documents
        </h1>
        <p className="text-body-lg text-fg-muted mt-4 max-w-[56ch]">
          Every published document for every product, with version and date —
          the same files our own technicians use.
        </p>
      </Section>

      <Section className="pt-0">
        {downloads.length > 0 ? (
          <DownloadTable items={downloads} />
        ) : (
          // {{TBD:documents}} — registry is empty until real PDFs exist (docs/09 #13)
          <div className="border-border max-w-2xl rounded-lg border border-dashed p-8">
            <h2 className="text-h3 text-brand-900 font-semibold">
              Documents are published with the first product launch.
            </h2>
            <p className="text-body text-fg-muted mt-3 max-w-[60ch]">
              Datasheets and install guides appear here the day their product
              does — versioned, dated, and kept current. Need something
              specific before then? Ask us directly.
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
