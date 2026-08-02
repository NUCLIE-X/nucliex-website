# 05 — Content

> **The rule that governs this file:** if a fact is not here, it may not appear on the site.
> Use `{{TBD:label}}` and log it in `09-OPEN-QUESTIONS.md` instead of inventing.

---

## 1. Facts that are confirmed and may be stated

- NUCLIEX INFOSYS is an Indian technology company based in Pune, Maharashtra.
- Founded by **Ramjit J. Mourya**, with a background in computer hardware, software, networking,
  IT infrastructure, and artificial intelligence.
- The business began as IT support and system integration and is expanding into storage and
  computing hardware.
- Current product focus: SATA SSDs, NVMe SSDs, storage solutions, computer components, IT accessories.
- Current services (all deliverable today): computer hardware sales; laptop and desktop upgrades;
  SSD upgrades; computer repair and diagnostics; Windows installation and deployment; data migration;
  networking setup and maintenance; router and switch configuration; CCTV and surveillance support;
  office IT infrastructure; Annual Maintenance Contracts; remote technical support; system
  optimisation; business IT consulting.
- Positioning: enterprise-grade reliability at competitive pricing; competing on engineering quality,
  transparency, warranty, and after-sales support rather than on price alone.
- Roadmap (must be labelled as planned): PCIe Gen3/4/5 NVMe, external and portable SSDs, enterprise
  SSDs, NAS storage, DDR4/DDR5 memory across desktop/laptop/gaming/workstation/ECC, USB drives,
  memory cards, enclosures, docking stations, cooling, power supplies, storage servers, backup and
  cloud integration, plus a software ecosystem (SSD health monitoring, firmware utility, warranty
  portal, product authentication, diagnostics, driver centre, dealer portal).

## 2. Facts that are NOT confirmed — use `{{TBD}}`

Product SKUs and model names · capacities · read/write speeds · TBW · MTBF · DWPD · controller and
NAND type · warranty term in years · RMA turnaround · price · MRP · dealer margin · GSTIN · CIN ·
registered address · phone numbers · email addresses · business hours · years in operation ·
customer count · certifications (ISO/BIS/RoHS/CE) · team members · partner or client names ·
any award.

---

## 3. Approved copy

### Homepage hero
> **Eyebrow:** Indian storage & IT infrastructure
>
> **H1:** Storage you can stop thinking about.
>
> **Lead:** NUCLIEX builds SATA and NVMe SSDs for people who need their data to just be there —
> backed by a clear warranty and support you can actually reach.
>
> **CTAs:** `Explore SSDs` · `Talk to us`

