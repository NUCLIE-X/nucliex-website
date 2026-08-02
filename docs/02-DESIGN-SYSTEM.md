# 02 — Design System

---

## 1. Art direction

### The thesis

Storage is sold on **numbers and trust**. So the design language is the language of a **specification
sheet**: hairline rules, tabular figures, generous white space, and colour used as signal rather
than decoration. The page should feel like precision instrumentation — quiet, dense where it matters,
and empty everywhere else.

This is _minimalism as engineering discipline_, not minimalism as blankness. Minimal directions live
or die on precision in spacing, type, and detail. Every misaligned 4px is visible in this system.

### The signature element: **the spec rail**

The one thing the site is remembered by is a **monospaced technical data rail** — a hairline-bounded
horizontal strip of tabular figures with tiny uppercase labels beneath them.

```
┌────────────────────────────────────────────────────────────────┐
│  550 MB/s        500 MB/s        3 YEAR         24 HR          │
│  SEQ. READ       SEQ. WRITE      WARRANTY       RMA RESPONSE   │
└────────────────────────────────────────────────────────────────┘
```

It appears directly under the homepage hero, at the top of every product page, and in a condensed
2-up form on service pages. It is the only place monospace type is used at large sizes, it carries
real information, and it does the credibility work that a paragraph of adjectives cannot.

**All boldness is spent here.** Everything around it stays quiet.

### Structural devices — what they mean

Structure encodes information, it does not decorate:

- **Hairline rules (1px `--color-border`)** separate specification data from prose. Nowhere else.
- **Numbered markers (01/02/03)** are used **only** for the RMA process and the "how we work"
  service sequence — where order genuinely matters. Never on feature grids.
- **Uppercase micro-labels** mark data fields and section eyebrows. Never body copy.
- **Cyan `#00C2FF`** appears only on interactive and live elements. If cyan is on the page and it
  isn't clickable, focused, or a live status, that's a bug.

### Calibration — what this must not look like

Avoid the current defaults of AI-generated tech sites: a full-bleed hero gradient with a giant
centred headline and two pill buttons; three-up icon cards with generic line icons and 40-word
blurbs; a purple/violet accent; animated counters; glassmorphism everywhere. If a section could be
lifted onto any other B2B site unchanged, redesign it.

**Layout bias:** asymmetric and left-aligned. The hero is a two-column split (copy left, product
frame right), not a centred stack. Content sits on a real 12-column grid and deliberately breaks it
in exactly two places (the spec rail and the dark full-bleed section).

---

## 2. Colour tokens

All colour lives in `@theme` in `globals.css`. Never write a hex outside that file.

```css
/* src/styles/globals.css */
@import "tailwindcss";

@theme {
  /* ── Brand ─────────────────────────────────────────────── */
  --color-brand-50: #eaf2fc;
  --color-brand-100: #cfe1f7;
  --color-brand-200: #9fc3ef;
  --color-brand-300: #6fa5e7;
  --color-brand-400: #3f87df;
  --color-brand-500: #0057b8; /* PRIMARY — buttons, links, active states */
  --color-brand-600: #004a9e;
  --color-brand-700: #003d83;
  --color-brand-800: #002f68;
  --color-brand-900: #0b1f3a; /* DARK NAVY — logo, dark surfaces, headings on light */

  /* ── Accent (interactive only) ─────────────────────────── */
  --color-accent-400: #4dd4ff;
  --color-accent-500: #00c2ff; /* ELECTRIC CYAN — hover, focus ring, live/active indicator */
  --color-accent-600: #00a2d6;

  /* ── Surfaces ──────────────────────────────────────────── */
  --color-surface: #ffffff;
  --color-surface-subtle: #f6f8fb;
  --color-surface-dark: #0f172a;
  --color-surface-navy: #0b1f3a;

  /* ── Text ──────────────────────────────────────────────── */
  --color-fg: #111827;
  --color-fg-muted: #4b5563;
  --color-fg-subtle: #6b7280;
  --color-fg-inverse: #ffffff;
  --color-fg-inverse-muted: #94a3b8;

  /* ── Lines ─────────────────────────────────────────────── */
  --color-border: #e5e9f0;
  --color-border-strong: #cbd5e1;
  --color-border-dark: #1e293b;

  /* ── Status ────────────────────────────────────────────── */
  --color-success: #28a745;
  --color-warning: #ffc107;
  --color-error: #dc3545;
}
```

