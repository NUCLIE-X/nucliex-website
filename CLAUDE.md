# CLAUDE.md — NUCLIEX Website

> This file is the operating manual for this repository. Read it fully before writing code.
> When this file conflicts with anything else, **this file wins**. When a detail is missing here,
> look in `/docs`. When it's missing there too, ask — do not invent brand facts.

---

## 0. Local machine constraint (this Windows box only)

Smart App Control blocks the native SWC binary (`@next/swc-win32-x64-msvc`), so Turbopack cannot
run here — Next falls back to WASM SWC, which only supports webpack. `npm run dev` and
`npm run build` therefore use the `--webpack` flag. Do not remove it while developing on this
machine; the SAC warning line in build output is expected noise. Vercel builds are unaffected.

---

## 1. What we are building

The public website for **NUCLIEX INFOSYS**, an Indian technology company (Pune, Maharashtra) that
sells SSD/NVMe storage and computer hardware, and provides professional IT services, networking,
and system integration.

**The site has one job:** make a first-time visitor believe NUCLIEX is a real engineering company
whose products they can trust with their data — at the same credibility level as Crucial, Kingston,
or WD — and then convert that belief into an enquiry, a dealer application, or a warranty registration.

**Success = a stranger cannot tell this is a young company.**

### Primary conversion goals, in priority order
1. Business / bulk enquiry (highest commercial value)
2. Dealer & distributor application
3. IT services enquiry (AMC, office IT, repair)
4. Warranty registration (retention, not acquisition)
5. Support / downloads (retention)

### Audiences
- **Consumer:** PC builders, gamers, students, content creators — want specs, price-to-performance, warranty clarity.
- **Professional:** developers, designers, engineers, workstation users — want endurance numbers and sustained performance.
- **Business:** IT companies, system integrators, retailers, schools, government, SMBs — want supply reliability, GST invoicing, RMA process, and a human to talk to.

---

## 2. Non-negotiables

These are hard rules. Violating any of them is a bug, not a style preference.

1. **No invented specifications.** Never write a read/write speed, TBW, MTBF, warranty period,
   certification, client name, award, or statistic that is not in `/docs/05-CONTENT.md`.
   If a number is needed and unknown, use the placeholder token `{{TBD:label}}` and add it to
   `/docs/09-OPEN-QUESTIONS.md`. A fabricated spec on a storage brand's site is a trust-destroying
   defect and, in India, a Legal Metrology/consumer-law exposure.
2. **No stock-photo filler and no AI-generated "product" imagery of NUCLIEX hardware.** Use the
   placeholder system in `/docs/02-DESIGN-SYSTEM.md §9`. A clean empty frame beats a fake product shot.
3. **No customer testimonials, logos, or counts until real ones exist.** No "Trusted by 500+ businesses."
4. **Accessibility floor is not optional:** WCAG 2.1 AA contrast, visible keyboard focus on every
   interactive element, `prefers-reduced-motion` respected, semantic landmarks, real `<label>`s.
5. **Performance budget is enforced:** see §7. A storage brand with a slow site is self-refuting.
6. **Mobile-first.** India is a mobile-majority market. Design and test 390px before 1440px.
7. **No cookie-consent-triggering third-party scripts** without adding the consent banner first.
8. **Never commit secrets.** All keys via `.env.local`; `.env.example` stays in sync.

---

## 3. Brand resolution (decisions already made — do not relitigate)

Two conflicts existed between the logo and the brand brief. They are resolved as follows.

### 3.1 Name architecture
| Layer | Name | Used for |
|---|---|---|
| Legal / corporate entity | **NUCLIEX INFOSYS** | Footer, legal pages, invoices, contact, About page, `<title>` suffix |
| Brand / product mark | **NUCLIEX** | Product names, hero copy, packaging, conversational reference |

- Corporate signature: **"Driven by Expertise"** — used with the full lockup (services, About, footer, corporate decks).
- Product/marketing line: **"Powering Reliable Technology"** — used on the homepage hero and product pages.
- Never render both taglines in the same viewport.
- Spelling is always all-caps `NUCLIEX` in the wordmark; in body copy write `NUCLIEX` (caps) — never "Nucliex" or "NuclieX".

