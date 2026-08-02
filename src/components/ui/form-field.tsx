import { cloneElement, isValidElement } from "react";
import { FieldError } from "@/components/ui/field-error";
import type { FormState } from "@/lib/form-state";

type FormFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  help?: string;
  state: FormState;
  /** A single form control — id/aria wiring is injected here. */
  children: React.ReactElement;
};

type InjectedProps = {
  id: string;
  name: string;
  required?: boolean;
  "aria-invalid"?: "true";
  "aria-describedby"?: string;
};

/**
 * Visible label above the control — never placeholder-as-label (docs/06 §5).
 * Errors link via aria-describedby and render with role=alert.
 */
export function FormField({ name, label, required = true, help, state, children }: FormFieldProps) {
  const error = state.status === "error" ? state.fieldErrors[name] : undefined;
  const fieldId = `field-${name}`;
  const helpId = `${fieldId}-help`;
  const errorId = `${fieldId}-error`;
  const describedBy =
    [help ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  const control = isValidElement(children)
    ? cloneElement(children as React.ReactElement<InjectedProps>, {
        id: fieldId,
        name,
        required,
        "aria-invalid": error ? ("true" as const) : undefined,
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div>
      <label htmlFor={fieldId} className="text-body text-fg mb-2 block font-medium">
        {label}
        {!required ? <span className="text-fg-subtle font-normal"> (optional)</span> : null}
      </label>
      {control}
      {help ? (
        <p id={helpId} className="text-body-sm text-fg-subtle mt-2">
          {help}
        </p>
      ) : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}