### Usage discipline

| Token                           | Allowed use                                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `brand-500`                     | Primary buttons, text links, active nav, key iconography                                                        |
| `brand-900`                     | Headings on light backgrounds, navy section backgrounds, logo                                                   |
| `accent-500`                    | Hover states, focus rings, live/in-stock indicators, active tab underline, chart highlight. **Nothing static.** |
| `surface-subtle`                | Alternating section backgrounds — never two adjacent                                                            |
| `surface-dark` / `surface-navy` | Full-bleed dark sections; max **two per page**                                                                  |
| `success` / `warning` / `error` | Form validation, stock status, RMA status only                                                                  |

**Ratio target per viewport:** ~70% white/subtle, ~20% navy/dark, ~8% brand blue, ~2% cyan.
If cyan exceeds a couple of small elements in view, you've over-accented.

### Contrast (WCAG AA — verified)

- `fg #111827` on `#FFFFFF` → 16.1:1 ✓
- `fg-muted #4B5563` on `#FFFFFF` → 7.6:1 ✓
- `brand-500 #0057B8` on `#FFFFFF` → 6.4:1 ✓ (body text and links OK)
- `#FFFFFF` on `brand-500` → 6.4:1 ✓ (primary button OK)
- `#FFFFFF` on `surface-dark #0F172A` → 17.9:1 ✓
- ⚠️ `accent-500 #00C2FF` on white → **2.2:1 — FAILS.** Cyan is never used for text or icons on
  light backgrounds. On dark navy it reaches ~8:1 and is permitted for text there.
- ⚠️ `warning #FFC107` needs `fg #111827` on top, never white.

---

## 3. Typography

Chosen from the brief's own preferences, paired deliberately:

| Role        | Family             | Weights       | Rationale                                                                                               |
| ----------- | ------------------ | ------------- | ------------------------------------------------------------------------------------------------------- |
| Display     | **Space Grotesk**  | 500, 700      | Geometric but with mechanical detailing — reads as engineering, and avoids the Inter-everywhere default |
| Body / UI   | **Inter**          | 400, 500, 600 | Highest legibility at small sizes; excellent Devanagari-adjacent fallback behaviour                     |
| Data / mono | **JetBrains Mono** | 400, 500      | Tabular figures for the spec rail and spec tables — numbers must align in columns                       |

Load via `next/font/google`, subset `latin`, `display: "swap"`. **Only the weights listed above** —
each extra weight is ~15 kB.

