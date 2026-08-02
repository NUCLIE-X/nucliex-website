import { cn } from "@/lib/utils";

type TrustPoint = {
  title: string;
  body: string;
};

type TrustPointsProps = {
  points: TrustPoint[];
  onDark?: boolean;
  className?: string;
};

/**
 * Hairline-separated list, heading + two lines each — deliberately not icon
 * cards (docs/06 §3). This is the anti-template move.
 */
export function TrustPoints({ points, onDark = false, className }: TrustPointsProps) {
  return (
    <ul
      className={cn(
        "divide-y border-y",
        onDark ? "divide-border-dark border-border-dark" : "divide-border border-border",
        className,
      )}
    >
      {points.map((point) => (
        <li key={point.title} className="grid gap-2 py-6 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-10 md:py-8">
          <h3 className={cn("text-h3 font-semibold", onDark ? "text-fg-inverse" : "text-brand-900")}>
            {point.title}
          </h3>
          <p
            className={cn(
              "text-body max-w-[60ch]",
              onDark ? "text-fg-inverse-muted" : "text-fg-muted",
            )}
          >
            {point.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
