"use server";

import { z } from "zod";

export type LookupState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "result"; serial: string };

const serialSchema = z
  .string()
  .trim()
  .min(4, "Enter the serial number printed on the drive label.")
  .max(64, "That doesn't look like a drive serial number.");

/**
 * v1 has no warranty database — the honest behaviour is to validate the
 * format and hand the visitor a direct route to the support team with the
 * serial attached, not to fake a lookup result.
 */
export async function lookupSerial(
  _prev: LookupState,
  formData: FormData,
): Promise<LookupState> {
  const parsed = serialSchema.safeParse(formData.get("serial"));
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Enter a serial number.",
    };
  }
  return { status: "result", serial: parsed.data };
}
