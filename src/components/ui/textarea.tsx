import { cn } from "@/lib/utils";
import { controlClasses } from "@/components/ui/input";

type TextareaProps = React.ComponentProps<"textarea">;

export function Textarea({ className, rows = 5, ...props }: TextareaProps) {
  return <textarea rows={rows} className={cn(controlClasses, "py-3", className)} {...props} />;
}