### 3.2 Colour of the logo
The supplied logo artwork is `#7ACCC9` (soft teal). The brand system is deep blue `#0057B8` / navy `#0B1F3A` / cyan `#00C2FF`. Teal is **off-system** — it reads soft and pastel, which fights the "precision engineering" positioning.

**Decision:** the logo is reproduced in the brand system, not in teal.
- Primary lockup: **navy `#0B1F3A`** on light backgrounds.
- Reversed lockup: **white `#FFFFFF`** on navy/dark backgrounds.
- The node-network mark may use **`#0057B8`** when it appears alone (favicon, app icon, avatar).
- Teal `#7ACCC9` is **retired** from the web identity. Do not add it to the token set.

Pre-recoloured PNGs are in `/brand-assets`. **Before launch the logo must be redrawn as SVG** —
tracking a raster logo is a launch blocker (`/docs/09-OPEN-QUESTIONS.md`).

---

## 4. Stack

Verified current as of August 2026. Do not silently upgrade majors.

| Layer | Choice | Version | Why |
|---|---|---|---|
| Framework | Next.js (App Router) | `16.2.x` | Active LTS, Turbopack default, best-in-class SEO/SSG for a marketing + catalog site |
| Runtime | Node.js | `>=20` | Next 16 minimum |
| Language | TypeScript | `5.x`, `strict: true` | |
| UI | React | `19.x` | |
| Styling | Tailwind CSS | `4.3.x` | CSS-first config via `@theme`; no `tailwind.config.js` |
| Content | MDX (`@next/mdx`) + local TS data modules | — | No CMS in v1. Products/blog live in-repo, version-controlled |
| Forms | React Server Actions + `zod` | — | No client form library |
| Email | Resend | — | Enquiry/dealer/warranty notifications |
| Motion | `motion` (Framer Motion) | `12.x` | Used sparingly — see §6 |
| Icons | `lucide-react` | — | Matches the brief's "minimal line icons, rounded, consistent stroke" |
| Analytics | Vercel Analytics + Speed Insights | — | Cookieless, no consent banner needed |
| Deploy | Vercel | — | |

**Explicitly not used:** UI kits that impose their own look (MUI, Chakra, Bootstrap), a component
library we cannot restyle, `styled-components`, any CSS-in-JS runtime, jQuery, carousel libraries.

Headless UI primitives (Radix) are permitted **only** for dialog, dropdown, accordion, and tabs —
where accessibility is genuinely hard to get right by hand.

---

## 5. Repository layout

```
/
├── CLAUDE.md                     ← you are here
├── README.md
├── /docs                         ← the full spec; read the file you need before building
│   ├── 01-BRAND.md               brand facts, voice, copy rules
│   ├── 02-DESIGN-SYSTEM.md       tokens, type, spacing, motion, imagery
│   ├── 03-ARCHITECTURE.md        stack detail, data model, forms, env
│   ├── 04-SITEMAP-AND-PAGES.md   every route, section by section
│   ├── 05-CONTENT.md             approved copy + the facts you may state
│   ├── 06-COMPONENTS.md          component contracts
│   ├── 07-SEO-PERF-A11Y.md       metadata, schema, budgets, a11y checklist
│   ├── 08-BUILD-PLAN.md          phased task list — work through this in order
│   └── 09-OPEN-QUESTIONS.md      blockers awaiting the client
├── /brand-assets                 recoloured logo variants (raster, interim)
├── /public
│   ├── /brand                    logo SVGs (once produced), favicons, OG images
│   └── /products                 product photography
└── /src
    ├── /app                      App Router routes
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── (marketing)/          products, solutions, about, contact…
    │   ├── (support)/            support, downloads, warranty
    │   ├── blog/
    │   ├── api/
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   └── opengraph-image.tsx
    ├── /components
    │   ├── /ui                   primitives: Button, Input, Card, Badge…
    │   ├── /layout               Header, Footer, Nav, Container, Section
    │   ├── /sections             page-level composed blocks
    │   └── /product              SpecTable, SpecStrip, ProductCard…
    ├── /content                  MDX blog posts
    ├── /data                     products.ts, services.ts, faqs.ts, nav.ts
    ├── /lib                      utils, schemas, seo, mail
    └── /styles/globals.css       @theme token definitions
```

