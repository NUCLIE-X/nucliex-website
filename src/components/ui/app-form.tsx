"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import type { FormState } from "@/lib/form-state";
import { idleState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";

type AppFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
  /** Button label while submitting — "Sending…" family (docs/04 §12). */
  pendingLabel: string;
  /** Fields, receiving current state for error wiring. */
  children: (state: FormState) => React.ReactNode;
};

/**
 * Owns Server Action binding, pending state, the focused error summary, and
 * the success state that REPLACES the form (docs/06 §5). Submits without
 * JavaScript — everything here is progressive enhancement.
 */
export function AppForm({ action, submitLabel, pendingLabel, children }: AppFormProps) {
  const [state, formAction] = useActionState(action, idleState);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="border-border bg-surface-subtle rounded-lg border p-8"
      >
        <CheckCircle2 size={24} strokeWidth={1.5} aria-hidden="true" className="text-success" />
        <h2 className="text-h3 text-brand-900 mt-4 font-semibold">{state.title}</h2>
        <p className="text-body text-fg-muted mt-2 max-w-[60ch]">{state.detail}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-error/40 bg-error/5 rounded-lg border p-4"
        >
          <p className="text-body text-error font-medium">
            {state.formError ?? "The form couldn't be submitted."}
          </p>
          {Object.keys(state.fieldErrors).length > 0 ? (
            <ul className="text-body-sm text-error mt-2 list-disc space-y-1 pl-5">
              {Object.entries(state.fieldErrors).map(([field, message]) => (
                <li key={field}>
                  <a href={`#field-${field}`} className="underline underline-offset-2">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {/* Honeypot — invisible to people, tempting to bots. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website-field">Website</label>
        <input
          id="website-field"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {/* Timing check — stamped client-side; empty (no-JS) skips the check. */}
      <input
        type="hidden"
        name="startedAt"
        ref={(el) => {
          if (el && !el.value) el.value = String(Date.now());
        }}
      />

      {children(state)}

      <SubmitRow submitLabel={submitLabel} pendingLabel={pendingLabel} />
    </form>
  );
}

function SubmitRow({ submitLabel, pendingLabel }: { submitLabel: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} size="lg">
      {pending ? pendingLabel : submitLabel}
    </Button>
  );
}
