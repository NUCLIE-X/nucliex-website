/**
 * Product catalogue — typed local modules per docs/03-ARCHITECTURE.md §2.
 * Every field must be real: unknown values carry literal {{TBD:…}} tokens
 * tracked in docs/09-OPEN-QUESTIONS.md.
 *
 * Figures for the GREEN Series come from the client-supplied retail
 * packaging (brand-assets/green-ssd-256gb-box-original.jpeg, received
 * 2026-08-02). The measured-conditions datasheet is still pending —
 * docs/09 #3 stays partially open.
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
  /** Preferred display line where the term needs nuance, e.g. "5 years — 7 with registration". */
  warrantyLabel?: string;
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
    slug: "green-ssd",
    name: "GREEN SSD",
    family: "sata-ssd",
    status: "available",
    tagline: "The GREEN Series 2.5-inch SATA drive — built for the machines people actually use.",
    summary:
      "The GREEN Series is NUCLIEX's 2.5-inch SATA III SSD for laptop and desktop upgrades: up to 560 MB/s reads, dynamic SLC caching, and a 5-year warranty that extends to 7 years when you register the drive.",
    capacities: ["256 GB"], // further capacities pending confirmation ({{TBD:products}})
    formFactor: "2.5-inch",
    interface: "SATA III 6 Gb/s",
    highlights: [
      {
        value: "560 MB/s",
        label: "Seq. read (up to)",
        note: "Figures as rated on retail packaging; measured-conditions datasheet pending.",
      },
      { value: "520 MB/s", label: "Seq. write (up to)" },
      { value: "170 TBW", label: "Endurance (256 GB)" },
      {
        value: "7 YEAR",
        label: "Warranty",
        note: "5 years standard + 2 years extended registration benefit. T&C apply.",
      },
    ],
    specs: [
      {
        label: "Sequential read",
        value: "Up to 560 MB/s",
        group: "performance",
        note: "Figures as rated on retail packaging; measured-conditions datasheet pending.",
      },
      { label: "Sequential write", value: "Up to 520 MB/s", group: "performance" },
      { label: "Cache", value: "Dynamic SLC", group: "performance" },
      { label: "Endurance (256 GB)", value: "170 TBW", group: "endurance" },
      { label: "MTTF", value: "2.0 million hours", group: "endurance" },
      { label: "Error correction", value: "LDPC", group: "endurance" },
      { label: "Shock resistance", value: "1,500 G", group: "endurance" },
      { label: "Vibration resistance", value: "5.0 gRMS", group: "endurance" },
      { label: "Form factor", value: "2.5-inch", group: "physical" },
      { label: "Interface", value: "SATA III 6 Gb/s", group: "physical" },
      { label: "TRIM", value: "Supported", group: "compatibility" },
      { label: "S.M.A.R.T.", value: "Health monitoring supported", group: "compatibility" },
      { label: "Certification", value: "BIS", group: "compatibility" },
      { label: "Standard warranty", value: "5 years", group: "warranty" },
      {
        label: "Extended warranty",
        value: "+2 years on registration",
        group: "warranty",
        note: "Extended registration benefit — terms and conditions apply.",
      },
    ],
    useCases: ["Laptop upgrade", "Office desktop fleet", "Everyday PC build"],
    warrantyYears: 5,
    warrantyLabel: "5-year warranty — 7 years with registration",
    images: [
      {
        src: "/products/green-ssd-256gb.jpg",
        alt: "NUCLIEX GREEN Series SSD 256 GB retail box, front view",
      },
    ],
    documents: [], // {{TBD:documents}} — datasheet PDF pending
    seo: {
      title: "GREEN SSD — 2.5-inch SATA III, 256 GB",
      description:
        "The NUCLIEX GREEN Series SATA SSD: up to 560 MB/s read, 170 TBW endurance, and a 5-year warranty extendable to 7 with registration.",
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
