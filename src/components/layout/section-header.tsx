import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Centre only for CTA bands. */
  align?: "left" | "center";
  action?: React.ReactNode;
  /** Set when the section sits on a navy/dark tone. */
  onDark?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  action,
  onDark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 lg:mb-12",
        align === "center" && "flex flex-col items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-end justify-between gap-8",
          align === "center" && "block",
        )}
      >
        <div>
          {eyebrow ? (
            <p
              className={cn(
                "mb-3 text-label uppercase",
                onDark ? "text-fg-inverse-muted" : "text-brand-500",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h2
            className={cn(
              "font-display text-h2 font-medium",
              onDark ? "text-fg-inverse" : "text-brand-900",
            )}
          >
            {title}
          </h2>
          {lead ? (
            <p
              className={cn(
                "mt-4 max-w-[56ch] text-body-lg",
                onDark ? "text-fg-inverse-muted" : "text-fg-muted",
              )}
            >
              {lead}
            </p>
          ) : null}
        </div>
        {action ? (
          <div className="hidden shrink-0 md:block">{action}</div>
        ) : null}
      </div>
    </div>
  );
}
