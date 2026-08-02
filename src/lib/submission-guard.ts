import { headers } from "next/headers";
import { z, type ZodType } from "zod";
import type { FormState } from "@/lib/form-state";

/**
 * Shared protections for every form action (docs/03 §3):
 * honeypot + timestamp check, and a 5-per-10-minutes IP rate limit.
 * Best-effort in-memory limiter — acceptable for v1 enquiry volumes; swap
 * for a durable store if abuse appears.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

/** Bot heuristics: filled honeypot, or a sub-2s submit when JS stamped the form. */
function isSpam(formData: FormData): boolean {
  if (String(formData.get("website") ?? "").length > 0) return true;
  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 2000) return true;
  return false;
}

type GuardResult<T> =
  | { ok: true; data: T; silentDrop: false }
  | { ok: true; data: T; silentDrop: true }
  | { ok: false; state: FormState };

export async function guardAndParse<S extends ZodType>(
  schema: S,
  formData: FormData,
): Promise<GuardResult<z.output<S>>> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return {
      ok: false,
      state: {
        status: "error",
        formError:
          "Too many submissions from this connection. Wait ten minutes and try again, or email us directly.",
        fieldErrors: {},
      },
    };
  }

  const raw: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "website" || key === "startedAt" || key.startsWith("$")) continue;
    if (typeof value === "string") raw[key] = value;
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    const fieldErrors: Record<string, string> = {};
    for (const [field, messages] of Object.entries(flat.fieldErrors)) {
      const list = messages as string[] | undefined;
      if (list?.[0]) fieldErrors[field] = list[0];
    }
    return {
      ok: false,
      state: {
        status: "error",
        formError: "Fix the highlighted fields and submit again.",
        fieldErrors,
      },
    };
  }

  // Bots get a silent accept — no error to learn from, nothing sent.
  return { ok: true, data: parsed.data, silentDrop: isSpam(formData) };
}
