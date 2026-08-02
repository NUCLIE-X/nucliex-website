"use client";

import { useRef, useState } from "react";
import { z, type ZodType } from "zod";
import { Copy, Mail, MessageCircle } from "lucide-react";
import type { FormState } from "@/lib/form-state";
import { company } from "@/data/company";
import { Button } from "@/components/ui/button";

type Compose = {
  mailto: string;
  whatsapp?: string;
  recipient: string;
  subject: string;
  bodyText: string;
};

type StaticFormProps<S extends ZodType> = {
  schema: S;
  /** Destination mailbox — may depend on the submitted data. */
  recipient: (data: z.output<S>) => string;
  subject: (data: z.output<S>) => string;
  body: (data: z.output<S>) => string;
  /** Compact message for WhatsApp; omit to hide the WhatsApp option. */
  whatsappText?: (data: z.output<S>) => string;
  submitLabel: string;
  /** Fields, receiving current state for error wiring. */
  children: (state: FormState) => React.ReactNode;
};

/**
 * STATIC EXPORT MODE form wrapper: validates client-side with the same zod
 * schemas as the server actions, then opens a prefilled email draft (and
 * offers WhatsApp) — enquiries reach the right mailbox with no server.
 * Swap back to AppForm + src/lib/actions when full mode returns.
 */
export function StaticForm<S extends ZodType>({
  schema,
  recipient,
  subject,
  body,
  whatsappText,
  submitLabel,
  children,
}: StaticFormProps<S>) {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [compose, setCompose] = useState<Compose | null>(null);
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const raw: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") raw[key] = value;
    });

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const flat = z.flattenError(parsed.error);
      const fieldErrors: Record<string, string> = {};
      for (const [field, messages] of Object.entries(flat.fieldErrors)) {
        const list = messages as string[] | undefined;
        if (list?.[0]) fieldErrors[field] = list[0];
      }
      setState({
        status: "error",
        formError: "Fix the highlighted fields and submit again.",
        fieldErrors,
      });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const data = parsed.data;
    const to = recipient(data);
    const subj = subject(data);
    const bodyText = body(data);
    const next: Compose = {
      recipient: to,
      subject: subj,
      bodyText,
      mailto: `mailto:${to}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(bodyText)}`,
      whatsapp: whatsappText
        ? `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappText(data))}`
        : undefined,
    };
    setCompose(next);
    setState({ status: "idle" });
    // Open the draft immediately; the panel below covers blocked handlers.
    window.location.href = next.mailto;
  }

  async function copyDetails() {
    if (!compose) return;
    try {
      await navigator.clipboard.writeText(
        `To: ${compose.recipient}\nSubject: ${compose.subject}\n\n${compose.bodyText}`,
      );
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (compose) {
    return (
      <div role="status" className="rounded-lg border border-border bg-surface-subtle p-8">
        <h2 className="text-h3 font-semibold text-brand-900">
          One step left — press Send.
        </h2>
        <p className="mt-2 max-w-[60ch] text-body text-fg-muted">
          Your email app should have opened with everything filled in,
          addressed to {compose.recipient}. Press Send there and it&rsquo;s
          done. Nothing opened? Use one of these instead:
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href={compose.mailto} icon={Mail}>
            Open email draft
          </Button>
          {compose.whatsapp ? (
            <Button href={compose.whatsapp} variant="secondary" icon={MessageCircle}>
              Send on WhatsApp
            </Button>
          ) : null}
          <Button variant="ghost" icon={Copy} onClick={copyDetails}>
            {copied ? "Copied" : "Copy the details"}
          </Button>
        </div>
        <details className="mt-6">
          <summary className="cursor-pointer text-body-sm text-fg-subtle">
            What will be sent
          </summary>
          <pre className="mt-3 max-w-full overflow-x-auto rounded-md bg-surface p-4 text-data font-mono whitespace-pre-wrap">
            {compose.bodyText}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {state.status === "error" ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-error/40 bg-error/5 p-4"
        >
          <p className="text-body font-medium text-error">
            {state.formError ?? "The form couldn't be submitted."}
          </p>
          {Object.keys(state.fieldErrors).length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-body-sm text-error">
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

      {children(state)}

      <Button type="submit" size="lg">
        {submitLabel}
      </Button>
    </form>
  );
}
