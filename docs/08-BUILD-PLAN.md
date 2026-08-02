# 08 — Build Plan

Work through these phases in order. Do not start a phase until the previous one passes its
acceptance criteria. Each phase is one branch and ends with `lint && typecheck && build` green.

---

## Phase 0 — Foundation
- [ ] `npx create-next-app@latest` — TypeScript, App Router, Tailwind, ESLint, `src/` dir, Turbopack
- [ ] Pin Next `16.2.x`, React `19.x`, Tailwind `4.3.x`. Node `>=20` in `engines`
- [ ] `tsconfig` strict mode; path alias `@/*`
- [ ] Prettier + `prettier-plugin-tailwindcss`; ESLint with `jsx-a11y`
- [ ] Add scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `format`
- [ ] `.env.example`, `src/lib/env.ts` with zod validation
- [ ] Security headers in `next.config.ts`
- [ ] Folder skeleton per `CLAUDE.md §5`

**Done when:** clean build, zero lint warnings, `npm run typecheck` passes.

---

## Phase 1 — Design tokens & type
- [ ] `globals.css` with the full `@theme` block from `02-DESIGN-SYSTEM.md §2` and `§3`
- [ ] Fonts via `next/font/google`: Space Grotesk (500,700), Inter (400,500,600), JetBrains Mono (400,500)
- [ ] Fluid type scale as `@theme` `--text-*` tokens
- [ ] Global focus-visible style
- [ ] `tnum` feature settings on mono contexts
- [ ] A throwaway `/styleguide` route rendering every token, type size, colour swatch with its
      contrast ratio, spacing step, radius, and shadow. **Delete before launch.**

**Done when:** `/styleguide` renders correctly and no component anywhere uses a raw hex or px value.

---

## Phase 2 — Layout primitives & UI kit
- [ ] `Container`, `Section`, `SectionHeader`
- [ ] `Button` (all 4 variants × 3 sizes, all states), `Badge`, `Card` family
- [ ] Form primitives: `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `FileInput`, `FieldError`
- [ ] Radix-backed `Accordion`, `Dialog`, `Tabs`
- [ ] `Reveal` motion wrapper with the reduced-motion guard
- [ ] Add every primitive to `/styleguide` in all states, including focus and disabled

**Done when:** every primitive is keyboard operable and passes the checklist in `06-COMPONENTS.md §7`.

---

## Phase 3 — Shell
- [ ] `src/data/nav.ts` and `src/data/company.ts`
- [ ] `Header` with mega-panel dropdowns, sticky behaviour, scroll hairline
- [ ] `MobileNav` sheet with focus trap and scroll lock
- [ ] Skip link
- [ ] `Footer` with real NAP block
- [ ] Root `layout.tsx`: metadata defaults, fonts, `lang="en-IN"`, `Organization` + `LocalBusiness` JSON-LD
- [ ] `not-found.tsx`, `error.tsx`, `loading.tsx`

**Done when:** navigation is fully keyboard operable, `Esc` closes panels and restores focus, and the
mobile sheet works at 390px.

---

## Phase 4 — The signature
- [ ] `SpecRail` — all tones, 4-up and 2×2, footnote support
- [ ] `SpecTable` — grouped, semantic, tabular figures
- [ ] `ProductFrame` — image and placeholder modes, node motif at 4%
- [ ] `ProcessSteps`, `TrustPoints`

**Done when:** `SpecRail` looks deliberate at 390px, 768px, and 1440px, and the mono figures align
in a column when values differ in digit count.

---

## Phase 5 — Homepage
- [ ] All nine sections from `04-SITEMAP-AND-PAGES.md §2`, using approved copy from `05-CONTENT.md §3`
- [ ] Hero load sequence (staged, once, reduced-motion safe)
- [ ] Section entry reveals via `Reveal`
- [ ] `opengraph-image.tsx`

**Done when:** Lighthouse mobile ≥ 95/100/95/100 on the preview deploy, and the self-critique gate
in `CLAUDE.md §7` passes — no section could be dropped onto a generic B2B site unchanged.

---

## Phase 6 — Products
- [ ] `src/data/products.ts` with the real product set (use `{{TBD}}` for unknown specs)
- [ ] `/products` index with URL-synced filters and a real empty state
- [ ] `/products/ssd/sata`, `/products/ssd/nvme`
- [ ] `/products/[slug]` full detail page with `generateStaticParams` and `generateMetadata`
- [ ] `/products/roadmap` with mandatory `planned` badges
- [ ] `Product` + `BreadcrumbList` JSON-LD

**Done when:** no invented specification exists anywhere, and every non-shipping product carries a
visible status badge.

---

## Phase 7 — Services, Business, Partners
- [ ] `src/data/services.ts`
- [ ] `/services` overview + `/services/[slug]`
- [ ] `/business` + `/business/quote`
- [ ] `/partners` + `/partners/apply`
- [ ] `Service` JSON-LD

---

## Phase 8 — Support & forms
- [ ] `/support` hub
- [ ] `/support/warranty` — policy + registration form + file upload
- [ ] `/support/rma` — numbered process with timelines
- [ ] `/support/downloads` — filterable table
- [ ] `/support/faq` + `FAQPage` JSON-LD
- [ ] All four Server Actions with zod schemas, India-aware validation, honeypot, rate limiting
- [ ] Resend integration: internal notification + user acknowledgement
- [ ] Success states that replace the form

**Done when:** every form submits with JavaScript disabled, every error is announced to a screen
reader, and a test submission arrives in the correct mailbox with the correct acknowledgement.

---

## Phase 9 — About, Contact, Blog, Legal
- [ ] `/about` with founder section
- [ ] `/contact` with facade-loaded map
- [ ] MDX pipeline, `/blog`, `/blog/[slug]`, `Toc`, `Article` JSON-LD
- [ ] The three seed articles from `04-SITEMAP-AND-PAGES.md §10`
- [ ] `/privacy`, `/terms`, `/warranty-policy` (structure only; legal text `{{TBD}}`)

---

## Phase 10 — Launch readiness
- [ ] `sitemap.ts`, `robots.ts`
- [ ] Search the repo for `{{TBD` — resolve or escalate every hit
- [ ] Delete `/styleguide`
- [ ] Run the full pre-launch verification list in `07-SEO-PERF-A11Y.md §5`
- [ ] Bundle audit against the budget
- [ ] 404/500 pages verified in production mode
- [ ] Analytics + Speed Insights wired
- [ ] Google Search Console + Business Profile, NAP matched exactly
- [ ] Domain, SSL, `www` → apex redirect, security headers verified with an external scanner

---

## Definition of done, for any task
1. It matches the spec in `/docs`.
2. It uses tokens only — no hardcoded values.
3. It passes the component checklist and the page accessibility checklist.
4. It works at 390px, 768px, 1440px.
5. `lint`, `typecheck`, and `build` are clean.
6. It contains no fabricated facts.
