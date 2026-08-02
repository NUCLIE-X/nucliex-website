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
  city: "Pune",
  state: "Maharashtra",
  country: "IN",
  addressLine: "{{TBD:address}}",
  phone: "{{TBD:phone}}",
  salesEmail: "{{TBD:email}}",
  supportEmail: "{{TBD:email}}",
  partnersEmail: "{{TBD:email}}",
  hours: "{{TBD:hours}}",
  gstin: "{{TBD:gstin}}",
  cin: "{{TBD:cin}}",
} as const;

/** True while a field still carries a {{TBD}} token — render text, not a dead link. */
export function isTbd(value: string): boolean {
  return value.includes("{{TBD");
}
