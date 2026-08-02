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
              <p className="text-label text-fg-inverse-muted mb-4 uppercase">{column.title}</p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as Route}
                      className="text-body-sm text-fg-inverse hover:text-accent-400 transition-colors duration-fast"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="text-label text-fg-inverse-muted mb-4 uppercase">Contact</p>
            <ul className="text-body-sm space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} strokeWidth={1.5} aria-hidden="true" className="text-fg-inverse-muted mt-1 shrink-0" />
                <span>
                  {company.addressLine}
                  <br />
                  {company.city}, {company.state}, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} strokeWidth={1.5} aria-hidden="true" className="text-fg-inverse-muted shrink-0" />
                {isTbd(company.phone) ? (
                  <span>{company.phone}</span>
                ) : (
                  <a href={`tel:${company.phone}`} className="hover:text-accent-400 transition-colors duration-fast">
                    {company.phone}
                  </a>
                )}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} strokeWidth={1.5} aria-hidden="true" className="text-fg-inverse-muted shrink-0" />
                {isTbd(company.salesEmail) ? (
                  <span>{company.salesEmail}</span>
                ) : (
                  <a href={`mailto:${company.salesEmail}`} className="hover:text-accent-400 transition-colors duration-fast">
                    {company.salesEmail}
                  </a>
                )}
              </li>
              <li className="text-fg-inverse-muted">{company.hours}</li>
            </ul>
          </div>
        </div>

        <div className="border-border-dark flex flex-col gap-6 border-t py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <Link href="/" aria-label="NUCLIEX home">
              <Logo variant="white" className="h-12 w-auto" />
            </Link>
            <p className="text-body-sm text-fg-inverse-muted">
              {company.legalName} · {company.corporateSignature}
            </p>
          </div>
          <div className="text-body-sm text-fg-inverse-muted flex flex-col gap-2 lg:items-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as Route}
                    className="hover:text-accent-400 transition-colors duration-fast"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              © {new Date().getFullYear()} {company.legalName}. GSTIN {company.gstin} · CIN {company.cin}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
