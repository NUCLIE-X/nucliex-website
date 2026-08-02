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
export function Checkbox({
  label,
  description,
  className,
  id,
  ...props
}: CheckboxProps) {
  const inputId =
    id ?? `checkbox-${props.name}-${String(props.value ?? label)}`;
  return (
    <label
      htmlFor={inputId}
      className={cn("flex cursor-pointer items-start gap-3", className)}
    >
      <input
        type="checkbox"
        id={inputId}
        className="mt-1 size-4 shrink-0 accent-brand-500"
        {...props}
      />
      <span>
        <span className="block text-body text-fg">{label}</span>
        {description ? (
          <span className="block text-body-sm text-fg-subtle">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
