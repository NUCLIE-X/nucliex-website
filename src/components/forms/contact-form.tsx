"use client";

import { contactSchema } from "@/lib/schemas/forms";
import { company } from "@/data/company";
import { StaticForm } from "@/components/ui/static-form";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

// Enquiry type routes the draft to the right mailbox (docs/04 §11).
const routing: Record<string, string> = {
  sales: company.salesEmail,
  services: company.salesEmail,
  support: company.supportEmail,
  partnership: company.partnersEmail,
  other: company.salesEmail,
};

const typeLabels: Record<string, string> = {
  sales: "Product / sales",
  services: "IT services",
  support: "Support",
  partnership: "Partnership",
  other: "Other",
};

type ContactFormProps = {
  /** Preselects the enquiry type, e.g. when arriving from a service page. */
  defaultEnquiryType?: "sales" | "services" | "support" | "partnership" | "other";
  /** Seeds the message, e.g. "Enquiry about: SSD & hardware upgrades". */
  defaultMessage?: string;
};

export function ContactForm({ defaultEnquiryType, defaultMessage }: ContactFormProps) {
  return (
    <StaticForm
      schema={contactSchema}
      recipient={(d) => routing[d.enquiryType] ?? company.salesEmail}
      subject={(d) => `${typeLabels[d.enquiryType]} enquiry — ${d.name} (${d.city})`}
      body={(d) =>
        [
          `Name: ${d.name}`,
          `Email: ${d.email}`,
          `Phone: +91 ${d.phone}`,
          `City: ${d.city}`,
          `Type: ${typeLabels[d.enquiryType]}`,
          "",
          d.message,
        ].join("\n")
      }
      whatsappText={(d) =>
        `${typeLabels[d.enquiryType]} enquiry from ${d.name} (${d.city}, +91 ${d.phone}): ${d.message}`
      }
      submitLabel="Send enquiry"
    >
      {(state) => (
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField name="name" label="Your name" state={state}>
            <Input autoComplete="name" />
          </FormField>
          <FormField name="email" label="Email" state={state}>
            <Input type="email" autoComplete="email" />
          </FormField>
          <FormField
            name="phone"
            label="Mobile number"
            help="10 digits — +91 is fine too."
            state={state}
          >
            <Input type="tel" autoComplete="tel" inputMode="numeric" />
          </FormField>
          <FormField name="city" label="City" state={state}>
            <Input autoComplete="address-level2" />
          </FormField>
          <div className="sm:col-span-2">
            <FormField name="enquiryType" label="What is this about?" state={state}>
              <Select defaultValue={defaultEnquiryType ?? ""}>
                <option value="" disabled>
                  Choose an enquiry type
                </option>
                <option value="sales">Product / sales</option>
                <option value="services">IT services</option>
                <option value="support">Support</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </Select>
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField name="message" label="Message" state={state}>
              <Textarea rows={5} defaultValue={defaultMessage} />
            </FormField>
          </div>
        </div>
      )}
    </StaticForm>
  );
}
