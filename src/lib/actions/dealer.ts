"use server";

import type { FormState } from "@/lib/form-state";
import { dealerSchema } from "@/lib/schemas/forms";
import { guardAndParse } from "@/lib/submission-guard";
import { mailboxes, sendMail } from "@/lib/mail";

const typeLabels: Record<string, string> = {
  retailer: "Retailer",
  distributor: "Distributor",
  "system-integrator": "System integrator",
  "online-seller": "Online seller",
};

export async function submitDealerApplication(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const guarded = await guardAndParse(dealerSchema, formData);
  if (!guarded.ok) return guarded.state;

  const success: FormState = {
    status: "success",
    title: "Application received.",
    detail: "Our partner team will be in touch within three working days.",
  };

  if (guarded.silentDrop) return success;
  const data = guarded.data;

  try {
    await sendMail({
      to: mailboxes.partners,
      replyTo: data.email,
      subject: `Dealer application — ${data.businessName} (${data.city})`,
      text: [
        `Business: ${data.businessName}`,
        `Type: ${typeLabels[data.businessType]}`,
        `Location: ${data.city}, ${data.state}`,
        `GSTIN: ${data.gstin}`,
        `Years in business: ${data.yearsInBusiness}`,
        `Contact: ${data.name} · ${data.email} · +91 ${data.phone}`,
        "",
        "Product interest:",
        data.productInterest,
      ].join("\n"),
    });
    await sendMail({
      to: data.email,
      subject: "Your NUCLIEX dealer application",
      text: [
        `Hi ${data.name},`,
        "",
        "We received your dealer application for " + data.businessName + ".",
        "Our partner team reviews applications and will be in touch within three working days.",
        "",
        "NUCLIEX INFOSYS, Pune",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[dealer] mail delivery failed", error);
    return {
      status: "error",
      formError:
        "We couldn't send your application. Email us directly or try again in a few minutes.",
      fieldErrors: {},
    };
  }

  return success;
}
