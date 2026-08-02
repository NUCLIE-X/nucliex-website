import { Container } from "@/components/layout/container";

// Skeletons matching the general page shape — never a spinner (docs/04 §12).
export default function Loading() {
  return (
    <Container className="py-16 md:py-20 lg:py-24" aria-hidden="true">
      <div className="max-w-2xl space-y-4">
        <div className="h-4 w-40 animate-pulse rounded-sm bg-surface-subtle motion-reduce:animate-none" />
        <div className="h-12 w-full animate-pulse rounded-sm bg-surface-subtle motion-reduce:animate-none" />
        <div className="h-6 w-3/4 animate-pulse rounded-sm bg-surface-subtle motion-reduce:animate-none" />
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-lg bg-surface-subtle motion-reduce:animate-none"
          />
        ))}
      </div>
    </Container>
  );
}
