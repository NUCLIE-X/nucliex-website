"use server";

import type { FormState } from "@/lib/form-state";
import { quoteSchema } from "@/lib/schemas/forms";
import { guardAndParse } from "@/lib/submission-guard";
import { mailboxes, sendMail } from "@/lib/mail";

const timelineLabels: Record<string, string> = {
  "this-week": "This week",
  "this-month": "This month",
  "this-quarter": "This quarter",
  exploring: "Just exploring",
};

export async function submitQuote(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const guarded = await guardAndParse(quoteSchema, formData);
  if (!guarded.ok) return guarded.state;

  const success: FormState = {
    status: "success",
    title: "Quote request sent.",
    detail:
      "We reply within one working day — check your email for a copy of what you sent us.",
  };

  if (guarded.silentDrop) return success;
  const data = guarded.data;

  try {
    await sendMail({
      to: mailboxes.sales,
      replyTo: data.email,
      subject: `Quote request — ${data.company}`,
      text: [
        `Company: ${data.company}`,
        data.gstin ? `GSTIN: ${data.gstin}` : "GSTIN: not provided",
        `Contact: ${data.name} · ${data.email} · +91 ${data.phone}`,
        `Timeline: ${timelineLabels[data.timeline]}`,
        "",
        "Requirements:",
        data.requirements,
        data.message ? `\nMessage:\n${data.message}` : "",
      ].join("\n"),
    });
    await sendMail({
      to: data.email,
      subject: "Your NUCLIEX quote request",
      text: [
        `Hi ${data.name},`,
        "",
        "We received your quote request and will reply within one working day.",
        "",
        "What you sent us:",
        data.requirements,
        "",
        "NUCLIEX INFOSYS, Thane",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[quote] mail delivery failed", error);
    return {
      status: "error",
      formError:
        "We couldn't send your request. Email us directly or try again in a few minutes.",
      fieldErrors: {},
    };
  }

  return success;
}
