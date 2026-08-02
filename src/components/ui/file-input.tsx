import { cn } from "@/lib/utils";

type FileInputProps = React.ComponentProps<"input">;

export function FileInput({ className, ...props }: FileInputProps) {
  return (
    <input
      type="file"
      className={cn(
        "text-body-sm text-fg-muted w-full",
        "file:bg-surface-subtle file:border-border-strong file:text-fg file:mr-4 file:h-9",
        "file:cursor-pointer file:rounded-md file:border file:px-4 file:font-medium",
        "focus:outline-none focus-visible:outline-2",
        className,
      )}
      {...props}
    />
  );
}
