import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { controlClasses } from "@/components/ui/input";

type SelectProps = React.ComponentProps<"select">;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(controlClasses, "h-12 appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={20}
        strokeWidth={1.5}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-fg-subtle"
      />
    </div>
  );
}
