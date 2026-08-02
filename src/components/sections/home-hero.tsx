import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ProductFrame } from "@/components/product/product-frame";

/**
 * Two-column 7/5 split, left-aligned — deliberately not a centred stack
 * (docs/02 §1). Copy verbatim from docs/05 §3. The staged load sequence is
 * CSS-only (animate-hero-rise + delays), fires once, and collapses to a
 * static render under prefers-reduced-motion.
 */
const stagger = (step: number) => ({ animationDelay: `${step * 60}ms` });

export function HomeHero() {
  return (
    <div className="py-20 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p
              className="text-label text-brand-500 animate-hero-rise uppercase motion-reduce:animate-none"
              style={stagger(0)}
            >
              Indian storage &amp; IT infrastructure
            </p>
            <h1
              className="text-display-1 font-display text-brand-900 animate-hero-rise mt-4 font-bold motion-reduce:animate-none"
              style={stagger(1)}
            >
              Storage you can stop thinking about.
            </h1>
            <p
              className="text-body-lg text-fg-muted animate-hero-rise mt-6 max-w-[56ch] motion-reduce:animate-none"
              style={stagger(2)}
            >
              NUCLIEX builds SATA and NVMe SSDs for people who need their data to
              just be there — backed by a clear warranty and support you can
              actually reach.
            </p>
            <div
              className="animate-hero-rise mt-8 flex flex-wrap gap-4 motion-reduce:animate-none"
              style={stagger(3)}
            >
              <Button href="/products" size="lg">
                Explore SSDs
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Talk to us
              </Button>
            </div>
          </div>
          <div
            className="animate-hero-rise lg:col-span-5 motion-reduce:animate-none"
            style={stagger(4)}
          >
            <ProductFrame ratio="4/3" label="NUCLIEX SSD — photography pending" priority />
          </div>
        </div>
      </Container>
    </div>
  );
}
