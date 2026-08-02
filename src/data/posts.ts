/**
 * Blog post registry — the single source the blog index, homepage section,
 * article routes, and sitemap read. MDX bodies live in src/content/<slug>.mdx.
 * Toc ids must match rehype-slug output for the article's h2 headings.
 */

export interface Post {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-08-02". Rendered as DD Month YYYY. */
  date: string;
  readingMinutes: number;
  category: "SSD & storage explainers" | "Buying guides" | "IT how-tos" | "Company updates";
  toc: { id: string; title: string }[];
}

export const posts: Post[] = [
  {
    slug: "sata-vs-nvme-which-ssd-to-buy",
    title: "SATA vs NVMe: which SSD should you actually buy?",
    description:
      "The honest version of the SATA vs NVMe decision: what the interfaces are, what the numbers mean in real use, and a checklist for choosing.",
    date: "2026-07-20",
    readingMinutes: 6,
    category: "Buying guides",
    toc: [
      { id: "the-short-answer", title: "The short answer" },
      { id: "what-sata-and-nvme-actually-mean", title: "What SATA and NVMe actually mean" },
      { id: "the-numbers-honestly-framed", title: "The numbers, honestly framed" },
      { id: "when-sata-is-the-right-call", title: "When SATA is the right call" },
      { id: "when-nvme-is-worth-it", title: "When NVMe is worth it" },
      { id: "the-checklist", title: "The checklist" },
    ],
  },
  {
    slug: "laptop-ssd-upgrade-without-reinstalling-windows",
    title: "How to upgrade a laptop to an SSD without reinstalling Windows",
    description:
      "Clone, swap, boot: the four-step process our technicians use for laptop SSD upgrades, including the checks that prevent a bad afternoon.",
    date: "2026-07-27",
    readingMinutes: 7,
    category: "IT how-tos",
    toc: [
      { id: "before-you-start", title: "Before you start" },
      { id: "step-1-check-what-your-laptop-can-take", title: "Step 1: check what your laptop can take" },
      { id: "step-2-clone-the-old-drive", title: "Step 2: clone the old drive" },
      { id: "step-3-swap-the-drives", title: "Step 3: swap the drives" },
      { id: "step-4-first-boot-and-checks", title: "Step 4: first boot and checks" },
      { id: "what-can-go-wrong", title: "What can go wrong" },
    ],
  },
  {
    slug: "tbw-mtbf-ssd-lifespan",
    title: "What TBW and MTBF actually tell you about an SSD's lifespan",
    description:
      "TBW is a fuel tank, MTBF is a population statistic, and neither is a countdown timer. How to read endurance ratings like an engineer.",
    date: "2026-08-01",
    readingMinutes: 6,
    category: "SSD & storage explainers",
    toc: [
      { id: "why-these-two-numbers-exist", title: "Why these two numbers exist" },
      { id: "tbw-the-fuel-tank", title: "TBW: the fuel tank" },
      { id: "mtbf-the-statistic-everyone-misreads", title: "MTBF: the statistic everyone misreads" },
      { id: "dwpd-the-same-idea-in-different-units", title: "DWPD: the same idea in different units" },
      { id: "how-to-actually-use-these-numbers", title: "How to actually use these numbers" },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
