# NUCLIEX INFOSYS — Website

The public website for NUCLIEX INFOSYS (Pune): SATA/NVMe SSDs, computer
hardware, and professional IT services. Next.js 16 (App Router) · React 19 ·
TypeScript strict · Tailwind CSS 4 · MDX · Server Actions + zod · Resend ·
Vercel.

**Build status:** Phases 0–10 of `docs/08-BUILD-PLAN.md` are implemented — all
routes, forms, blog, JSON-LD, sitemap/robots, and OG images. Launch is gated
on the client inputs in `docs/09-OPEN-QUESTIONS.md` (real product specs,
warranty terms, contact details, legal text, SVG logo). Every unknown renders
a literal `{{TBD:…}}` token — grep for `{{TBD` before any release.

## Commands

```bash
npm run dev          # localhost:3000 (webpack — see note below)
npm run build        # production build
npm run start        # serve the build
npm run lint         # eslint, zero warnings allowed
npm run typecheck    # tsc --noEmit
npm run format       # prettier
```

> **This machine:** Smart App Control blocks the native SWC binary, so `dev`
> and `build` pin the `--webpack` flag (WASM SWC fallback — Turbopack cannot
> run here). Vercel builds are unaffected. See `CLAUDE.md §0`.

Mail (forms) needs `.env.local` — copy `.env.example` and fill the Resend
keys. Without keys, form submissions are logged to the console in dev, and a
production Vercel deploy fails on purpose rather than dropping enquiries.

## Documentation

| File                           | Purpose                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| `CLAUDE.md`                    | The operating manual. Non-negotiables, stack, conventions, quality gates. **This file wins.** |
| `docs/01-BRAND.md`             | Identity, positioning, voice, copy rules, logo usage                                          |
| `docs/02-DESIGN-SYSTEM.md`     | Art direction, colour/type/spacing tokens, motion, imagery                                    |
| `docs/03-ARCHITECTURE.md`      | Rendering strategy, data model, forms, security                                               |
| `docs/04-SITEMAP-AND-PAGES.md` | Every route, specified section by section                                                     |
| `docs/05-CONTENT.md`           | Approved copy and the hard boundary between known and unknown facts                           |
| `docs/06-COMPONENTS.md`        | Component prop contracts and build order                                                      |
| `docs/07-SEO-PERF-A11Y.md`     | Metadata, schema, budgets, accessibility checklist                                            |
| `docs/08-BUILD-PLAN.md`        | Phased task list with acceptance criteria + build status                                      |
| `docs/09-OPEN-QUESTIONS.md`    | Blockers awaiting client input — **read this before launch talk**                             |
| `brand-assets/`                | Logo recoloured to the brand system (raster — SVG redraw is launch blocker #1)                |

## Where things live

- Content and catalogue data: `src/data/*.ts` (typed modules — no CMS in v1)
- Blog posts: `src/content/*.mdx` + registry in `src/data/posts.ts`
- Design tokens: `src/styles/globals.css` (`@theme` — the only file with hex values)
- Form actions: `src/lib/actions/*.ts`; schemas in `src/lib/schemas/`
- `/styleguide` — internal token/component audit page; delete at launch (Phase 10 checklist)

## Before launch

Work `docs/09-OPEN-QUESTIONS.md` top to bottom: nine 🔴 items block launch.
Then run the pre-launch verification in `docs/07-SEO-PERF-A11Y.md §5` on the
deployed preview, and grep the repo for `{{TBD` — none may remain in shipped
copy.
