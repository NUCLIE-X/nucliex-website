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
export function FormField({
  name,
  label,
  required = true,
  help,
  state,
  children,
}: FormFieldProps) {
  const error = state.status === "error" ? state.fieldErrors[name] : undefined;
  const fieldId = `field-${name}`;
  const helpId = `${fieldId}-help`;
  const errorId = `${fieldId}-error`;
  const describedBy =
    [help ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

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
      <label
        htmlFor={fieldId}
        className="mb-2 block text-body font-medium text-fg"
      >
        {label}
        {!required ? (
          <span className="font-normal text-fg-subtle"> (optional)</span>
        ) : null}
      </label>
      {control}
      {help ? (
        <p id={helpId} className="mt-2 text-body-sm text-fg-subtle">
          {help}
        </p>
      ) : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}
