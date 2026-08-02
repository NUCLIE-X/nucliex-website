import { cn } from "@/lib/utils";

type BadgeProps = {
  tone: "neutral" | "brand" | "success" | "warning" | "planned";
  className?: string;
  children: React.ReactNode;
};

/**
 * Status text is always present — the dot is reinforcement, never the sole
 * carrier of meaning (docs/07 §4). Success/warning avoid coloured small text,
 * which cannot meet 4.5:1 with the status palette.
 */
const tones = {
  neutral: "border border-border bg-surface-subtle text-fg-muted",
  brand: "border border-brand-100 bg-brand-50 text-brand-700",
  success: "border border-border bg-surface text-fg",
  warning: "border border-border bg-warning/15 text-fg",
  planned:
    "border border-dashed border-border-strong bg-surface-subtle text-fg-muted",
};

const dots = {
  neutral: null,
  brand: null,
  success: "bg-success",
  warning: "bg-warning",
  planned: "bg-border-strong",
};

export function Badge({ tone, className, children }: BadgeProps) {
  const dot = dots[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-label uppercase",
        tones[tone],
        className,
      )}
    >
      {dot ? (
        <span aria-hidden="true" className={cn("size-1.5 rounded-full", dot)} />
      ) : null}
      {children}
    </span>
  );
}
