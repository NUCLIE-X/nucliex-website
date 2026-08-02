# 07 — SEO, Performance & Accessibility

---

## 1. SEO

### Metadata

Use the Next.js Metadata API. Root `layout.tsx` sets `metadataBase`, `title.template`
(`"%s — NUCLIEX"`), default OpenGraph and Twitter card, `robots`, and `alternates.canonical`.
Every route overrides `title` and `description` from the table in `05-CONTENT.md`. No page ships
with an inherited generic description.

### Structured data (JSON-LD)

| Schema                           | Where                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Organization` + `LocalBusiness` | Root layout — name, legal name, logo, address, contact points, sameAs                                |
| `WebSite` + `SearchAction`       | Root layout                                                                                          |
| `Product`                        | Product detail (no `Offer` until pricing is confirmed — a fake price is a Merchant policy violation) |
| `BreadcrumbList`                 | Every nested page                                                                                    |
| `FAQPage`                        | FAQ page and product FAQ blocks                                                                      |
| `Article`                        | Blog posts                                                                                           |
| `Service`                        | Service detail pages                                                                                 |

### Local SEO (this matters more than the client expects)

NUCLIEX is a Pune business selling nationally. Both need to work:

- Consistent NAP (name, address, phone) in the footer and in `LocalBusiness` JSON-LD — must match
  the Google Business Profile character for character.
- `areaServed` covering Pune, Maharashtra, and India.
- A genuinely useful services page targeting local intent ("SSD upgrade Pune", "office IT support Pune")
  without keyword stuffing — write for the reader, mark up for the crawler.

### Technical

- `sitemap.ts` generating all static + dynamic routes with `lastModified`.
- `robots.ts` allowing everything except `/api`.
- One canonical per page; no duplicate content across `/products/ssd/sata` and `/products?family=sata`
  — the filtered index gets `noindex` on filtered states.
- Semantic HTML: one `<h1>`, no skipped heading levels, `<nav>`/`<main>/<footer>` landmarks.
- Descriptive, keyword-relevant `alt` text on product images.
- Internal linking: every product links to warranty and support; every blog post links to a relevant product.
- OG images: `opengraph-image.tsx` per route group, 1200×630, navy background, reversed logo, page
  title in the display face. Generated at build, not hand-designed per page.

---

## 2. Performance budget

| Metric                          | Target                                                     |
| ------------------------------- | ---------------------------------------------------------- |
| Lighthouse Performance (mobile) | ≥ 95                                                       |
| LCP                             | < 2.0s                                                     |
| CLS                             | < 0.05                                                     |
| INP                             | < 200ms                                                    |
| First-load JS per route         | ≤ 120 kB gzipped                                           |
| Total page weight (homepage)    | ≤ 600 kB                                                   |
| Fonts                           | ≤ 3 families, 7 weights total, self-hosted via `next/font` |

### Rules

- Static generation by default. No unnecessary `"use client"` — audit the client boundary each phase.
- `next/image` everywhere. AVIF + WebP. `priority` on the hero image **only**. Explicit `sizes`.
- No layout shift: every image and embed has reserved dimensions; fonts use `size-adjust` fallback
  metrics via `next/font`.
- Third-party scripts: none by default. Map embeds load on interaction (facade pattern), not on page load.
- Route-level code splitting; `dynamic()` for anything below the fold that carries real JS
  (the map, the downloads table filter).
- Check the bundle after each phase: `npx @next/bundle-analyzer` or `next build` output. If a route
  crosses the budget, find out why before continuing.

---

## 3. Accessibility target

**WCAG 2.1 Level AA. Lighthouse Accessibility = 100 is the floor, not the goal** — automated tools
catch about a third of real issues.

## 4. Per-page accessibility checklist

Run this on every page before marking it done:

- [ ] Tab through the entire page using only the keyboard. Every interactive element is reachable,
      the focus indicator is always visible, and the order matches the visual order.
- [ ] `Skip to content` link is the first focusable element and actually moves focus.
- [ ] All text meets 4.5:1 (3:1 for large text). **Cyan is never text on a light background.**
- [ ] Every form control has a visible, programmatically associated `<label>`.
- [ ] Error messages are announced (`role="alert"` or `aria-live="polite"`), linked via
      `aria-describedby`, and describe how to fix the problem.
- [ ] Images have meaningful `alt`; decorative images have `alt=""`.
- [ ] Headings form a logical outline with no skipped levels; exactly one `<h1>`.
- [ ] Dialogs and menus trap focus, close on `Esc`, and return focus to the trigger.
- [ ] Page is usable at 200% browser zoom and at 320px width with no horizontal scroll.
- [ ] All motion respects `prefers-reduced-motion`.
- [ ] Colour is never the sole carrier of meaning (stock status shows text as well as a dot).
- [ ] Tables use `<th>` with `scope`, and a caption.
- [ ] Link text makes sense out of context — no bare "read more".
- [ ] Tap targets ≥ 44×44px on mobile.
- [ ] `lang="en-IN"` on `<html>`.

## 5. Pre-launch verification

1. Lighthouse mobile + desktop on every top-level route, on the deployed preview (not localhost).
2. Keyboard-only pass on home, a product page, and every form.
3. Screen reader spot-check (VoiceOver or NVDA) on home, product detail, and the contact form.
4. Real-device check: one low-end Android on 4G. India's median device is not an iPhone.
5. Validate all JSON-LD in the Rich Results Test.
6. Confirm every form actually delivers email to the right mailbox, including the acknowledgement.
7. Search the codebase for `{{TBD` — none may remain in shipped copy.
