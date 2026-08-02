"use client";

import { submitQuote } from "@/lib/actions/quote";
import { AppForm } from "@/components/ui/app-form";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export function QuoteForm() {
  return (
    <AppForm
      action={submitQuote}
      submitLabel="Request a quote"
      pendingLabel="Sending…"
    >
      {(state) => (
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            name="company"
            label="Company / organisation"
            state={state}
          >
            <Input autoComplete="organization" />
          </FormField>
          <FormField
            name="gstin"
            label="GSTIN"
            required={false}
            help="For GST-compliant quotes and invoicing."
            state={state}
          >
            <Input autoComplete="off" />
          </FormField>
          <FormField name="name" label="Your name" state={state}>
            <Input autoComplete="name" />
          </FormField>
          <FormField name="email" label="Work email" state={state}>
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
          <FormField name="timeline" label="When do you need it?" state={state}>
            <Select defaultValue="">
              <option value="" disabled>
                Choose a timeline
              </option>
              <option value="this-week">This week</option>
              <option value="this-month">This month</option>
              <option value="this-quarter">This quarter</option>
              <option value="exploring">Just exploring</option>
            </Select>
          </FormField>
          <div className="sm:col-span-2">
            <FormField
              name="requirements"
              label="Products and quantities"
              help="e.g. 40 × 512 GB SATA SSDs for office desktops; 5 × NVMe for workstations."
              state={state}
            >
              <Textarea rows={4} />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField
              name="message"
              label="Anything else"
              required={false}
              state={state}
            >
              <Textarea rows={3} />
            </FormField>
          </div>
        </div>
      )}
    </AppForm>
  );
}
