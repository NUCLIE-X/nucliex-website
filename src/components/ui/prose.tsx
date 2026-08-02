import { cn } from "@/lib/utils";

type ProseProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Typography wrapper for MDX/long-form content. Hand-rolled instead of a
 * typography plugin so every value stays on the token scale. 68ch measure
 * per docs/02 §3.
 */
export function Prose({ className, children }: ProseProps) {
  return (
    <div
      className={cn(
        "max-w-[68ch]",
        "[&_h2]:text-h2 [&_h2]:font-display [&_h2]:text-brand-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-medium [&_h2]:scroll-mt-24",
        "[&_h3]:text-h3 [&_h3]:text-brand-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-semibold [&_h3]:scroll-mt-24",
        "[&_p]:text-body [&_p]:text-fg [&_p]:mb-5",
        "[&_a]:text-brand-500 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-600",
        "[&_strong]:font-semibold",
        "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
        "[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
        "[&_li]:text-body [&_li]:text-fg",
        "[&_blockquote]:border-brand-200 [&_blockquote]:text-fg-muted [&_blockquote]:mb-5 [&_blockquote]:border-l-2 [&_blockquote]:pl-4",
        "[&_code]:font-mono [&_code]:text-data [&_code]:bg-surface-subtle [&_code]:rounded-sm [&_code]:px-1.5 [&_code]:py-0.5",
        "[&_pre]:bg-surface-dark [&_pre]:text-fg-inverse [&_pre]:mb-5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "[&_table]:mb-5 [&_table]:w-full [&_table]:border-collapse",
        "[&_th]:border-border [&_th]:text-label [&_th]:text-fg-subtle [&_th]:border-b [&_th]:py-2 [&_th]:text-left [&_th]:uppercase",
        "[&_td]:border-border [&_td]:text-body [&_td]:border-b [&_td]:py-2",
        "[&_hr]:border-border [&_hr]:my-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
