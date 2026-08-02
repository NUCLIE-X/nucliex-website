import { cn } from "@/lib/utils";

type CheckboxProps = React.ComponentProps<"input"> & {
  label: string;
  /** Optional second line under the label. */
  description?: string;
};

/**
 * Native checkbox — accent-color keeps it accessible for free; the visible
 * label is part of the hit area.
 */
export function Checkbox({ label, description, className, id, ...props }: CheckboxProps) {
  const inputId = id ?? `checkbox-${props.name}-${String(props.value ?? label)}`;
  return (
    <label htmlFor={inputId} className={cn("flex cursor-pointer items-start gap-3", className)}>
      <input
        type="checkbox"
        id={inputId}
        className="accent-brand-500 mt-1 size-4 shrink-0"
        {...props}
      />
      <span>
        <span className="text-body text-fg block">{label}</span>
        {description ? (
          <span className="text-body-sm text-fg-subtle block">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
