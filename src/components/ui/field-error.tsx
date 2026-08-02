type FieldErrorProps = {
  /** Ties the message to its control via aria-describedby on the control. */
  id: string;
  children?: React.ReactNode;
};

/**
 * Error copy states what happened and what to do (CLAUDE.md §6) —
 * "Enter a valid 10-digit mobile number.", never "Invalid input".
 */
export function FieldError({ id, children }: FieldErrorProps) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="text-body-sm text-error mt-2">
      {children}
    </p>
  );
}
