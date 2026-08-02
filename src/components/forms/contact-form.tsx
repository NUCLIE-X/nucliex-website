"use client";

import { submitContact } from "@/lib/actions/contact";
import { AppForm } from "@/components/ui/app-form";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

type ContactFormProps = {
  /** Preselects the enquiry type, e.g. when arriving from a service page. */
  defaultEnquiryType?: "sales" | "services" | "support" | "partnership" | "other";
  /** Seeds the message, e.g. "Enquiry about: SSD & hardware upgrades". */
  defaultMessage?: string;
};

export function ContactForm({ defaultEnquiryType, defaultMessage }: ContactFormProps) {
  return (
    <AppForm action={submitContact} submitLabel="Send enquiry" pendingLabel="Sending…">
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
    </AppForm>
  );
}
