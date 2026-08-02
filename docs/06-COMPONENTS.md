# 06 — Component Contracts

Build in the order listed. Every component is a Server Component unless it needs state, an event
handler, or a browser API — then mark `"use client"` and keep it as small a leaf as possible.

---

## 1. Layout primitives (build first)

### `<Container>`
```tsx
{ size?: "default" | "narrow" | "wide"; className?; children }
// default 1280px · narrow 768px (prose) · wide 1536px (full-bleed inner)
// Owns horizontal padding: px-5 sm:px-8 lg:px-12
```

### `<Section>`
```tsx
{
  tone?: "default" | "subtle" | "navy" | "dark";   // background
  spacing?: "default" | "tight" | "hero";
  bleed?: boolean;          // full-width background, contained content
  as?: "section" | "div";
  id?: string;
  children;
}
```
**Owns all vertical section padding.** No other component sets `py-*` at section level. This single
rule prevents the cascade collisions that plague multi-section pages.

### `<SectionHeader>`
```tsx
{ eyebrow?: string; title: string; lead?: string; align?: "left" | "center"; action?: ReactNode }
// eyebrow → label style; title → h2; lead → body-lg fg-muted max-w-[56ch]
// align defaults to "left". Centre only for CTA bands.
```

---

## 2. UI primitives

### `<Button>`
```tsx
{
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  size?: "sm" | "md" | "lg";
  href?: string;            // renders next/link when present
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;        // disables + swaps label, sets aria-busy
  disabled?: boolean;
  children;
}
```
Renders `<button>` or `<Link>` — never a `<div onClick>`. Loading state changes the label
("Sending…"), it does not show a spinner alone.

### `<Badge>`
```tsx
{ tone: "neutral" | "brand" | "success" | "warning" | "planned"; children }
// "planned" → the Coming soon / Roadmap treatment. Required on every non-shipping product.
```

### `<Card>` · `<CardMedia>` · `<CardBody>` · `<CardFooter>`
Border-first, no resting shadow. If the entire card is a link, use a stretched-link pattern so the
whole surface is clickable while only the title is in the tab order.

Other primitives: `<Input>`, `<Textarea>`, `<Select>`, `<Checkbox>`, `<RadioGroup>`, `<FileInput>`,
`<FieldError>`, `<Accordion>` (Radix), `<Dialog>` (Radix), `<Tabs>` (Radix), `<Breadcrumb>`,
`<Prose>` (MDX typography wrapper).

---

## 3. Signature & product components

### `<SpecRail>` — the signature element
```tsx
{
  items: { value: string; label: string; note?: string }[];  // exactly 4 (2 or 4 accepted)
  tone?: "navy" | "dark" | "light";
  bleed?: boolean;      // default true
}
```
Layout: 4 columns desktop, 2×2 tablet/mobile. `value` in `font-mono data-lg` with `tnum`.
`label` in the uppercase label style at `fg-inverse-muted`. Vertical hairline dividers between
columns on `md+` only. `note` renders as a superscript marker with a footnote below the rail.
No animation on the numbers.

### `<SpecTable>`
```tsx
{ specs: SpecRow[]; groupOrder?: SpecGroup[]; footnotes?: string[] }
```
Renders a real `<table>` with `<caption class="sr-only">`, `<th scope="row">` for labels, grouped by
`SpecRow.group` with group headings as full-width `<th scope="colgroup">` rows in label style.
Values in `font-mono` with tabular figures. Hairline row borders. Zebra striping is **not** used.

### `<ProductFrame>`
```tsx
{ ratio?: "1/1" | "4/3" | "16/9"; label?: string; src?: string; alt?: string; priority?: boolean }
```
When `src` is present → `next/image` with `fill` + `sizes`. When absent → the honest placeholder:
`surface-subtle` panel, `1px border`, `radius-xl`, centred caption, node motif at 4% opacity.

### `<ProductCard>`
```tsx
{ product: Product; highlightCount?: 2 }
```
Frame · status badge · name · tagline · capacity range · two headline figures in mono ·
`View specifications` link. Status badge is mandatory.

### `<CapacitySelector>` (`"use client"`)
Radio group styled as chips. Keyboard: arrow keys move selection. Updates displayed specs; does not
navigate or add to a cart.

### `<ProcessSteps>`
```tsx
{ steps: { title: string; detail: string }[]; }
```
Numbered `01/02/03` — **only** for RMA and service process. Numbers in `font-mono`, hairline
connector on desktop.

### `<TrustPoints>`
Hairline-separated list, heading + two lines each. Deliberately not icon cards.

### `<DownloadTable>`
Sortable, filterable `<table>` of documents: title, product, type, version, date, size, format.
Each link states file type and size in the accessible name: "NX-500 datasheet, PDF, 420 KB".

---

## 4. Navigation

### `<Header>` (`"use client"` for the menu only)
Sticky, 72px, transparent→`bg-surface/85 backdrop-blur` + hairline after 8px scroll.
Mega-panel dropdowns driven by `src/data/nav.ts`. Keyboard: `Tab` into trigger, `Enter`/`Space`
opens, `Esc` closes and returns focus, arrow keys move within the panel. `aria-expanded`,
`aria-controls` wired. Includes a `Skip to content` link as the first focusable element.

### `<MobileNav>`
Full-height sheet, accordion sections, focus trapped, body scroll locked, CTA pinned at the bottom,
closes on route change.

### `<Footer>`
Five columns + bottom bar. Reversed logo. Real address, `tel:`, `mailto:`. Legal links.

---

## 5. Forms

### `<Form>` wrapper
Owns: Server Action binding, `useFormStatus` pending state, error summary at the top (focused on
submit failure, linking to each invalid field), and the success state that **replaces** the form.

### `<FormField>`
```tsx
{ name; label; type?; required?; help?; error?; children? }
```
Always: visible `<label>` above the control (never placeholder-as-label), `aria-describedby` linking
help and error text, `aria-invalid` on error, `autoComplete` set correctly
(`name`, `email`, `tel`, `organization`, `address-level2`, `postal-code`).

---

## 6. Utility

`<JsonLd>` (typed schema injection) · `<Prose>` · `<Reveal>` (motion wrapper with the reduced-motion
guard baked in — all entry animation goes through this, nowhere else) · `<Toc>` (blog, `lg+` sticky).

---

## 7. Component checklist — apply to every component before marking done

- [ ] No hardcoded colour, size, radius, or spacing — tokens only
- [ ] Keyboard operable; focus visible; logical tab order
- [ ] Correct semantic element (`button` vs `a` vs `div`)
- [ ] Works at 390px without horizontal scroll
- [ ] Text scales to 200% zoom without clipping
- [ ] Loading, empty, and error states defined where applicable
- [ ] Props typed; no `any`; no unused props
- [ ] Server Component unless it genuinely needs the client
