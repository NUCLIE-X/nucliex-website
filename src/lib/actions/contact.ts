"use server";

import type { FormState } from "@/lib/form-state";
import { contactSchema } from "@/lib/schemas/forms";
import { guardAndParse } from "@/lib/submission-guard";
import { mailboxes, sendMail } from "@/lib/mail";

// Enquiry-type selector routes the notification to the right mailbox (docs/04 §11).
const routing: Record<string, string> = {
  sales: mailboxes.sales,
  services: mailboxes.sales,
  support: mailboxes.support,
  partnership: mailboxes.partners,
  other: mailboxes.sales,
};

const typeLabels: Record<string, string> = {
  sales: "Product / sales",
  services: "IT services",
  support: "Support",
  partnership: "Partnership",
  other: "Other",
};

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const guarded = await guardAndParse(contactSchema, formData);
  if (!guarded.ok) return guarded.state;

  const success: FormState = {
    status: "success",
    title: "Enquiry sent.",
    detail: "We reply within one working day — check your email for a copy.",
  };

  if (guarded.silentDrop) return success;
  const data = guarded.data;

  try {
    await sendMail({
      to: routing[data.enquiryType] ?? mailboxes.sales,
      replyTo: data.email,
      subject: `${typeLabels[data.enquiryType]} enquiry — ${data.name} (${data.city})`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: +91 ${data.phone}`,
        `City: ${data.city}`,
        `Type: ${typeLabels[data.enquiryType]}`,
        "",
        data.message,
      ].join("\n"),
    });
    await sendMail({
      to: data.email,
      subject: "Your enquiry to NUCLIEX",
      text: [
        `Hi ${data.name},`,
        "",
        "We received your enquiry and will reply within one working day.",
        "",
        "What you sent us:",
        data.message,
        "",
        "NUCLIEX INFOSYS, Pune",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[contact] mail delivery failed", error);
    return {
      status: "error",
      formError:
        "We couldn't send your enquiry. Email us directly or try again in a few minutes.",
      fieldErrors: {},
    };
  }

  return success;
}
