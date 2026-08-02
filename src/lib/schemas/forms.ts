import { z } from "zod";
import {
  gstin,
  indianMobile,
  requiredEmail,
  requiredMessage,
  requiredName,
} from "@/lib/schemas/shared";

/** Business & bulk quote — docs/03 §3, notifies sales@. */
export const quoteSchema = z.object({
  company: z.string().trim().min(2, "Enter your company or organisation name."),
  gstin: gstin.optional().or(z.literal("").transform(() => undefined)),
  name: requiredName,
  email: requiredEmail,
  phone: indianMobile,
  requirements: z
    .string()
    .trim()
    .min(10, "List the products and rough quantities you need."),
  timeline: z.enum(["this-week", "this-month", "this-quarter", "exploring"], {
    error: "Choose a timeline.",
  }),
  message: z.string().trim().max(5000).optional(),
});

/** Dealer & distributor application — docs/03 §3, notifies partners@. */
export const dealerSchema = z.object({
  businessName: z.string().trim().min(2, "Enter your business name."),
  businessType: z.enum(["retailer", "distributor", "system-integrator", "online-seller"], {
    error: "Choose your business type.",
  }),
  city: z.string().trim().min(2, "Enter your city."),
  state: z.string().trim().min(2, "Enter your state."),
  gstin,
  yearsInBusiness: z.enum(["0-2", "3-5", "6-10", "10-plus"], {
    error: "Choose how long you've been in business.",
  }),
  name: requiredName,
  email: requiredEmail,
  phone: indianMobile,
  productInterest: requiredMessage,
});

/** General / sales enquiry — docs/03 §3, routed by enquiry type. */
export const contactSchema = z.object({
  name: requiredName,
  email: requiredEmail,
  phone: indianMobile,
  city: z.string().trim().min(2, "Enter your city."),
  enquiryType: z.enum(["sales", "services", "support", "partnership", "other"], {
    error: "Choose an enquiry type.",
  }),
  message: requiredMessage,
});

/** Warranty registration — docs/03 §3, notifies support@. Invoice optional. */
export const warrantySchema = z.object({
  serialNumber: z
    .string()
    .trim()
    .min(4, "Enter the serial number printed on the drive label.")
    .max(64, "That doesn't look like a drive serial number."),
  product: z.string().trim().min(2, "Enter the product name, e.g. NX-500."),
  purchaseDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter the purchase date.")
    .refine((value) => {
      const date = new Date(`${value}T00:00:00`);
      return !Number.isNaN(date.valueOf()) && date.valueOf() <= Date.now();
    }, "The purchase date can't be in the future."),
  seller: z.string().trim().min(2, "Enter where you bought the drive."),
  name: requiredName,
  email: requiredEmail,
  phone: indianMobile,
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type DealerInput = z.infer<typeof dealerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type WarrantyInput = z.infer<typeof warrantySchema>;
