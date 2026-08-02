/**
 * Single source for header, footer, and sitemap navigation (docs/03 §2).
 * Mega-panel copy: item title + one-line descriptor (docs/04 §1).
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavColumn = {
  title: string;
  links: NavLink[];
};

export type NavItem =
  | { label: string; href: string; panel?: never }
  | { label: string; href?: never; panel: NavColumn[] };

export const headerNav: NavItem[] = [
  {
    label: "Products",
    panel: [
      {
        title: "Storage",
        links: [
          {
            label: "SATA SSDs",
            href: "/products/ssd/sata",
            description: "2.5-inch drives for laptop and desktop upgrades",
          },
          {
            label: "NVMe SSDs",
            href: "/products/ssd/nvme",
            description: "M.2 drives for gaming and workstation builds",
          },
          {
            label: "All products",
            href: "/products",
            description: "The full catalogue with specifications",
          },
        ],
      },
      {
        title: "Ahead",
        links: [
          {
            label: "Roadmap",
            href: "/products/roadmap",
            description: "Memory, external drives, and enterprise storage in planning",
          },
          {
            label: "Downloads",
            href: "/support/downloads",
            description: "Datasheets and guides for every drive",
          },
        ],
      },
    ],
  },
  {
    label: "Services",
    panel: [
      {
        title: "For your machines",
        links: [
          {
            label: "SSD & hardware upgrades",
            href: "/services/ssd-upgrades",
            description: "Laptop and desktop upgrades with data migration",
          },
          {
            label: "Repair & diagnostics",
            href: "/services/repair-diagnostics",
            description: "Component-level fault finding and repair",
          },
          {
            label: "Windows & deployment",
            href: "/services/windows-deployment",
            description: "Clean installs, imaging, and fleet rollouts",
          },
        ],
      },
      {
        title: "For your office",
        links: [
          {
            label: "Networking & CCTV",
            href: "/services/networking",
            description: "Routers, switches, cabling, and surveillance",
          },
          {
            label: "Annual maintenance",
            href: "/services/amc",
            description: "AMC contracts with stated response times",
          },
          {
            label: "All services",
            href: "/services",
            description: "Everything we deliver, grouped by category",
          },
        ],
      },
    ],
  },
  { label: "Business", href: "/business" },
  {
    label: "Support",
    panel: [
      {
        title: "When you need us",
        links: [
          {
            label: "Warranty registration",
            href: "/support/warranty",
            description: "Register once, claim without paperwork games",
          },
          {
            label: "RMA / replacement",
            href: "/support/rma",
            description: "The step-by-step process with timelines",
          },
        ],
      },
      {
        title: "Self-serve",
        links: [
          {
            label: "Downloads",
            href: "/support/downloads",
            description: "Datasheets, install guides, warranty cards",
          },
          {
            label: "FAQ",
            href: "/support/faq",
            description: "Straight answers to common questions",
          },
          {
            label: "Support hub",
            href: "/support",
            description: "All support channels and response times",
          },
        ],
      },
    ],
  },
  { label: "About", href: "/about" },
];

export const footerNav: NavColumn[] = [
  {
    title: "Products",
    links: [
      { label: "SATA SSDs", href: "/products/ssd/sata" },
      { label: "NVMe SSDs", href: "/products/ssd/nvme" },
      { label: "All products", href: "/products" },
      { label: "Roadmap", href: "/products/roadmap" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "SSD & hardware upgrades", href: "/services/ssd-upgrades" },
      { label: "Networking & CCTV", href: "/services/networking" },
      { label: "Annual maintenance", href: "/services/amc" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Warranty registration", href: "/support/warranty" },
      { label: "RMA / replacement", href: "/support/rma" },
      { label: "Downloads", href: "/support/downloads" },
      { label: "FAQ", href: "/support/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Business & enterprise", href: "/business" },
      { label: "Dealers & distributors", href: "/partners" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
  { label: "Warranty policy", href: "/warranty-policy" },
];
