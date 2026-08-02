"use client";

import { quoteSchema } from "@/lib/schemas/forms";
import { company } from "@/data/company";
import { StaticForm } from "@/components/ui/static-form";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

const timelineLabels: Record<string, string> = {
  "this-week": "This week",
  "this-month": "This month",
  "this-quarter": "This quarter",
  exploring: "Just exploring",
};

export function QuoteForm() {
  return (
    <StaticForm
      schema={quoteSchema}
      recipient={() => company.salesEmail}
      subject={(d) => `Quote request — ${d.company}`}
      body={(d) =>
        [
          `Company: ${d.company}`,
          d.gstin ? `GSTIN: ${d.gstin}` : "GSTIN: not provided",
          `Contact: ${d.name} · ${d.email} · +91 ${d.phone}`,
          `Timeline: ${timelineLabels[d.timeline]}`,
          "",
          "Requirements:",
          d.requirements,
          d.message ? `\nMessage:\n${d.message}` : "",
        ].join("\n")
      }
      whatsappText={(d) =>
        `Quote request from ${d.company} (${d.name}, +91 ${d.phone}): ${d.requirements} — timeline ${timelineLabels[d.timeline]}`
      }
      submitLabel="Request a quote"
    >
      {(state) => (
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField name="company" label="Company / organisation" state={state}>
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
              help="e.g. 40 × 256 GB GREEN SSDs for office desktops."
              state={state}
            >
              <Textarea rows={4} />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField name="message" label="Anything else" required={false} state={state}>
              <Textarea rows={3} />
            </FormField>
          </div>
        </div>
      )}
    </StaticForm>
  );
}