---

## 6. How to work in this repo

### Order of operations
Follow `/docs/08-BUILD-PLAN.md` phase by phase. Do not jump ahead to page building before the
token layer and primitives exist — every shortcut there produces inconsistent spacing that has to
be unpicked later.

### Before writing any component
1. Check `/docs/06-COMPONENTS.md` — it may already have a defined prop contract.
2. Check `/src/components/ui` — it may already exist.
3. Never hardcode a colour, font size, radius, or spacing value. **Every** value comes from a token.
   `text-[#0057B8]` and `p-[13px]` are review failures.

### Styling rules
- Tailwind utilities only, driven by `@theme` tokens in `globals.css`.
- No arbitrary values except for genuinely one-off geometry (e.g. `clip-path`), and comment why.
- Compose repeated utility strings into a component, not into an `@apply` soup.
- Section vertical rhythm comes from a single `<Section>` component. Never set section padding
  ad-hoc — this is the #1 source of CSS drift.

### Motion rules (the brief says minimal — hold that line)
Permitted: a single staged hero reveal on load; scroll-triggered fade+8px-rise for section entry,
once, never repeating; hover state transitions ≤200ms. Everything wrapped in a
`useReducedMotion()` guard.
Banned: parallax, auto-playing carousels, marquees, counters that animate on scroll, spinning
3D objects, particle backgrounds, cursor followers, page transition wipes.

### Copy rules
- Sentence case for headings and buttons. Not Title Case. Not ALL CAPS except in the eyebrow/label
  utility style and the wordmark.
- Buttons say what happens: "Request a quote", "Register warranty", "Download datasheet".
  Never "Submit", "Learn more", "Click here".
- The action keeps its name through the flow: a "Request a quote" button leads to a page titled
  "Request a quote" and confirms with "Quote request sent".
- No buzzword stacking. Banned in copy: "cutting-edge", "revolutionary", "game-changing",
  "world-class", "unleash", "empower", "seamless", "synergy", "next-generation" (unless literally
  describing PCIe generation), "state-of-the-art".
- Error messages state what happened and what to do. They do not apologise and are never vague.
- Empty states invite an action.

### Git
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `perf:`, `a11y:`.
- One phase from the build plan ≈ one branch. Small, reviewable commits.
- `main` is always deployable.

---

## 7. Quality gates

Run before considering any phase complete:

```bash
npm run lint          # eslint, zero warnings
npm run typecheck     # tsc --noEmit, zero errors
npm run build         # must succeed with no warnings
```

**Performance budget** (Lighthouse mobile, throttled, on the deployed preview):
- Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO = 100
- LCP < 2.0s · CLS < 0.05 · INP < 200ms
- First-load JS per route ≤ 120 kB gzipped
- Every image via `next/image` with explicit `width`/`height` or `fill` + `sizes`
- Fonts via `next/font` with `display: swap` and preload on the two used weights only

**Accessibility gate:** run the checklist in `/docs/07-SEO-PERF-A11Y.md §4` on every page before
marking it done. Tab through the whole page with the mouse untouched — if you get lost, it fails.

**Self-critique gate:** after each page, re-read `/docs/02-DESIGN-SYSTEM.md §1` and ask: does this
look like a template, or like NUCLIEX? If a section could be dropped onto any other tech site
unchanged, redesign it.

---

## 8. Commands

```bash
npm run dev           # localhost:3000
npm run build
npm run start
npm run lint
npm run typecheck
npm run format
```

---

## 9. Things Claude Code should ask about rather than guess

Never fabricate; add to `/docs/09-OPEN-QUESTIONS.md` and use a `{{TBD:…}}` token:

- Real product SKUs, capacities, speeds, TBW, warranty terms
- Company registration details, GSTIN, CIN, registered address, support phone/email
- Certifications (ISO, BIS, RoHS, CE), test-lab reports
- Pricing, MRP, dealer margins
- Team names/photos beyond the founder (Ramjit J. Mourya)
- Whether the site sells directly (cart/checkout) or routes to marketplaces — **v1 assumes no cart**
- Any customer, partner, or client name
