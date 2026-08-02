/**
 * Single source for company identity + NAP — used by the footer, contact page,
 * and JSON-LD (docs/03 §2). Values still awaiting the client are literal
 * {{TBD:…}} tokens tracked in docs/09-OPEN-QUESTIONS.md. NAP must eventually
 * match the Google Business Profile character for character.
 */
export const company = {
  legalName: "NUCLIEX INFOSYS",
  brand: "NUCLIEX",
  corporateSignature: "Driven by Expertise",
  productTagline: "Powering Reliable Technology",
  founder: "Ramjit J. Mourya",
  // Registered address confirmed by the client 2026-08-02. NOTE: the original
  // brief said Pune; the real base is Mira Road, Thane — docs/09 tracks the
  // founding-city question left open by this.
  city: "Mira Road, Thane",
  state: "Maharashtra",
  pin: "401107",
  country: "IN",
  addressLine: "A2, Marble Arch, Lodha Road, Naya Nagar",
  // Phone + mailboxes confirmed by the client 2026-08-02 (packaging + chat):
  // ram@, support@, sales@, accounts@ @nucliex.in · +91 9167862127.
  phone: "+91 9167862127",
  phoneHref: "tel:+919167862127",
  salesEmail: "sales@nucliex.in",
  supportEmail: "support@nucliex.in",
  // No partners@ mailbox exists yet — partner enquiries route to sales.
  partnersEmail: "sales@nucliex.in",
  // Default set by builder pending client confirmation (docs/09 #6).
  hours: "Mon–Sat, 10 am–7 pm IST",
  /** Stated support commitment — first response within this window (docs/09 #5). */
  rmaResponseHours: 48,
  // GSTIN from the client's GST REG-06 certificate (2026-08-02).
  gstin: "27IAIPM5293K1ZX",
  // PAN inside the GSTIN marks a proprietorship — a CIN likely doesn't
  // exist for this entity; confirm before ever adding one (docs/09 #7).
  cin: "{{TBD:cin}}",
} as const;

/** True while a field still carries a {{TBD}} token — render text, not a dead link. */
export function isTbd(value: string): boolean {
  return value.includes("{{TBD");
}
