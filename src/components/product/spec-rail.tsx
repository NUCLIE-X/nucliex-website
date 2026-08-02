import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type SpecRailItem = {
  value: string;
  label: string;
  /** Measured-conditions footnote — rendered below the rail. */
  note?: string;
};

type SpecRailProps = {
  /** Exactly four figures (two accepted for the condensed service form). */
  items: SpecRailItem[];
  tone?: "navy" | "dark" | "light";
  /** Full-bleed band (default). Set false when nested inside a section. */
  bleed?: boolean;
  className?: string;
};

/**
 * The signature element (docs/02 §1): a hairline-bounded strip of tabular
 * mono figures with uppercase micro-labels. Carries real information only —
 * all boldness is spent here, no animation on the numbers.
 */
export function SpecRail({
  items,
  tone = "navy",
  bleed = true,
  className,
}: SpecRailProps) {
  const dark = tone !== "light";
  const notes = items.filter((item) => item.note);

  const rail = (
    <div>
      <dl
        className={cn(
          "grid grid-cols-2 gap-y-10",
          items.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-2",
          "md:gap-y-0 md:divide-x",
          dark ? "md:divide-border-dark" : "md:divide-border",
        )}
      >
        {items.map((item, i) => {
          const noteIndex = item.note ? notes.indexOf(item) + 1 : null;
          // {{TBD}} tokens render as deliberate smaller placeholders — a
          // pending value must never masquerade as a published figure.
          const pending = item.value.includes("{{TBD");
          return (
            <div
              key={item.label}
              className={cn(
                "flex min-w-0 flex-col gap-2",
                i > 0 && "md:pl-8",
                i < items.length - 1 && "md:pr-8",
              )}
            >
              <dd
                className={cn(
                  "order-1 font-mono tnum break-words",
                  pending
                    ? cn(
                        "text-data",
                        dark ? "text-fg-inverse-muted" : "text-fg-subtle",
                      )
                    : cn(
                        "text-data-lg font-medium",
                        dark ? "text-fg-inverse" : "text-brand-900",
                      ),
                )}
              >
                {item.value}
                {noteIndex ? (
                  <sup
                    aria-hidden="true"
                    className="ml-1 text-body-sm font-normal"
                  >
                    {noteIndex}
                  </sup>
                ) : null}
              </dd>
              <dt
                className={cn(
                  "order-2 text-label uppercase",
                  dark ? "text-fg-inverse-muted" : "text-fg-subtle",
                )}
              >
                {item.label}
                {noteIndex ? (
                  <span className="sr-only"> (see note {noteIndex})</span>
                ) : null}
              </dt>
            </div>
          );
        })}
      </dl>
      {notes.length > 0 ? (
        <ol
          className={cn(
            "mt-6 space-y-1 text-body-sm",
            dark ? "text-fg-inverse-muted" : "text-fg-subtle",
          )}
        >
          {notes.map((item, i) => (
            <li key={item.label}>
              <sup aria-hidden="true">{i + 1}</sup> {item.note}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );

  return (
    <div
      className={cn(
        tone === "navy" && "bg-surface-navy",
        tone === "dark" && "bg-surface-dark",
        tone === "light" && "border-y border-border bg-surface",
        "py-10 md:py-12",
        className,
      )}
    >
      {bleed ? <Container>{rail}</Container> : rail}
    </div>
  );
}
