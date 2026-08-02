# NUCLIEX INFOSYS — Website

Specification and build documentation for the NUCLIEX website.

## What's here

| File | Purpose |
|---|---|
| `CLAUDE.md` | The operating manual. Claude Code reads this on every session. Non-negotiables, stack, conventions, quality gates. |
| `docs/01-BRAND.md` | Identity, positioning, voice, copy rules, logo usage |
| `docs/02-DESIGN-SYSTEM.md` | Art direction, colour/type/spacing tokens, motion, imagery |
| `docs/03-ARCHITECTURE.md` | Rendering strategy, data model, forms, security |
| `docs/04-SITEMAP-AND-PAGES.md` | Every route, specified section by section |
| `docs/05-CONTENT.md` | Approved copy and the hard boundary between known and unknown facts |
| `docs/06-COMPONENTS.md` | Component prop contracts and build order |
| `docs/07-SEO-PERF-A11Y.md` | Metadata, schema, budgets, accessibility checklist |
| `docs/08-BUILD-PLAN.md` | Phased task list with acceptance criteria |
| `docs/09-OPEN-QUESTIONS.md` | Blockers awaiting client input |
| `brand-assets/` | Logo recoloured to the brand system (raster — SVG still required) |

## How to run this with Claude Code

```bash
mkdir nucliex-web && cd nucliex-web
git init
# copy CLAUDE.md, docs/ and brand-assets/ into the repo root
claude
```

Then, one phase at a time:

```
Read CLAUDE.md and docs/08-BUILD-PLAN.md. Execute Phase 0 only.
Stop when its acceptance criteria pass and report what you did.
```

Do not ask for the whole site in one prompt. The phases exist because token layers must be built
before components, and components before pages — skipping that order produces inconsistent spacing
that costs more to unpick than it saved.

Useful follow-up prompts:

```
Execute Phase 1. Re-read docs/02-DESIGN-SYSTEM.md sections 2–4 first.
```
```
Execute Phase 5. Use only copy from docs/05-CONTENT.md section 3.
Where a fact is missing, use a {{TBD:label}} token and add a row to docs/09-OPEN-QUESTIONS.md.
```
```
Audit the homepage against docs/07-SEO-PERF-A11Y.md section 4 and fix every failure.
```

## Before you start

Read `docs/09-OPEN-QUESTIONS.md`. Nine items are launch blockers — most importantly the vector
logo, the real product specifications, and the warranty terms. The build can proceed without them
using `{{TBD}}` tokens, but the site cannot launch.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · MDX · Server Actions +
zod · Resend · Vercel. Node 20+.
