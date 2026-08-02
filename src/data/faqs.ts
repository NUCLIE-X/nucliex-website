/**
 * FAQ content — grouped, rendered as accordions and emitted as FAQPage
 * JSON-LD (docs/04 §8). Answers state process honestly; unconfirmed numbers
 * stay {{TBD}} rather than plausible.
 */

export interface Faq {
  id: string;
  group: "Warranty" | "RMA & replacements" | "Products" | "Services";
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    id: "warranty-term",
    group: "Warranty",
    question: "How long is the warranty on NUCLIEX drives?",
    answer:
      "The GREEN Series carries 5 years standard, extending to 7 years with the extended registration benefit when you register the drive (T&C apply). The rule is the same for every drive we ship: the term is stated in years, in plain language, with what's covered and what voids it on the product page — not buried in a PDF.",
  },
  {
    id: "warranty-register",
    group: "Warranty",
    question: "Do I have to register to get warranty service?",
    answer:
      "Registering once at purchase makes claims faster because we already have your serial and purchase date. If you didn't register, you can still claim with your invoice — registration is a convenience, not a trap.",
  },
  {
    id: "warranty-voids",
    group: "Warranty",
    question: "What voids the warranty?",
    answer:
      "The exact conditions are published with the warranty policy ({{TBD:legal}}). Physical damage and tampering with the drive are the obvious ones; normal use inside a normal machine is exactly what the warranty is for.",
  },
  {
    id: "rma-how",
    group: "RMA & replacements",
    question: "How do I start an RMA?",
    answer:
      "Use the RMA page to raise the request with your serial number and a description of the fault. We respond with a replacement or repair decision within the stated first-response time ({{TBD:rma_hours}} hours).",
  },
  {
    id: "rma-need",
    group: "RMA & replacements",
    question: "What do I need to have ready for an RMA?",
    answer:
      "The drive's serial number, where and roughly when you bought it, and a short description of what's failing. An invoice or warranty registration speeds things up but a missing invoice doesn't end the conversation.",
  },
  {
    id: "rma-data",
    group: "RMA & replacements",
    question: "Is my data recovered as part of an RMA?",
    answer:
      "No — an RMA replaces or repairs the drive, and drives we receive are wiped as part of processing. Back up before you send anything. If you need help recovering data first, ask our services team about data migration.",
  },
  {
    id: "products-specs",
    group: "Products",
    question: "Why do some products show pending specifications?",
    answer:
      "Because we don't publish numbers we haven't verified. A drive's figures appear when validation completes, together with the conditions they were measured under.",
  },
  {
    id: "products-buy",
    group: "Products",
    question: "Can I buy directly from this site?",
    answer:
      "Not yet — the site is a catalogue with enquiry and quote forms. For purchases, request a quote and we'll take it from there with a GST invoice.",
  },
  {
    id: "services-area",
    group: "Services",
    question: "Where do you provide IT services?",
    answer:
      "On-site services cover Mira Road, Thane, and the surrounding Mumbai region. Remote support — diagnostics, software fixes, optimisation — works wherever you are.",
  },
  {
    id: "services-amc",
    group: "Services",
    question: "What does an AMC cover?",
    answer:
      "Whatever we agree it covers — workstations, network, CCTV, peripherals — with scheduled maintenance and priority response. The contract states the scope and visit schedule in plain language.",
  },
];
