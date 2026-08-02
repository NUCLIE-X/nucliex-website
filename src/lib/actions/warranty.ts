"use server";

import type { FormState } from "@/lib/form-state";
import { warrantySchema } from "@/lib/schemas/forms";
import { guardAndParse } from "@/lib/submission-guard";
import { mailboxes, sendMail } from "@/lib/mail";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Magic-byte sniffing — never trust the extension (docs/03 §5). */
function sniffInvoice(bytes: Uint8Array): "jpg" | "png" | "pdf" | null {
  if (
    bytes.length > 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff
  )
    return "jpg";
  if (
    bytes.length > 7 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  )
    return "png";
  if (
    bytes.length > 4 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  )
    return "pdf";
  return null;
}

export async function submitWarrantyRegistration(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const guarded = await guardAndParse(warrantySchema, formData);
  if (!guarded.ok) return guarded.state;
  const data = guarded.data;

  // Registration ID derived from the serial — stable, human-quotable, no DB in v1.
  const registrationId = `WR-${data.serialNumber
    .replace(/[^A-Za-z0-9]/g, "")
    .slice(-8)
    .toUpperCase()}`;

  const success: FormState = {
    status: "success",
    title: "Warranty registered.",
    detail: `Your registration ID is ${registrationId}. We've emailed a copy to ${data.email}.`,
  };

  if (guarded.silentDrop) return success;

  // Optional invoice upload: ≤5 MB, JPEG/PNG/PDF by magic bytes. Attached to
  // the internal mail — never written to the web root (docs/03 §5).
  let attachment: { filename: string; content: Buffer } | undefined;
  const invoice = formData.get("invoice");
  if (invoice instanceof File && invoice.size > 0) {
    if (invoice.size > MAX_UPLOAD_BYTES) {
      return {
        status: "error",
        formError: "Fix the highlighted fields and submit again.",
        fieldErrors: {
          invoice:
            "The invoice file is over 5 MB. Compress it or upload a smaller scan.",
        },
      };
    }
    const bytes = new Uint8Array(await invoice.arrayBuffer());
    const kind = sniffInvoice(bytes);
    if (!kind) {
      return {
        status: "error",
        formError: "Fix the highlighted fields and submit again.",
        fieldErrors: { invoice: "Upload the invoice as a JPEG, PNG, or PDF." },
      };
    }
    attachment = {
      filename: `invoice-${registrationId}.${kind}`,
      content: Buffer.from(bytes),
    };
  }

  try {
    await sendMail({
      to: mailboxes.support,
      replyTo: data.email,
      subject: `Warranty registration ${registrationId} — ${data.product}`,
      text: [
        `Registration: ${registrationId}`,
        `Product: ${data.product}`,
        `Serial: ${data.serialNumber}`,
        `Purchased: ${data.purchaseDate} from ${data.seller}`,
        `Customer: ${data.name} · ${data.email} · +91 ${data.phone}`,
        attachment ? "Invoice attached." : "No invoice uploaded.",
      ].join("\n"),
      attachments: attachment ? [attachment] : undefined,
    });
    await sendMail({
      to: data.email,
      subject: `Your NUCLIEX warranty registration ${registrationId}`,
      text: [
        `Hi ${data.name},`,
        "",
        `Your ${data.product} (serial ${data.serialNumber}) is registered.`,
        `Registration ID: ${registrationId} — quote it if you ever need an RMA.`,
        "",
        "NUCLIEX INFOSYS, Thane",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[warranty] mail delivery failed", error);
    return {
      status: "error",
      formError:
        "We couldn't send your registration. Email support directly or try again in a few minutes.",
      fieldErrors: {},
    };
  }

  return success;
}
