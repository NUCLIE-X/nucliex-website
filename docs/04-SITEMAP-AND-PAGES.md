# 04 — Sitemap & Page Specifications

---

## 1. Sitemap

```
/                             Home
/products                     All products
  /products/ssd/sata          SATA SSDs
  /products/ssd/nvme          NVMe SSDs
  /products/[slug]            Product detail
  /products/roadmap           Coming soon (memory, external, enterprise)
/services                     IT services overview
  /services/[slug]            Service detail
/business                     For business & enterprise
  /business/quote             Bulk / business quote request
/partners                     Dealers & distributors
  /partners/apply             Dealer application
/support                      Support hub
  /support/warranty           Warranty registration + policy
  /support/rma                RMA / replacement process
  /support/downloads          Datasheets, guides, drivers
  /support/faq                FAQ
/about                        About NUCLIEX INFOSYS
/blog                         Technical resources
  /blog/[slug]                Article
/contact                      Contact
/privacy  /terms  /warranty-policy       Legal
```

### Header navigation
`Products ▾` · `Services ▾` · `Business` · `Support ▾` · `About` — with **`Request a quote`** as the
primary CTA on the right, and a `Contact` ghost link beside it.

- Dropdowns are **mega-panels**, not thin lists: two columns (product families / featured), each item
  a title + one-line descriptor. Opens on click and on keyboard, closes on `Esc`, focus trapped while
  open, `aria-expanded` wired.
- Header is sticky, 72px tall, `bg-surface/85` + `backdrop-blur` with a bottom hairline that only
  appears after 8px of scroll. This is the **only** permitted glassmorphism on the site.
- Mobile: full-height sheet, accordion sections, CTA pinned at the bottom.

### Footer
Five columns — Products · Services · Support · Company · Contact — over a bottom bar with the
reversed logo, "NUCLIEX INFOSYS · Driven by Expertise", ©, GSTIN/CIN `{{TBD}}`, legal links.
Background `surface-navy`. Include the full postal address and a `tel:` and `mailto:` link — a real
address in the footer is a trust signal, not boilerplate.

---

## 2. Home — `/`

