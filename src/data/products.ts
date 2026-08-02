/**
 * Product catalogue — typed local modules per docs/03-ARCHITECTURE.md §2.
 * Every field must be real: unknown values carry literal {{TBD:…}} tokens
 * tracked in docs/09-OPEN-QUESTIONS.md.
 *
 * ⚠️ The catalogue below is PROVISIONAL. "NX-500" is the working model name
 * used throughout /docs for design purposes; the real product list is open
 * question #2 ({{TBD:products}}). Nothing here may move to status
 * "available" until the client confirms models, capacities, and specs.
 */

export type ProductStatus = "available" | "coming-soon" | "planned";

export type ProductFamily =
  "sata-ssd" | "nvme-ssd" | "memory" | "external" | "enterprise" | "accessory";

export type SpecGroup =
  "performance" | "endurance" | "physical" | "compatibility" | "warranty";

export interface SpecRow {
  label: string; // "Sequential read"
  value: string; // "550 MB/s" — string, not number: units matter
  group: SpecGroup;
  note?: string; // measured-conditions footnote
}

export interface Product {
  slug: string; // "nx-500-sata-ssd"
  name: string; // "NX-500"
  family: ProductFamily;
  status: ProductStatus;
  tagline: string; // one line, max 80 chars
  summary: string; // 2–3 sentences
  capacities: string[]; // ["128 GB","256 GB"] — empty until confirmed
  formFactor: string;
  interface: string;
  /** The four figures shown in the SpecRail. Exactly four. */
  highlights: { value: string; label: string; note?: string }[];
  specs: SpecRow[];
  useCases: string[];
  warrantyYears: number | null; // null → renders {{TBD}}
  images: { src: string; alt: string }[];
  documents: {
    title: string;
    href: string;
    type: "datasheet" | "guide" | "warranty";
  }[];
  seo: { title: string; description: string };
}

export const specGroupOrder: SpecGroup[] = [
  "performance",
  "endurance",
  "physical",
  "compatibility",
  "warranty",
];

export const specGroupLabels: Record<SpecGroup, string> = {
  performance: "Performance",
  endurance: "Endurance & reliability",
  physical: "Physical",
  compatibility: "Compatibility",
  warranty: "Warranty",
};

export const familyLabels: Record<ProductFamily, string> = {
  "sata-ssd": "SATA SSD",
  "nvme-ssd": "NVMe SSD",
  memory: "Memory",
  external: "External storage",
  enterprise: "Enterprise",
  accessory: "Accessory",
};

export const products: Product[] = [
  {
    slug: "nx-500-sata-ssd",
    name: "NX-500",
    family: "sata-ssd",
    status: "coming-soon",
    tagline: "A dependable SATA upgrade for the machines people actually use.",
    summary:
      "The NX-500 is the first drive in the NUCLIEX SATA line — built for laptop and desktop upgrades where reliability matters more than headline numbers. Full specifications are published once validation completes.",
    capacities: [], // {{TBD:products}} — capacity options pending confirmation
    formFactor: "2.5-inch",
    interface: "SATA III",
    highlights: [
      { value: "{{TBD:specs}}", label: "Seq. read" },
      { value: "{{TBD:specs}}", label: "Seq. write" },
      { value: "{{TBD:specs}}", label: "TBW" },
      { value: "{{TBD:warranty_years}} YR", label: "Warranty" },
    ],
    specs: [], // {{TBD:specs}} — published only after validation, never invented
    useCases: ["Laptop upgrade", "Office desktop fleet", "Everyday PC build"],
    warrantyYears: null,
    images: [],
    documents: [], // {{TBD:documents}}
    seo: {
      title: "NX-500 SATA SSD",
      description:
        "The NX-500 2.5-inch SATA SSD from NUCLIEX — full specifications, warranty terms, and datasheet published after validation.",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/**
 * Families the company currently focuses on (confirmed in docs/05 §1).
 * The homepage shows one card per family — never padded to three.
 */
export const activeFamilies = [
  {
    key: "sata-ssd" as ProductFamily,
    name: "SATA SSDs",
    href: "/products/ssd/sata",
    descriptor:
      "2.5-inch drives that give working laptops and desktops a faster second life.",
    frameLabel: "SATA SSD family",
  },
  {
    key: "nvme-ssd" as ProductFamily,
    name: "NVMe SSDs",
    href: "/products/ssd/nvme",
    descriptor:
      "M.2 drives for gaming, content creation, and workstation builds.",
    frameLabel: "NVMe SSD family",
  },
];

/**
 * Roadmap — confirmed direction (docs/05 §1), never purchasable, always
 * badged "Planned" (docs/01 §5 rule).
 */
export const roadmap: { group: string; items: string[] }[] = [
  {
    group: "Storage",
    items: [
      "PCIe Gen3, Gen4 and Gen5 NVMe SSDs",
      "External and portable SSDs",
      "Enterprise SSDs",
      "NAS storage",
    ],
  },
  {
    group: "Memory",
    items: [
      "DDR4 and DDR5 desktop memory",
      "Laptop memory",
      "Gaming and workstation memory",
      "ECC memory",
    ],
  },
  {
    group: "Peripherals & accessories",
    items: [
      "USB flash drives",
      "Memory cards",
      "SSD enclosures",
      "Docking stations",
      "Cooling",
      "Power supplies",
    ],
  },
  {
    group: "Infrastructure",
    items: ["Storage servers", "Backup solutions"],
  },
  {
    group: "Software ecosystem",
    items: [
      "SSD health monitoring",
      "Firmware update utility",
      "Warranty registration portal",
      "Product authentication",
      "Device diagnostics",
      "Driver download centre",
      "Customer support portal",
      "Dealer portal",
    ],
  },
];