```css
@theme {
  --font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

Apply `font-feature-settings: "tnum" 1, "cv05" 1;` to all numeric/spec contexts so figures align.

### Scale (fluid, clamp-based)

| Token       | Size                             | Line height | Tracking                         | Use                           |
| ----------- | -------------------------------- | ----------- | -------------------------------- | ----------------------------- |
| `display-1` | `clamp(2.5rem, 5vw, 4rem)`       | 1.05        | -0.03em                          | Homepage hero H1 only         |
| `display-2` | `clamp(2rem, 3.6vw, 3rem)`       | 1.1         | -0.02em                          | Page H1                       |
| `h2`        | `clamp(1.5rem, 2.4vw, 2.125rem)` | 1.2         | -0.015em                         | Section headings              |
| `h3`        | `1.25rem`                        | 1.3         | -0.01em                          | Card/subsection headings      |
| `h4`        | `1.0625rem`                      | 1.4         | 0                                | Small headings                |
| `body-lg`   | `1.125rem`                       | 1.65        | 0                                | Lead paragraphs               |
| `body`      | `1rem`                           | 1.7         | 0                                | Default                       |
| `body-sm`   | `0.875rem`                       | 1.6         | 0                                | Secondary, captions           |
| `label`     | `0.75rem`                        | 1.4         | **0.1em**, uppercase, weight 600 | Eyebrows, spec labels, badges |
| `data-lg`   | `clamp(1.75rem, 3vw, 2.5rem)`    | 1           | -0.02em                          | Spec rail figures (mono)      |
| `data`      | `0.9375rem`                      | 1.5         | 0                                | Spec table values (mono)      |

### Rules

- Display face on H1/H2 and spec-rail labels only. Everything else is Inter.
- Measure: body copy `max-width: 68ch`; lead paragraphs `56ch`. Never full-bleed text.
- Never centre a paragraph longer than two lines.
- One H1 per page. Heading levels never skip.

---

## 4. Spacing, radius, elevation

**4px base unit.** Permitted values only: `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`.
Anything else is a mistake.

```css
@theme {
  --radius-sm: 4px; /* badges, inputs, small controls */
  --radius-md: 8px; /* buttons, tags */
  --radius-lg: 12px; /* cards */
  --radius-xl: 16px; /* product frames, large panels */
  --radius-full: 9999px; /* pills, avatars only */

  --shadow-xs: 0 1px 2px 0 rgb(11 31 58 / 0.04);
  --shadow-sm:
    0 1px 3px 0 rgb(11 31 58 / 0.06), 0 1px 2px -1px rgb(11 31 58 / 0.04);
  --shadow-md:
    0 4px 12px -2px rgb(11 31 58 / 0.08), 0 2px 6px -2px rgb(11 31 58 / 0.04);
  --shadow-lg: 0 12px 32px -8px rgb(11 31 58 / 0.12);
}
```

**Shadow discipline:** shadows indicate elevation, not decoration. Resting cards use a border, not a
shadow. `shadow-md` appears on hover. `shadow-lg` is for overlays and dropdowns only. Never a
coloured or glowing shadow.

### Section rhythm — enforced by one component

```
Section padding-block:  mobile 64px · tablet 80px · desktop 96px
Hero padding-block:     mobile 80px · desktop 128px
Gap between a section heading block and its content: 40px (48px desktop)
```

Never set section padding inline. `<Section>` owns it. This prevents the specificity collisions that
happen when `.section` and `.cta` both try to set vertical spacing.

### Grid & container

- Container max width `1280px`, side padding `20px` mobile / `32px` tablet / `48px` desktop.
- 12 columns, `24px` gutter desktop / `16px` mobile.
- Dark sections and the spec rail go **full-bleed**; their inner content still respects the container.
- Common splits: `7/5` for hero (copy/visual), `8/4` for article + sidebar, `4/4/4` for feature triads.

---

## 5. Component styling baseline

### Buttons

| Variant   | Resting                                  | Hover                                | Focus                             | Disabled                                 |
| --------- | ---------------------------------------- | ------------------------------------ | --------------------------------- | ---------------------------------------- |
| Primary   | `bg-brand-500`, white text, `radius-md`  | `bg-brand-600`, `translate-y-[-1px]` | 2px `accent-500` ring, 2px offset | `bg-border-strong`, `cursor-not-allowed` |
| Secondary | white bg, `1px border-strong`, `fg` text | `border-brand-500`, `text-brand-500` | same ring                         | 50% opacity                              |
| Ghost     | transparent, `fg-muted`                  | `bg-surface-subtle`, `fg`            | same ring                         | 50% opacity                              |
| On dark   | white bg, `brand-900` text               | `bg-accent-500`, `brand-900` text    | `accent-500` ring on dark offset  | —                                        |

Heights: `sm 36px · md 44px · lg 52px`. Padding-x: `16 / 24 / 32`. Min tap target **44×44** on mobile.
Transition: `150ms ease-out` on background, border, colour, transform. Never on `box-shadow` alone.

### Cards

Resting: `bg-surface`, `1px border`, `radius-lg`, `padding 24px` (32px desktop), **no shadow**.
Hover (only if the whole card is a link): `border-brand-200`, `shadow-md`, 150ms.
Product cards get a `surface-subtle` image well with `radius-lg` inside them.

### Inputs

Height 48px, `1px border`, `radius-sm`, `padding-x 16px`, label above (never placeholder-as-label),
help text below in `body-sm fg-subtle`. Focus: `border-brand-500` + 3px `accent-500/25` ring.
Error: `border-error`, message below in `error`, `aria-describedby` wired, `aria-invalid="true"`.

### Focus ring (global, non-negotiable)

```css
:focus-visible {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

---

## 6. Dark sections

Used for: the spec rail band, one "why NUCLIEX / engineering" section, and the pre-footer CTA.
Background `surface-navy` or `surface-dark`, text `fg-inverse`, secondary text
`fg-inverse-muted`, dividers `border-dark`. The node-network motif may sit behind at ≤4% opacity.
**Maximum two dark sections per page**, never adjacent.

---

## 7. Motion

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 400ms;
```

**Permitted, and that's the whole list:**

1. Hero load sequence — eyebrow, H1, lead, CTA, spec rail stagger in at 60ms intervals, opacity 0→1
   plus `translateY(12px)→0`. Fires once.
2. Section entry — `opacity 0→1`, `translateY(8px)→0`, `400ms`, triggered at 15% viewport
   intersection, `once: true`.
3. Hover/focus transitions ≤200ms.
4. Accordion height and dialog fade — functional feedback.

Everything wrapped in a reduced-motion guard:

```tsx
const reduce = useReducedMotion();
const anim = reduce ? { opacity: 1, y: 0 } : { opacity: [0, 1], y: [8, 0] };
```

**Banned:** parallax, auto-play carousels, marquees, scroll-jacking, animated counters, particle
fields, 3D spinners, cursor followers, page-transition wipes, looping background video.

---

## 8. Iconography

`lucide-react`, stroke `1.5`, sizes `16 / 20 / 24`, `currentColor` only. Icons are always paired with
a text label — never an icon-only control except the mobile menu toggle and social links, which get
`aria-label`. No filled/duotone icons. No emoji anywhere in the UI.

---

## 9. Imagery — and the placeholder system

Target photography: clean workspace setups, SSD macro shots, motherboards, PC internals, server and
networking equipment, engineers at work. Soft, realistic, premium lighting. Neutral or `surface-subtle`
backgrounds. Consistent 45° or straight-on angles across a product family.

**Until real photography exists, do not use stock images or AI-generated fake product shots.** Use:

```tsx
<ProductFrame ratio="4/3" label="NX-500 · 512 GB SATA SSD" />
```

which renders a `surface-subtle` panel with a `1px border`, `radius-xl`, a centred `label`-style
caption in `fg-subtle`, and a 4%-opacity node-network motif. This reads as a considered empty state,
not as a broken image, and it is honest.

**Image rules:** always `next/image`; AVIF then WebP; hero image `priority`, everything else lazy;
explicit `sizes`; descriptive `alt` that states the product and what is shown ("NX-500 SATA SSD,
2.5-inch, front view") — never "image" or "product photo". Decorative graphics get `alt=""`.

---

## 10. Responsive breakpoints

| Name | Width | Notes                                                                   |
| ---- | ----- | ----------------------------------------------------------------------- |
| base | 0–639 | Design here first. Single column, 20px gutters, stacked nav in a sheet. |
| `sm` | 640   | Two-column card grids begin                                             |
| `md` | 768   | Tablet; spec rail goes 4-up                                             |
| `lg` | 1024  | Desktop nav appears; hero splits 7/5                                    |
| `xl` | 1280  | Container max width reached                                             |

Test every page at **390px, 768px, 1440px** before marking it done.
