# 09 — Open Questions

Everything the site needs that the brief does not supply. Each item has a `{{TBD}}` token used in
code. **Blockers marked 🔴 must be resolved before launch.**

---

## 🔴 Launch blockers

| #   | Token                                                             | Question                                                                                                           | Why it blocks                                                                                                                                       |
| --- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `{{TBD:logo_svg}}`                                                | Vector (SVG/AI/EPS) source of the logo                                                                             | The supplied file is a 2726px PNG. A raster logo in the header is a permanent quality and performance defect. Needs redrawing as SVG in navy/white. |
| 2   | `{{TBD:products}}`                                                | Actual product list — model names, capacities, form factors                                                        | There is no product catalogue without this.                                                                                                         |
| 3   | `{{TBD:specs}}`                                                   | Per-product read/write speeds, TBW, MTBF, controller, NAND type, and the test conditions those were measured under | The spec rail and spec table are the site's core credibility mechanism. Cannot be invented.                                                         |
| 4   | `{{TBD:warranty_years}}`                                          | Warranty term, exactly what is covered, and what voids it                                                          | Referenced on the homepage, every product page, and the support hub.                                                                                |
| 5   | `{{TBD:rma_hours}}` / `{{TBD:rma_process}}`                       | RMA first-response time and the real step-by-step process                                                          | The RMA page is a primary trust asset.                                                                                                              |
| 6   | `{{TBD:address}}` `{{TBD:phone}}` `{{TBD:email}}` `{{TBD:hours}}` | Registered address, support and sales phone numbers, email addresses, business hours                               | Footer, contact page, `LocalBusiness` JSON-LD, and local SEO all depend on these matching the Google Business Profile exactly.                      |
| 7   | `{{TBD:gstin}}` `{{TBD:cin}}`                                     | GSTIN and CIN / registration number                                                                                | Required in the footer for B2B credibility and Indian commercial norms.                                                                             |
| 8   | `{{TBD:legal}}`                                                   | Privacy policy, terms, warranty policy, and DPDP Act 2023 grievance officer details                                | Legal requirement. Needs the client's advisor — not drafted by us.                                                                                  |
| 9   | `{{TBD:domain}}`                                                  | Confirmed domain                                                                                                   | Canonicals, OG URLs, sitemap, email sending domain.                                                                                                 |

---

## 🟡 Needed for a strong launch (site can ship with placeholders, but weaker)

| #   | Token                                     | Question                                                                                                                                   |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 10  | `{{TBD:photography}}`                     | Real product photography — front, angle, and in-situ shots per SKU, on a neutral background. Until then every product uses `ProductFrame`. |
| 11  | `{{TBD:founder_photo}}`                   | Photograph of Ramjit J. Mourya for the About page. A named face materially reduces the "shell brand" suspicion.                            |
| 12  | `{{TBD:certifications}}`                  | Any ISO / BIS / RoHS / CE certification, with certificate numbers. Only listed once verified.                                              |
| 13  | `{{TBD:documents}}`                       | Datasheet PDFs, installation guides, warranty cards for the downloads centre.                                                              |
| 14  | `{{TBD:years}}` / `{{TBD:service_count}}` | Year the business started and a defensible services-delivered figure, for the homepage spec rail.                                          |
| 15  | `{{TBD:socials}}`                         | LinkedIn, Instagram, YouTube, X handles for the footer and `sameAs`.                                                                       |
| 16  | `{{TBD:enquiry_sink}}`                    | Where enquiries should land besides email — Google Sheet, CRM, WhatsApp Business? Enquiries should never live only in an inbox.            |
| 17  | `{{TBD:dealer_terms}}`                    | Dealer margin structure, territory policy, and minimum order — even at a summary level, for the partners page.                             |
| 18  | `{{TBD:turnaround}}`                      | Turnaround times per service ("same day", "48 hours") for the services pages. Currently omitted rather than guessed.                       |

---

## Build-status notes (2026-08-02)

- The site is built through Phase 10 of `08-BUILD-PLAN.md`; every `{{TBD}}` in `src/` traces to a row above (verified by grep).
- The serial-number lookup on `/support` validates format and routes to the support mailbox — a real lookup needs the warranty-records decision in #16.
- Legal pages are structured but `noindex` until #8 resolves.

### Resolved / narrowed 2026-08-02 (client-supplied packaging + messages — see docs/05 §1a)

- **#2 products — PARTIALLY RESOLVED:** real product is the **GREEN Series SSD** (256 GB SATA III); it replaced the provisional NX-500 and ships at status `available`. Other models/capacities still open.
- **#3 specs — PARTIALLY RESOLVED:** packaging figures live on the product page with a "measured-conditions datasheet pending" footnote. The datasheet itself is still open.
- **#4 warranty — RESOLVED:** 5 years standard + 2 years extended registration benefit (7 total), T&C apply.
- **#6 contacts — PARTIALLY RESOLVED:** phone +91 9167862127; support@/sales@/accounts@/ram@ @nucliex.in. Address and hours still open; no partners@ mailbox (routes to sales).
- **#9 domain — RESOLVED:** `www.nucliex.in` (confirm www-vs-apex canonical at deploy).
- **#12 certifications — PARTIALLY RESOLVED:** BIS certification claimed on packaging and listed on the spec table; certificate number still open.

---

## Decisions needed from the client

1. **Does the site sell directly?** v1 is built as a catalogue + enquiry site with no cart. Confirm.
   If direct sale is wanted, add a phase for payment gateway, shipping policy, and returns — this is
   a significant scope change, not a toggle.
2. **Marketplace strategy.** If products sell on Amazon/Flipkart, product pages should link out.
   Confirm whether to include those links.
3. **WhatsApp.** A WhatsApp Business number is often the highest-converting channel for Indian SMB
   buyers. Add a click-to-chat CTA? (It adds no cookie-consent burden.)
4. **Hindi/Marathi.** English-only for v1. Confirm no regional language requirement.
5. **Tagline placement.** "Driven by Expertise" is set as the corporate signature and "Powering
   Reliable Technology" as the product line. Confirm this split is acceptable.
6. **Logo colour.** ~~The teal `#7ACCC9` is retired in favour of navy/white/brand-blue
   reproduction.~~ **RESOLVED 2026-08-02: client chose the original teal artwork.** The site
   now renders the teal lockup/mark everywhere (see CLAUDE.md §3.2 amendment). Teal remains
   outside the UI token set; the SVG redraw (#1) should be produced in teal.

---

## How to use this file

- When you hit an unknown while building, add a row here and use the token in the code.
- Grep for `{{TBD` before any release. Phase 10 fails if any remain in shipped copy.
- Never resolve a `{{TBD}}` by guessing a plausible value. That is the one failure mode this whole
  document set exists to prevent.
