# 03 — Architecture

---

## 1. Rendering strategy

| Route type | Strategy | Reason |
|---|---|---|
| Marketing pages, product pages, services, about, legal | **Static (SSG)** | Content changes rarely; instant TTFB; perfect SEO |
| Blog (MDX) | **Static**, `generateStaticParams` | |
| Warranty lookup result | **Server Action**, dynamic | Needs a request |
| Form submissions | **Server Actions** | No client-side API keys, progressive enhancement |
| `/sitemap.xml`, `/robots.txt`, OG images | Route handlers / `opengraph-image.tsx` | Generated at build |

Default every route to static. Only opt into dynamic when a request-time input genuinely exists.
No `export const dynamic = "force-dynamic"` without a written reason in a comment.

---

## 2. Data model

No database in v1. Content lives in typed modules under `/src/data`, so it is version-controlled,
reviewable, and type-checked. Migrating to a CMS later means swapping the loader, not the components.

### `src/data/products.ts`

```ts
export type ProductStatus = "available" | "coming-soon" | "planned";
export type ProductFamily = "sata-ssd" | "nvme-ssd" | "memory" | "external" | "enterprise" | "accessory";

export interface SpecRow {
  label: string;          // "Sequential read"
  value: string;          // "550 MB/s"  — string, not number: units matter
  group: "performance" | "endurance" | "physical" | "compatibility" | "warranty";
  note?: string;          // measured-conditions footnote
}

export interface Product {
  slug: string;                 // "nx-500-sata-ssd"
  name: string;                 // "NX-500"
  family: ProductFamily;
  status: ProductStatus;
  tagline: string;              // one line, max 80 chars
  summary: string;              // 2–3 sentences
  capacities: string[];         // ["128 GB","256 GB","512 GB","1 TB"]
  formFactor: string;           // "2.5-inch SATA III" | "M.2 2280 PCIe Gen3 x4"
  interface: string;
  /** The four figures shown in the SpecRail. Exactly four. */
  highlights: { value: string; label: string }[];
  specs: SpecRow[];
  useCases: string[];           // "Laptop upgrade", "Office desktop fleet"
  warrantyYears: number | null; // null → renders {{TBD}}
  images: { src: string; alt: string }[];
  documents: { title: string; href: string; type: "datasheet" | "guide" | "warranty" }[];
  seo: { title: string; description: string };
}
```

**Every field must be real.** A product with unknown specs ships with `specs: []` and a
`{{TBD:specs}}` note rather than plausible-looking invented rows.

### `src/data/services.ts`

```ts
export interface Service {
  slug: string;
  name: string;                 // "SSD upgrade"
  category: "hardware" | "software" | "network" | "support" | "consulting";
  audience: ("consumer" | "business")[];
  summary: string;
  deliverables: string[];       // what the customer actually receives
  process?: { step: number; title: string; detail: string }[];  // numbered — order matters here
  turnaround?: string;          // "Same day for most laptops"
  icon: string;                 // lucide icon name
}
```

Also: `src/data/faqs.ts`, `src/data/nav.ts` (single source for header + footer + sitemap),
`src/data/company.ts` (address, phones, emails, hours, GSTIN, socials — one place, used by
footer, contact page, and JSON-LD).

---

## 3. Forms

Four forms, all Server Actions + `zod`, all sharing one `<Form>` primitive.

| Form | Route | Fields | Notify |
|---|---|---|---|
| General / sales enquiry | `/contact` | name, email, phone, city, enquiry type, message | sales@ |
| Business & bulk quote | `/business/quote` | company, GSTIN (optional), name, email, phone, products+quantities, timeline, message | sales@ |
| Dealer application | `/partners/apply` | business name, type, city/state, GSTIN, years in business, name, email, phone, product interest | partners@ |
| Warranty registration | `/support/warranty` | serial number, product, purchase date, invoice upload (optional), name, email, phone, seller | support@ |

### Shared requirements
- `zod` schema in `/src/lib/schemas/`, used by both the Server Action and (for hints) the client.
- **India-aware validation:** mobile `/^[6-9]\d{9}$/`, optional `+91` prefix stripped before validation;
  GSTIN `/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/`; PIN code `/^[1-9]\d{5}$/`.
- Honeypot field + timestamp check (reject < 2s submissions). Add Cloudflare Turnstile only if spam appears.
- Rate limit by IP: 5 submissions / 10 minutes.
- Email via Resend: one notification to the internal address, one plain acknowledgement to the user
  stating the expected response time.
- Every submission is also appended to a Google Sheet or logged — enquiries must never exist only
  inside an inbox. (Mechanism: `{{TBD}}` in open questions.)
- Success is a real state change, not a toast that disappears: replace the form with a confirmation
  block that restates what was sent and what happens next.
- Progressive enhancement: the form must submit without JS.

---

## 4. Environment

`.env.example` (committed, no values):
```
NEXT_PUBLIC_SITE_URL=https://nucliex.com
RESEND_API_KEY=
MAIL_TO_SALES=
MAIL_TO_SUPPORT=
MAIL_TO_PARTNERS=
MAIL_FROM=
```
Validate at boot with a `zod` schema in `src/lib/env.ts` so a missing key fails the build, not a
customer's form submission.

---

## 5. Security & headers

Set in `next.config.ts`:
- `Content-Security-Policy` — `default-src 'self'`; allow only the font and analytics origins actually used.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-Frame-Options: DENY`

Uploads (warranty invoices): max 5 MB, accept `image/jpeg,image/png,application/pdf` only, validate
the magic bytes server-side, never trust the extension, store outside the web root or in blob storage.

---

## 6. Legal pages required for an Indian commercial site
`/privacy` · `/terms` · `/warranty-policy` · `/return-refund-policy` (if any direct sale) ·
`/shipping-policy` (if any direct sale) · cookie note within privacy.
Include the DPDP Act 2023 grievance-officer contact block. Content is `{{TBD}}` — draft structure,
leave the legal text for the client's advisor.

---

## 7. Deferred to v2 (do not build now)
Cart and checkout · user accounts · payment gateway · a CMS · multi-language · dealer portal login ·
SSD health software downloads · live chat · product comparison tool.
Build v1 so none of these require a rewrite: keep data access behind `/src/lib/content.ts` so a CMS
can replace the local modules cleanly.
