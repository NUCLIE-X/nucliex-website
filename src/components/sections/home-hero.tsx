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
              className="animate-hero-rise text-label text-brand-500 uppercase motion-reduce:animate-none"
              style={stagger(0)}
            >
              Indian storage &amp; IT infrastructure
            </p>
            <h1
              className="mt-4 animate-hero-rise font-display text-display-1 font-bold text-brand-900 motion-reduce:animate-none"
              style={stagger(1)}
            >
              Storage you can stop thinking about.
            </h1>
            <p
              className="mt-6 max-w-[56ch] animate-hero-rise text-body-lg text-fg-muted motion-reduce:animate-none"
              style={stagger(2)}
            >
              NUCLIEX builds SATA and NVMe SSDs for people who need their data
              to just be there — backed by a clear warranty and support you can
              actually reach.
            </p>
            <div
              className="mt-8 flex animate-hero-rise flex-wrap gap-4 motion-reduce:animate-none"
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
            className="animate-hero-rise motion-reduce:animate-none lg:col-span-5"
            style={stagger(4)}
          >
            <ProductFrame
              ratio="4/3"
              src="/products/green-ssd-256gb.jpg"
              alt="NUCLIEX GREEN Series SSD 256 GB retail box, front view"
              priority
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
