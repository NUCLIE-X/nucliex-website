import type { Metadata } from "next";
import { PrimitivesShowcase, SignatureShowcase } from "./primitives";

/**
 * Throwaway token audit page — docs/08-BUILD-PLAN.md Phase 1.
 * DELETE BEFORE LAUNCH (Phase 10 checklist).
 */
export const metadata: Metadata = {
  title: "Styleguide (internal)",
  robots: { index: false, follow: false },
};

const brand = [
  ["brand-50", "bg-brand-50", "#EAF2FC"],
  ["brand-100", "bg-brand-100", "#CFE1F7"],
  ["brand-200", "bg-brand-200", "#9FC3EF"],
  ["brand-300", "bg-brand-300", "#6FA5E7"],
  ["brand-400", "bg-brand-400", "#3F87DF"],
  ["brand-500", "bg-brand-500", "#0057B8"],
  ["brand-600", "bg-brand-600", "#004A9E"],
  ["brand-700", "bg-brand-700", "#003D83"],
  ["brand-800", "bg-brand-800", "#002F68"],
  ["brand-900", "bg-brand-900", "#0B1F3A"],
] as const;

const others = [
  ["accent-400", "bg-accent-400", "#4DD4FF"],
  ["accent-500", "bg-accent-500", "#00C2FF"],
  ["accent-600", "bg-accent-600", "#00A2D6"],
  ["surface", "bg-surface", "#FFFFFF"],
  ["surface-subtle", "bg-surface-subtle", "#F6F8FB"],
  ["surface-dark", "bg-surface-dark", "#0F172A"],
  ["surface-navy", "bg-surface-navy", "#0B1F3A"],
  ["fg", "bg-fg", "#111827"],
  ["fg-muted", "bg-fg-muted", "#4B5563"],
  ["fg-subtle", "bg-fg-subtle", "#6B7280"],
  ["fg-inverse-muted", "bg-fg-inverse-muted", "#94A3B8"],
  ["border", "bg-border", "#E5E9F0"],
  ["border-strong", "bg-border-strong", "#CBD5E1"],
  ["border-dark", "bg-border-dark", "#1E293B"],
  ["success", "bg-success", "#28A745"],
  ["warning", "bg-warning", "#FFC107"],
  ["error", "bg-error", "#DC3545"],
] as const;

// Verified pairs from docs/02-DESIGN-SYSTEM.md §2 — restated, not recomputed.
const contrast = [
  ["fg on surface", "16.1:1", "pass"],
  ["fg-muted on surface", "7.6:1", "pass"],
  ["brand-500 on surface", "6.4:1", "pass — body text and links OK"],
  ["white on brand-500", "6.4:1", "pass — primary button OK"],
  ["white on surface-dark", "17.9:1", "pass"],
  ["accent-500 on surface", "2.2:1", "FAILS — never text/icons on light"],
  ["accent-500 on surface-navy", "~8:1", "pass — text permitted on dark"],
  ["fg on warning", "—", "required pairing; never white on warning"],
] as const;

const spacing = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128] as const;

const typeScale = [
  [
    "display-1",
    "text-display-1 font-display font-bold",
    "Homepage hero H1 only",
  ],
  ["display-2", "text-display-2 font-display font-bold", "Page H1"],
  ["h2", "text-h2 font-display font-medium", "Section headings"],
  ["h3", "text-h3 font-semibold", "Card/subsection headings"],
  ["h4", "text-h4 font-medium", "Small headings"],
  ["body-lg", "text-body-lg", "Lead paragraphs"],
  ["body", "text-body", "Default"],
  ["body-sm", "text-body-sm", "Secondary, captions"],
  ["label", "text-label uppercase", "Eyebrows, spec labels, badges"],
  ["data-lg", "text-data-lg font-mono tnum", "Spec rail figures"],
  ["data", "text-data font-mono tnum", "Spec table values"],
] as const;

function SwatchRow({
  rows,
}: {
  rows: ReadonlyArray<readonly [string, string, string]>;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {rows.map(([name, cls, hex]) => (
        <div key={name} className="rounded-lg border border-border">
          <div className={`${cls} h-16 rounded-t-lg`} />
          <div className="p-3">
            <p className="text-body-sm font-medium text-fg">{name}</p>
            <p className="font-mono text-body-sm text-fg-subtle">{hex}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-10">
      <h2 className="mb-8 font-display text-h2 font-medium text-brand-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
      <p className="text-label text-fg-subtle uppercase">
        Internal — delete before launch
      </p>
      <h1 className="mt-2 mb-12 font-display text-display-2 font-bold text-brand-900">
        Token styleguide
      </h1>

      <Block title="Brand scale">
        <SwatchRow rows={brand} />
      </Block>

      <Block title="Accent, surfaces, text, lines, status">
        <SwatchRow rows={others} />
      </Block>

      <Block title="Contrast (documented pairs)">
        <table className="w-full max-w-2xl text-left">
          <caption className="sr-only">
            WCAG contrast ratios for approved colour pairs
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="py-2 text-label text-fg-subtle uppercase"
              >
                Pair
              </th>
              <th
                scope="col"
                className="py-2 text-label text-fg-subtle uppercase"
              >
                Ratio
              </th>
              <th
                scope="col"
                className="py-2 text-label text-fg-subtle uppercase"
              >
                Verdict
              </th>
            </tr>
          </thead>
          <tbody>
            {contrast.map(([pair, ratio, verdict]) => (
              <tr key={pair} className="border-b border-border">
                <th scope="row" className="py-2 text-body-sm font-normal">
                  {pair}
                </th>
                <td className="py-2 font-mono tnum text-data">{ratio}</td>
                <td className="py-2 text-body-sm text-fg-muted">{verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Block>

      <Block title="Type scale">
        <div className="space-y-8">
          {typeScale.map(([name, cls, use]) => (
            <div key={name}>
              <p className="mb-1 text-label text-fg-subtle uppercase">
                {name} · {use}
              </p>
              <p className={cls}>Reliable technology. 0123456789</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Spacing steps (4px base — permitted values only)">
        <div className="space-y-2">
          {spacing.map((px) => (
            <div key={px} className="flex items-center gap-4">
              <span className="w-12 font-mono tnum text-data">{px}</span>
              <div className="h-4 bg-brand-500" style={{ width: `${px}px` }} />
            </div>
          ))}
        </div>
      </Block>

      <Block title="Radius">
        <div className="flex flex-wrap gap-6">
          {(
            [
              "rounded-sm",
              "rounded-md",
              "rounded-lg",
              "rounded-xl",
              "rounded-full",
            ] as const
          ).map((cls) => (
            <div key={cls} className="text-center">
              <div
                className={`${cls} h-20 w-20 border border-brand-300 bg-brand-100`}
              />
              <p className="mt-2 text-body-sm text-fg-subtle">{cls}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Elevation">
        <div className="flex flex-wrap gap-8">
          {(["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg"] as const).map(
            (cls) => (
              <div key={cls} className="text-center">
                <div className={`${cls} h-20 w-32 rounded-lg bg-surface`} />
                <p className="mt-2 text-body-sm text-fg-subtle">{cls}</p>
              </div>
            ),
          )}
        </div>
      </Block>

      <Block title="Primitives (Phase 2)">
        <PrimitivesShowcase />
      </Block>

      <Block title="Signature components (Phase 4)">
        <SignatureShowcase />
      </Block>
    </div>
  );
}
