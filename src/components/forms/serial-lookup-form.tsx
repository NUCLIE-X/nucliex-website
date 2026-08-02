"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { lookupSerial, type LookupState } from "@/lib/actions/serial-lookup";
import { company, isTbd } from "@/data/company";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";

const idle: LookupState = { status: "idle" };

export function SerialLookupForm() {
  const [state, formAction] = useActionState(lookupSerial, idle);

  return (
    <form action={formAction} className="max-w-xl">
      <label
        htmlFor="serial-lookup"
        className="mb-2 block text-body font-medium text-fg"
      >
        Check a serial number
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id="serial-lookup"
          name="serial"
          autoComplete="off"
          aria-describedby={
            state.status === "error" ? "serial-lookup-error" : undefined
          }
          aria-invalid={state.status === "error" ? "true" : undefined}
          className="sm:max-w-xs"
        />
        <LookupButton />
      </div>
      {state.status === "error" ? (
        <FieldError id="serial-lookup-error">{state.message}</FieldError>
      ) : null}
      {state.status === "result" ? (
        <div
          role="status"
          className="mt-4 rounded-lg border border-border bg-surface-subtle p-4"
        >
          <p className="text-body text-fg">
            Serial <span className="font-mono tnum">{state.serial}</span> noted.
            Warranty records are confirmed by the support team while the
            self-serve lookup is being built — email{" "}
            {isTbd(company.supportEmail) ? (
              <span>{company.supportEmail}</span>
            ) : (
              <a
                href={`mailto:${company.supportEmail}`}
                className="text-brand-500 underline underline-offset-2"
              >
                {company.supportEmail}
              </a>
            )}{" "}
            quoting this serial, or register the drive below so the record
            exists before you ever need it.
          </p>
        </div>
      ) : null}
    </form>
  );
}

function LookupButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="secondary" loading={pending}>
      {pending ? "Checking…" : "Check serial"}
    </Button>
  );
}
