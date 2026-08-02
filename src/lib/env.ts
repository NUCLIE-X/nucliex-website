import { z } from "zod";

/**
 * Environment contract — keep in sync with .env.example.
 *
 * Mail keys are optional in development so the site builds and runs without
 * secrets; `requireMailConfig()` is what form actions call, so a missing key
 * degrades to a clear submit-time error instead of a crash. On a production
 * Vercel deploy a missing mail config fails the build immediately — a contact
 * site that silently drops enquiries is worse than one that fails to deploy.
 */
const schema = z.object({
  // Domain confirmed from retail packaging: www.nucliex.in (docs/09 #9).
  NEXT_PUBLIC_SITE_URL: z.url().default("https://www.nucliex.in"),
  RESEND_API_KEY: z.string().min(1).optional(),
  MAIL_TO_SALES: z.email().optional(),
  MAIL_TO_SUPPORT: z.email().optional(),
  MAIL_TO_PARTNERS: z.email().optional(),
  MAIL_FROM: z.string().min(1).optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${JSON.stringify(z.treeifyError(parsed.error), null, 2)}`,
  );
}

export const env = parsed.data;

export const mailConfigured = Boolean(
  env.RESEND_API_KEY &&
  env.MAIL_FROM &&
  env.MAIL_TO_SALES &&
  env.MAIL_TO_SUPPORT &&
  env.MAIL_TO_PARTNERS,
);

// STATIC EXPORT MODE: no server-side mail, so the production mail guard is
// suspended. Reinstate the hard VERCEL_ENV throw when switching back to the
// full server mode (see git history of this file).
