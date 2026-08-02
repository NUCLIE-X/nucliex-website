"use client";

import { useSearchParams } from "next/navigation";
import { getService } from "@/data/services";
import { ContactForm } from "@/components/forms/contact-form";

/** STATIC EXPORT MODE: ?service= pre-fill read client-side. */
export function ContactFormFromParams() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get("service");
  const service = serviceSlug ? getService(serviceSlug) : undefined;

  return (
    <ContactForm
      defaultEnquiryType={service ? "services" : undefined}
      defaultMessage={service ? `Enquiry about: ${service.name}\n\n` : undefined}
      key={service?.slug ?? "none"}
    />
  );
}
