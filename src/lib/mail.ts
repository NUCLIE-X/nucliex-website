import { Resend } from "resend";
import { env, mailConfigured } from "@/lib/env";

type MailAttachment = { filename: string; content: Buffer };

type MailInput = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

/**
 * One notification to the internal address, one acknowledgement to the user
 * (docs/03 §3). In development without keys, submissions are logged so the
 * flow stays testable; production deploys refuse to build unconfigured
 * (src/lib/env.ts).
 */
export async function sendMail(input: MailInput): Promise<void> {
  if (!mailConfigured) {
    console.warn(`[mail:dev] would send "${input.subject}" to ${input.to}\n${input.text}`);
    return;
  }
  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.MAIL_FROM as string,
    to: input.to,
    subject: input.subject,
    text: input.text,
    replyTo: input.replyTo,
    attachments: input.attachments?.map((a) => ({ filename: a.filename, content: a.content })),
  });
  if (error) {
    throw new Error(`Resend rejected the email: ${error.message}`);
  }
}

export const mailboxes = {
  sales: env.MAIL_TO_SALES ?? "sales@nucliex.example",
  support: env.MAIL_TO_SUPPORT ?? "support@nucliex.example",
  partners: env.MAIL_TO_PARTNERS ?? "partners@nucliex.example",
};
