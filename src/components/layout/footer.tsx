import Link from "next/link";
import type { Route } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, legalNav } from "@/data/nav";
import { company, isTbd } from "@/data/company";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/layout/container";

/**
 * Five columns over a bottom bar (docs/04 §1). The postal address, tel: and
 * mailto: links are trust signals; while values are {{TBD}} they render as
 * text — no dead links.
 */
export function Footer() {
  return (
    <footer className="bg-surface-navy text-fg-inverse">
      <Container>
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={`Footer — ${column.title}`}>
              <p className="mb-4 text-label text-fg-inverse-muted uppercase">
                {column.title}
              </p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as Route}
                      className="duration-fast text-body-sm text-fg-inverse transition-colors hover:text-accent-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="mb-4 text-label text-fg-inverse-muted uppercase">
              Contact
            </p>
            <ul className="space-y-3 text-body-sm">
              <li className="flex items-start gap-2">
                <MapPin
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-fg-inverse-muted"
                />
                <span>
                  {company.addressLine}
                  <br />
                  {company.city}, {company.state} - {company.pin}, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-fg-inverse-muted"
                />
                {isTbd(company.phone) ? (
                  <span>{company.phone}</span>
                ) : (
                  <a
                    href={company.phoneHref}
                    className="duration-fast transition-colors hover:text-accent-400"
                  >
                    {company.phone}
                  </a>
                )}
              </li>
              <li className="flex items-center gap-2">
                <Mail
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-fg-inverse-muted"
                />
                {isTbd(company.salesEmail) ? (
                  <span>{company.salesEmail}</span>
                ) : (
                  <a
                    href={`mailto:${company.salesEmail}`}
                    className="duration-fast transition-colors hover:text-accent-400"
                  >
                    {company.salesEmail}
                  </a>
                )}
              </li>
              <li className="text-fg-inverse-muted">{company.hours}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-border-dark py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <Link href="/" aria-label="NUCLIEX home">
              <Logo className="h-12 w-auto" />
            </Link>
            <p className="text-body-sm text-fg-inverse-muted">
              {company.legalName} · {company.corporateSignature}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-body-sm text-fg-inverse-muted lg:items-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as Route}
                    className="duration-fast transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              © {new Date().getFullYear()} {company.legalName}. GSTIN{" "}
              {company.gstin} · CIN {company.cin}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
