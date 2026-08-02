import { z } from "zod";

/** India-aware validators (docs/03 §3). Error copy states what to do. */

export const indianMobile = z
  .string()
  .trim()
  .transform((value) => value.replace(/^\+91[\s-]?/, "").replace(/[\s-]/g, ""))
  .pipe(
    z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),
  );

export const gstin = z
  .string()
  .trim()
  .toUpperCase()
  .regex(
    /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/,
    "Enter a valid 15-character GSTIN, e.g. 27ABCDE1234F1Z5.",
  );

export const pinCode = z
  .string()
  .trim()
  .regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit PIN code.");

export const requiredName = z
  .string()
  .trim()
  .min(2, "Enter your full name.")
  .max(120, "Keep the name under 120 characters.");

export const requiredEmail = z
  .string()
  .trim()
  .pipe(z.email("Enter a valid email address, e.g. name@company.in."));

export const requiredMessage = z
  .string()
  .trim()
  .min(10, "Tell us a little more — at least a sentence.")
  .max(5000, "Keep the message under 5,000 characters.");
