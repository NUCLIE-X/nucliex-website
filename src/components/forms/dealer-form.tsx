"use client";

import { dealerSchema } from "@/lib/schemas/forms";
import { company } from "@/data/company";
import { StaticForm } from "@/components/ui/static-form";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

const typeLabels: Record<string, string> = {
  retailer: "Retailer",
  distributor: "Distributor",
  "system-integrator": "System integrator",
  "online-seller": "Online seller",
};

export function DealerForm() {
  return (
    <StaticForm
      schema={dealerSchema}
      recipient={() => company.partnersEmail}
      subject={(d) => `Dealer application — ${d.businessName} (${d.city})`}
      body={(d) =>
        [
          `Business: ${d.businessName}`,
          `Type: ${typeLabels[d.businessType]}`,
          `Location: ${d.city}, ${d.state}`,
          `GSTIN: ${d.gstin}`,
          `Years in business: ${d.yearsInBusiness}`,
          `Contact: ${d.name} · ${d.email} · +91 ${d.phone}`,
          "",
          "Product interest:",
          d.productInterest,
        ].join("\n")
      }
      whatsappText={(d) =>
        `Dealer application: ${d.businessName} (${typeLabels[d.businessType]}, ${d.city}) — contact ${d.name}, +91 ${d.phone}`
      }
      submitLabel="Apply to become a partner"
    >
      {(state) => (
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField name="businessName" label="Business name" state={state}>
            <Input autoComplete="organization" />
          </FormField>
          <FormField name="businessType" label="Business type" state={state}>
            <Select defaultValue="">
              <option value="" disabled>
                Choose your business type
              </option>
              <option value="retailer">Retailer</option>
              <option value="distributor">Distributor</option>
              <option value="system-integrator">System integrator</option>
              <option value="online-seller">Online seller</option>
            </Select>
          </FormField>
          <FormField name="city" label="City" state={state}>
            <Input autoComplete="address-level2" />
          </FormField>
          <FormField name="state" label="State" state={state}>
            <Input autoComplete="address-level1" />
          </FormField>
          <FormField
            name="gstin"
            label="GSTIN"
            help="Required for dealer accounts — all partner invoicing is GST-compliant."
            state={state}
          >
            <Input autoComplete="off" />
          </FormField>
          <FormField name="yearsInBusiness" label="Years in business" state={state}>
            <Select defaultValue="">
              <option value="" disabled>
                Choose a range
              </option>
              <option value="0-2">0–2 years</option>
              <option value="3-5">3–5 years</option>
              <option value="6-10">6–10 years</option>
              <option value="10-plus">More than 10 years</option>
            </Select>
          </FormField>
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
          <div className="sm:col-span-2">
            <FormField
              name="productInterest"
              label="What do you want to stock?"
              help="Families, capacities, and rough monthly volumes if you know them."
              state={state}
            >
              <Textarea rows={4} />
            </FormField>
          </div>
        </div>
      )}
    </StaticForm>
  );
}
