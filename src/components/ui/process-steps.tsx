import { cn } from "@/lib/utils";

type ProcessStep = {
  title: string;
  detail: string;
};

type ProcessStepsProps = {
  steps: ProcessStep[];
  onDark?: boolean;
  className?: string;
};

/**
 * Numbered 01/02/03 — ONLY for the RMA process and service/procurement
 * sequences where order genuinely matters (docs/02 §1). Never feature grids.
 */
export function ProcessSteps({ steps, onDark = false, className }: ProcessStepsProps) {
  return (
    <ol className={cn("space-y-0", className)}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={step.title} className="flex gap-5 md:gap-8">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "text-data font-mono tnum pt-0.5 font-medium",
                  onDark ? "text-fg-inverse-muted" : "text-brand-500",
                )}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-2 hidden w-px flex-1 md:block",
                    onDark ? "bg-border-dark" : "bg-border",
                  )}
                />
              ) : null}
            </div>
            <div className={cn("pb-8", isLast && "pb-0")}>
              <h3
                className={cn(
                  "text-h4 font-medium",
                  onDark ? "text-fg-inverse" : "text-fg",
                )}
              >
                {step.title}
              </h3>
              <p
                className={cn(
                  "text-body mt-1 max-w-[60ch]",
                  onDark ? "text-fg-inverse-muted" : "text-fg-muted",
                )}
              >
                {step.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
