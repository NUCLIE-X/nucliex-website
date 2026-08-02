/**
 * Blog post registry — the single source the blog index, homepage section,
 * and sitemap read. MDX bodies live in src/content/. Seed articles land in
 * Phase 9; the homepage blog section renders nothing below three posts
 * (docs/04 §2.8 — an empty blog is worse than no blog).
 */

export interface Post {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-08-02". Rendered as DD Month YYYY. */
  date: string;
  readingMinutes: number;
  category: "SSD & storage explainers" | "Buying guides" | "IT how-tos" | "Company updates";
}

export const posts: Post[] = [];

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
