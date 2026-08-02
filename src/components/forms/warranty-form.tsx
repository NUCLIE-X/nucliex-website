"use client";

import { warrantySchema } from "@/lib/schemas/forms";
import { company } from "@/data/company";
import { StaticForm } from "@/components/ui/static-form";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

export function WarrantyForm() {
  return (
    <StaticForm
      schema={warrantySchema}
      recipient={() => company.supportEmail}
      subject={(d) => `Warranty registration — ${d.product}, serial ${d.serialNumber}`}
      body={(d) =>
        [
          `Product: ${d.product}`,
          `Serial: ${d.serialNumber}`,
          `Purchased: ${d.purchaseDate} from ${d.seller}`,
          `Customer: ${d.name} · ${d.email} · +91 ${d.phone}`,
          "",
          "Please attach a photo or PDF of the invoice to this email if you have it —",
          "it speeds up any future claim.",
        ].join("\n")
      }
      whatsappText={(d) =>
        `Warranty registration: ${d.product}, serial ${d.serialNumber}, bought ${d.purchaseDate} from ${d.seller}. ${d.name}, +91 ${d.phone}`
      }
      submitLabel="Register warranty"
    >
      {(state) => (
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            name="serialNumber"
            label="Serial number"
            help="Printed on the drive label."
            state={state}
          >
            <Input autoComplete="off" />
          </FormField>
          <FormField name="product" label="Product" help="e.g. GREEN SSD 256 GB" state={state}>
            <Input autoComplete="off" />
          </FormField>
          <FormField name="purchaseDate" label="Purchase date" state={state}>
            <Input type="date" />
          </FormField>
          <FormField
            name="seller"
            label="Where you bought it"
            help="Shop, dealer, or marketplace."
            state={state}
          >
            <Input autoComplete="off" />
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
          <div className="flex items-end">
            <p className="text-body-sm text-fg-subtle">
              Have the invoice? Attach it to the email that opens — it speeds
              up any future claim.
            </p>
          </div>
        </div>
      )}
    </StaticForm>
  );
}
