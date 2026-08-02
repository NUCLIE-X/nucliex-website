import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Prose } from "@/components/ui/prose";
import { company } from "@/data/company";

// Drafted by the site builder 2026-08-02; noindex until the client's legal
// advisor signs it off (docs/09 #8).
export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How NUCLIEX INFOSYS handles personal data.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section spacing="tight" className="py-16 md:py-20" containerSize="narrow">
      <h1 className="font-display text-display-2 font-bold text-brand-900">
        Privacy policy
      </h1>
      <p className="mt-4 text-body-sm text-fg-subtle">
        Draft of 2 August 2026 — pending review by {company.legalName}&rsquo;s
        legal advisor before launch.
      </p>
      <Prose className="mt-10">
        <h2>What we collect</h2>
        <p>
          When you use the forms on this site we collect what you type into
          them: your name, email address, mobile number, and city; company
          details and GSTIN on business and dealer forms; and product details,
          serial numbers, purchase information, and any invoice you choose to
          upload when registering a warranty. We do not collect anything you
          don&rsquo;t give us.
        </p>
        <h2>How it is used</h2>
        <p>
          Submissions are used to do the thing you asked for: answer an
          enquiry, prepare a quote, process a dealer application, or register
          and service a warranty. Warranty records are kept for the life of
          the warranty. We do not sell personal data, and we do not use it for
          advertising.
        </p>
        <h2>Who processes it</h2>
        <p>
          Form submissions are delivered to our mailboxes by a transactional
          email provider, and this website is served by a hosting provider.
          Both process data only to provide those services.
        </p>
        <h2>Cookies &amp; analytics</h2>
        <p>
          This site uses cookieless analytics to understand aggregate traffic.
          It sets no advertising or tracking cookies.
        </p>
        <h2>Data retention</h2>
        <p>
          Enquiries are kept as long as needed to handle them and for
          reasonable business records. Warranty registrations are kept for the
          warranty term of the product. You can ask us to delete your data at
          any time (below).
        </p>
        <h2>Your rights under the DPDP Act, 2023</h2>
        <p>
          You may ask what personal data we hold about you, ask for it to be
          corrected, or ask for it to be erased. Write to{" "}
          <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>{" "}
          and we will respond within a reasonable time. Erasing warranty
          records may limit our ability to honour a warranty claim — we will
          tell you before proceeding.
        </p>
        <h2>Grievance officer</h2>
        <p>
          Grievance Officer: {company.founder}, {company.legalName},{" "}
          {company.addressLine}, {company.city}, {company.state} –{" "}
          {company.pin}, India. Email:{" "}
          <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>.
        </p>
        <h2>Changes</h2>
        <p>
          If this policy changes, the date at the top changes with it. We
          don&rsquo;t change what we&rsquo;ve already collected data for
          without telling you.
        </p>
      </Prose>
    </Section>
  );
}
