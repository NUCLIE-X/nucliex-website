import { cn } from "@/lib/utils";

type RadioOption = {
  value: string;
  label: string;
  description?: string;
};

type RadioGroupProps = {
  /** Group label rendered as the fieldset legend — always visible. */
  legend: string;
  name: string;
  options: RadioOption[];
  defaultValue?: string;
  required?: boolean;
  className?: string;
};

export function RadioGroup({
  legend,
  name,
  options,
  defaultValue,
  required,
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cn("space-y-3", className)}>
      <legend className="mb-2 text-body font-medium text-fg">{legend}</legend>
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        return (
          <label
            key={option.value}
            htmlFor={id}
            className="flex cursor-pointer items-start gap-3"
          >
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              defaultChecked={defaultValue === option.value}
              required={required}
              className="mt-1 size-4 shrink-0 accent-brand-500"
            />
            <span>
              <span className="block text-body text-fg">{option.label}</span>
              {option.description ? (
                <span className="block text-body-sm text-fg-subtle">
                  {option.description}
                </span>
              ) : null}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
