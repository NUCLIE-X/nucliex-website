"use client";

import { useState } from "react";
import { z } from "zod";
import { company } from "@/data/company";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";

const serialSchema = z
  .string()
  .trim()
  .min(4, "Enter the serial number printed on the drive label.")
  .max(64, "That doesn't look like a drive serial number.");

type LookupState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "result"; serial: string };

/**
 * STATIC EXPORT MODE: validates the format client-side and hands the visitor
 * a direct route to support — no fake database results.
 */
export function SerialLookupForm() {
  const [state, setState] = useState<LookupState>({ status: "idle" });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const serial = new FormData(event.currentTarget).get("serial");
    const parsed = serialSchema.safeParse(serial);
    if (!parsed.success) {
      setState({
        status: "error",
        message: parsed.error.issues[0]?.message ?? "Enter a serial number.",
      });
      return;
    }
    setState({ status: "result", serial: parsed.data });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl">
      <label htmlFor="serial-lookup" className="mb-2 block text-body font-medium text-fg">
        Check a serial number
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id="serial-lookup"
          name="serial"
          autoComplete="off"
          aria-describedby={state.status === "error" ? "serial-lookup-error" : undefined}
          aria-invalid={state.status === "error" ? "true" : undefined}
          className="sm:max-w-xs"
        />
        <Button type="submit" variant="secondary">
          Check serial
        </Button>
      </div>
      {state.status === "error" ? (
        <FieldError id="serial-lookup-error">{state.message}</FieldError>
      ) : null}
      {state.status === "result" ? (
        <div role="status" className="mt-4 rounded-lg border border-border bg-surface-subtle p-4">
          <p className="text-body text-fg">
            Serial <span className="font-mono tnum">{state.serial}</span> noted.
            Warranty records are confirmed by the support team while the
            self-serve lookup is being built — email{" "}
            <a
              href={`mailto:${company.supportEmail}?subject=${encodeURIComponent(
                `Warranty check — serial ${state.serial}`,
              )}`}
              className="text-brand-500 underline underline-offset-2"
            >
              {company.supportEmail}
            </a>{" "}
            quoting this serial, or register the drive so the record exists
            before you ever need it.
          </p>
        </div>
      ) : null}
    </form>
  );
}