Alternate H1s if the client prefers a different register (pick one, don't A/B on the same page):
- "Built to be the part of your PC you never worry about."
- "Reliable storage, engineered in India."

### Spec rail — homepage
Four company-level figures. Structure, with values pending:
```
{{TBD:warranty_years}} YEAR      WARRANTY ON EVERY DRIVE
{{TBD:rma_hours}} HR             RMA FIRST RESPONSE
{{TBD:service_count}}            IT SERVICES DELIVERED
PUNE, MH                          SERVICE & SUPPORT BASE
```

### Section: Why NUCLIEX
Four points, heading + two lines each.

1. **Engineered, then verified.**
   Every drive is validated for sustained performance and endurance before it carries the NUCLIEX
   name. We publish the conditions our numbers were measured under.
2. **A warranty written in plain language.**
   The term, what's covered, and what voids it — stated on the product page, not buried in a PDF.
3. **Support that answers.**
   Phone, email, and remote support from a team based in Pune. You reach a person, not a queue.
4. **Honest specifications.**
   No "up to" figures without the test conditions. If a number isn't verified, we don't print it.

### Section: Warranty & support (dark)
> **H2:** If something goes wrong, here's exactly what happens.
>
> **Body:** Register your product once. If a drive fails inside its warranty term, raise an RMA and
> we respond within {{TBD:rma_hours}} hours with a replacement or repair decision. No forms in
> triplicate, no proof-of-purchase games.
>
> **CTAs:** `Register your warranty` · `Start an RMA`

### Section: Services strip
> **H2:** We've been fixing and building IT systems since before we made drives.
>
> **Body:** Laptop and desktop upgrades, Windows deployment, data migration, networking, CCTV, and
> annual maintenance contracts for offices across Pune.
>
> **CTA:** `View all services`

### Business page hero
> **Eyebrow:** For business & enterprise
>
> **H1:** Storage and IT support for teams that can't afford downtime.
>
> **Lead:** Bulk pricing, GST invoicing, consistent supply, and a named contact who knows your setup.
> For IT companies, system integrators, retailers, schools, and government buyers.
>
> **CTA:** `Request a business quote`

### Partners page hero
> **Eyebrow:** Dealers & distributors
>
> **H1:** Sell a brand that backs you up after the sale.
>
> **Lead:** Clear margins, dependable supply, and an RMA process that doesn't leave you explaining
> delays to your customer.
>
> **CTA:** `Apply to become a partner`

### About page opening
> **H1:** We're building a storage brand the way we'd want one built.
>
> **Lead:** NUCLIEX INFOSYS started as an IT services business in Pune — fixing machines, deploying
> Windows, running office networks, and replacing a lot of failed drives. That last part is why we
> started making our own.

### Pre-footer CTA band
> **H2:** Tell us what you're building.
> **Body:** Whether it's one laptop upgrade or two hundred workstations, we'll give you a straight answer.
> **CTAs:** `Request a quote` · `{{TBD:phone}}`

### 404
> **H1:** That page isn't here.
> **Body:** It may have moved, or the link may be wrong.
> **Links:** `Browse products` · `Get support` · `Go to homepage`

### Form confirmations
- Enquiry: "Quote request sent. We reply within one working day — check your email for a copy."
- Warranty: "Warranty registered. Your registration ID is {{id}}. We've emailed a copy to {{email}}."
- Dealer: "Application received. Our partner team will be in touch within three working days."

---

## 4. Metadata (title / description per route)

| Route | Title | Description |
|---|---|---|
| `/` | NUCLIEX — SSDs & IT solutions engineered in India | SATA and NVMe SSDs, computer hardware, and professional IT services from NUCLIEX INFOSYS, Pune. Clear warranty, real support. |
| `/products` | SSDs & storage products — NUCLIEX | Browse NUCLIEX SATA and NVMe SSDs. Full specifications, warranty terms, and datasheets for every drive. |
| `/products/ssd/sata` | SATA SSDs — NUCLIEX | Reliable 2.5-inch SATA SSDs for laptop and desktop upgrades, with published performance figures. |
| `/products/ssd/nvme` | NVMe SSDs — NUCLIEX | M.2 NVMe SSDs for gaming, content creation, and workstation builds. |
| `/services` | IT services & support — NUCLIEX INFOSYS | SSD upgrades, Windows deployment, data migration, networking, CCTV, and AMC for businesses in Pune. |
| `/business` | Business & enterprise storage — NUCLIEX | Bulk pricing, GST invoicing, and dedicated support for IT companies, integrators, schools, and government buyers. |
| `/partners` | Become a NUCLIEX dealer or distributor | Partner with an Indian storage brand: clear margins, dependable supply, and a fast RMA process. |
| `/support` | Support, warranty & downloads — NUCLIEX | Register a warranty, start an RMA, download datasheets, or reach the NUCLIEX support team. |
| `/about` | About NUCLIEX INFOSYS | An Indian technology company building reliable storage, founded in Pune by Ramjit J. Mourya. |
| `/contact` | Contact NUCLIEX INFOSYS | Talk to our team about products, bulk orders, IT services, or support. |
| `/blog` | Storage & IT guides — NUCLIEX | Practical guides on SSDs, upgrades, and keeping business IT running. |

Title pattern for untabulated pages: `{Page} — NUCLIEX` (product/marketing) or
`{Page} — NUCLIEX INFOSYS` (corporate/legal). Max 60 chars. Descriptions 140–158 chars, each one
written for the page — never templated.
