import { cn } from "@/lib/utils";

type FileInputProps = React.ComponentProps<"input">;

export function FileInput({ className, ...props }: FileInputProps) {
  return (
    <input
      type="file"
      className={cn(
        "w-full text-body-sm text-fg-muted",
        "file:mr-4 file:h-9 file:border-border-strong file:bg-surface-subtle file:text-fg",
        "file:cursor-pointer file:rounded-md file:border file:px-4 file:font-medium",
        "focus:outline-none focus-visible:outline-2",
        className,
      )}
      {...props}
    />
  );
}
