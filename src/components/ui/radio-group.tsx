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
      <legend className="text-body text-fg mb-2 font-medium">{legend}</legend>
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        return (
          <label key={option.value} htmlFor={id} className="flex cursor-pointer items-start gap-3">
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              defaultChecked={defaultValue === option.value}
              required={required}
              className="accent-brand-500 mt-1 size-4 shrink-0"
            />
            <span>
              <span className="text-body text-fg block">{option.label}</span>
              {option.description ? (
                <span className="text-body-sm text-fg-subtle block">{option.description}</span>
              ) : null}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
