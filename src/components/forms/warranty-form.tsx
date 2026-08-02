"use client";

import { submitWarrantyRegistration } from "@/lib/actions/warranty";
import { AppForm } from "@/components/ui/app-form";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { FileInput } from "@/components/ui/file-input";

export function WarrantyForm() {
  return (
    <AppForm
      action={submitWarrantyRegistration}
      submitLabel="Register warranty"
      pendingLabel="Registering…"
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
          <FormField
            name="product"
            label="Product"
            help="e.g. GREEN SSD 256 GB"
            state={state}
          >
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
          <FormField
            name="invoice"
            label="Invoice"
            required={false}
            help="JPEG, PNG, or PDF, up to 5 MB. Speeds up any future claim."
            state={state}
          >
            <FileInput accept="image/jpeg,image/png,application/pdf" />
          </FormField>
        </div>
      )}
    </AppForm>
  );
}
