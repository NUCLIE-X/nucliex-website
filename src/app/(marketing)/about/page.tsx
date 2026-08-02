import type { Metadata } from "next";
import { company } from "@/data/company";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { TrustPoints } from "@/components/ui/trust-points";
import { ProductFrame } from "@/components/product/product-frame";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About NUCLIEX INFOSYS",
  description:
    "An Indian technology company building reliable storage, founded by Ramjit J. Mourya. Based in Mira Road, Thane.",
};

export default function AboutPage() {
  return (
    <>
      {/* Opening copy verbatim from docs/05 §3 */}
      <Section spacing="hero">
        <p className="text-label text-brand-500 uppercase">About</p>
        <h1 className="mt-4 max-w-4xl font-display text-display-2 font-bold text-brand-900">
          We&rsquo;re building a storage brand the way we&rsquo;d want one
          built.
        </h1>
        <p className="mt-6 max-w-[56ch] text-body-lg text-fg-muted">
          NUCLIEX INFOSYS started as an IT services business — fixing
          machines, deploying Windows, running office networks, and replacing a
          lot of failed drives. That last part is why we started making our own.
        </p>
      </Section>

      <Section tone="subtle">
        <Reveal>
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              {/* {{TBD:founder_photo}} — honest placeholder until a real photo exists */}
              <ProductFrame
                ratio="1/1"
                label={`${company.founder} — photo pending`}
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="text-label text-fg-subtle uppercase">Founder</p>
              <h2 className="mt-2 font-display text-h2 font-medium text-brand-900">
                {company.founder}
              </h2>
              <p className="mt-4 max-w-[60ch] text-body text-fg-muted">
                Ramjit&rsquo;s background spans computer hardware, software,
                networking, IT infrastructure, and artificial intelligence.
                NUCLIEX is what that experience looks like turned into a product
                company: engineering-led, allergic to unverifiable claims, and
                built on the support work that came first.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="Today"
            title="What we do now, honestly stated"
            lead="Based in Mira Road, Thane. Serving customers across Maharashtra."
          />
          <div className="grid gap-10 md:grid-cols-2">
            <div className="border-t border-border pt-6">
              <h3 className="text-h3 font-semibold">IT services, every day</h3>
              <p className="mt-3 max-w-[60ch] text-body text-fg-muted">
                Upgrades, repair, Windows deployment, data migration,
                networking, CCTV, and maintenance contracts — the revenue that
                funds the product ambition, and the field experience that shapes
                it.
              </p>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="text-h3 font-semibold">Storage, in validation</h3>
              <p className="mt-3 max-w-[60ch] text-body text-fg-muted">
                SATA and NVMe SSDs under the NUCLIEX name, published with full
                specifications and the conditions they were measured under —
                when they&rsquo;re verified, not before.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="How we decide"
            title="The rules we build by"
          />
          <TrustPoints
            points={[
              {
                title: "Facts before adjectives.",
                body: "A specification with its test conditions beats any superlative. If a number isn't verified, it isn't printed.",
              },
              {
                title: "The warranty is the product.",
                body: "A storage brand is a promise about the future. The term, the coverage, and the process are stated in plain language.",
              },
              {
                title: "Support is not a department.",
                body: "The people who sell the drives answer for them afterwards — that's how the services business always worked.",
              },
              {
                title: "Ship when it's ready.",
                body: "Roadmap items stay on the roadmap page. Nothing is sold before it exists.",
              },
            ]}
          />
        </Reveal>
      </Section>

      <Section tone="navy">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-h2 font-medium text-fg-inverse">
                Based in {company.city}. Built for longer than that.
              </h2>
              <p className="mt-3 max-w-[56ch] text-body-lg text-fg-inverse-muted">
                Talk to us about products, services, or partnerships.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Button href="/contact" variant="onDark" size="lg">
                Talk to us
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