The homepage answers, in order: *what is this, is it any good, can I trust it, what do I do next.*

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (sticky)                                             │
├─────────────────────────────────────────────────────────────┤
│  7 cols                          │  5 cols                  │
│  ▸ eyebrow: INDIAN STORAGE …     │  ┌────────────────────┐  │
│  H1 Storage you can              │  │                    │  │
│     stop thinking about.         │  │   ProductFrame     │  │
│  lead paragraph (56ch)           │  │                    │  │
│  [Explore SSDs] [Talk to us]     │  └────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ ██ SPEC RAIL — full bleed, navy ██  ← the signature         │
│  4 tabular figures + uppercase labels                       │
├─────────────────────────────────────────────────────────────┤
│ 03 Product families      (2 or 3 cards, honest about count) │
├─────────────────────────────────────────────────────────────┤
│ 04 Why NUCLIEX — 4 trust points, hairline-separated         │
├─────────────────────────────────────────────────────────────┤
│ 05 IT services strip — services are today's revenue          │
├─────────────────────────────────────────────────────────────┤
│ 06 Built for — consumer / professional / business           │
├─────────────────────────────────────────────────────────────┤
│ ██ 07 Warranty & support (dark) ██                          │
├─────────────────────────────────────────────────────────────┤
│ 08 From the blog (3 latest) — omit entirely if < 3 posts    │
├─────────────────────────────────────────────────────────────┤
│ 09 CTA band                                                 │
├─────────────────────────────────────────────────────────────┤
│ FOOTER (navy)                                               │
└─────────────────────────────────────────────────────────────┘
```

### Section notes
1. **Hero.** Left-aligned two-column split, not centred. Eyebrow in `label` style. H1 in `display-1`.
   Lead in `body-lg fg-muted`, max 56ch. Two CTAs: primary `Explore SSDs` → `/products`, secondary
   `Talk to us` → `/contact`. Right column is a `ProductFrame` until real photography exists.
   No gradient mesh, no floating cards, no background video.
2. **Spec rail.** Four figures. On the homepage these are *company* figures, not product figures —
   e.g. warranty years, RMA response time, service coverage, years in operation. **Only real numbers.**
   Full-bleed navy band, `data-lg` mono figures, `label` captions, hairline dividers between columns
   on desktop, 2×2 on mobile.
3. **Product families.** One card per family that actually has a product. Do not pad to three.
   Card = ProductFrame + name + one-line descriptor + capacity range + `View specifications`.
4. **Why NUCLIEX.** Four points, each a short heading + two lines. Separated by hairlines, not boxed
   in cards — this is the anti-template move. Content: engineering and validation, transparent
   warranty, support you can reach, honest specifications.
5. **Services strip.** `surface-subtle` background. 6 service chips + `View all services`.
   Copy makes clear these are live, deliverable services.
6. **Built for.** Three columns: Consumer / Professional / Business, each with three use cases and
   a link into the relevant page. Business links to `/business`.
7. **Warranty & support.** Dark section. States the warranty term, RMA turnaround, and support
   channels as fact. Two CTAs: `Register your warranty`, `Start an RMA`.
8. **Blog.** Three cards. **If fewer than three published posts exist, remove the section.** An empty
   blog is worse than no blog.
9. **CTA band.** One line + `Request a quote` + phone number as a `tel:` link.

---

## 3. Products index — `/products`

- H1 + one-paragraph intro.
- Filter row: family, capacity, form factor. Client-side, URL-synced via `searchParams` so filtered
  views are linkable. Filters render as a `<fieldset>` of real checkboxes/radios, styled — not divs.
- Grid `1 / 2 / 3` columns. Each card shows status badge (`Available` / `Coming soon`), capacities,
  interface, and two headline figures.
- Empty state: "No products match these filters." + `Clear filters`.
- Below the grid: a "Roadmap" band linking to `/products/roadmap`, clearly separated so future
  products never read as current.

## 4. Product detail — `/products/[slug]`

```
Breadcrumb
┌──────────────────────────┬──────────────────────────────────┐
│  Gallery / ProductFrame  │  eyebrow: SATA SSD               │
│                          │  H1  NX-500                      │
│                          │  tagline                          │
│                          │  capacity selector (chips)        │
│                          │  [Request a quote] [Datasheet]    │
│                          │  warranty + availability line     │
└──────────────────────────┴──────────────────────────────────┘
██ SPEC RAIL — 4 product figures ██
Overview  (2–3 short paragraphs, 68ch)
Specifications  (grouped table, mono values, tabular figures)
What it's for   (use cases, 3 up)
Compatibility   (plain list — what it fits)
Warranty & support  (term, what's covered, RMA link)
Documents       (datasheet, install guide, warranty card)
FAQ             (accordion, product-specific)
Related products
CTA band
```

- Capacity selector changes displayed specs where they differ by capacity. It does **not** add to a
  cart in v1.
- Spec table: two columns, hairline row separators, group headings in `label` style, values in
  `font-mono` with `tnum`. Footnotes for measured conditions sit below the table in `body-sm`.
- `Product` + `BreadcrumbList` JSON-LD. No `Offer`/price until pricing is confirmed.

## 5. Services — `/services` and `/services/[slug]`

Overview: services grouped by category (hardware, network, software, support, consulting), each a
row with icon, name, one-line summary, turnaround, and a link. Plus a "How we work" numbered
sequence (this is a real sequence, so numbering is earned) and an AMC callout.

Detail page: what it is → what you get (deliverables list) → process (numbered) → turnaround →
who it's for → FAQ → enquiry CTA pre-filled with the service name.

## 6. Business — `/business`

For IT companies, system integrators, retailers, schools, government, SMBs.
Sections: headline value → what business buyers get (bulk pricing, GST invoicing, consistent supply,
dedicated contact, extended support) → sectors served → procurement process (numbered) →
`/business/quote` form. Government/education buyers need documentation and compliance language —
give that its own paragraph.

## 7. Partners — `/partners`

Why partner with NUCLIEX (margins, support, marketing assistance, territory clarity) → who we're
looking for → what we provide → application process → `/partners/apply` form.

## 8. Support hub — `/support`

Four entry cards: Warranty registration · RMA / replacement · Downloads · FAQ.
Plus contact channels with stated response times, and a serial-number lookup field.
This page is a trust asset — it gets the same design care as the homepage, not less.

- `/support/warranty` — policy stated plainly (term, what's covered, what voids it) + registration form.
- `/support/rma` — numbered process with expected timelines at each step, plus what the customer
  needs to have ready. Honesty here converts more than any hero.
- `/support/downloads` — filterable table by product and document type. Each row: title, product,
  version, date, size, format, download link.
- `/support/faq` — accordion, grouped. `FAQPage` JSON-LD.

## 9. About — `/about`

Story → founder (named, with a real photo when available; a `ProductFrame`-style placeholder until
then) → what we do today (honest: IT services + storage) → where we're going → values (as a
hairline-separated list, not six identical icon cards) → location and contact.

Do not inflate. "Founded in Pune. Currently serving customers across Maharashtra." is more credible
than "a leading pan-India technology brand."

## 10. Blog — `/blog`, `/blog/[slug]`

MDX. Categories: SSD & storage explainers · buying guides · IT how-tos · company updates.
Article page: title, date, reading time, author, 68ch measure, auto-generated table of contents on
desktop (sticky, `lg+` only), prev/next, related posts, `Article` JSON-LD.

**Seed content (write these three — they are the SEO entry points):**
1. "SATA vs NVMe: which SSD should you actually buy?"
2. "How to upgrade a laptop to an SSD without reinstalling Windows"
3. "What TBW and MTBF actually tell you about an SSD's lifespan"

## 11. Contact — `/contact`

Two columns: form (left, 7 cols) and contact details (right, 5 cols — address, phone, email, hours,
map embed loaded only on interaction so it doesn't cost LCP). Enquiry-type selector routes the
notification to the right mailbox.

---

## 12. Global states to build
`not-found.tsx` — states what happened, offers products/support/home links.
`error.tsx` — plain recovery, `Try again` + support link. No stack traces in production.
`loading.tsx` — skeletons matching the real layout, never a spinner.
Form pending states — button label changes to "Sending…", button disabled, `aria-busy`.
