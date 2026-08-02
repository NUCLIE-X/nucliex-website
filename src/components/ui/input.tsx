import { cn } from "@/lib/utils";

// Shared control chrome — docs/02 §5. Focus swaps the global outline for the
// documented border + soft accent ring; error state keys off aria-invalid.
export const controlClasses =
  "bg-surface border-border text-fg placeholder:text-fg-subtle w-full rounded-sm border px-4 " +
  "focus:outline-none focus:border-brand-500 focus:ring-3 focus:ring-accent-500/25 " +
  "aria-invalid:border-error disabled:bg-surface-subtle disabled:text-fg-subtle";

type InputProps = React.ComponentProps<"input">;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(controlClasses, "h-12", className)} {...props} />;
}
