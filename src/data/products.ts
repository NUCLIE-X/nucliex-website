/**
 * Product catalogue — typed local modules per docs/03-ARCHITECTURE.md §2.
 * Every field must be real: unknown values carry literal {{TBD:…}} tokens
 * tracked in docs/09-OPEN-QUESTIONS.md. Catalogue entries land in Phase 6.
 */

export type ProductStatus = "available" | "coming-soon" | "planned";

export type ProductFamily =
  | "sata-ssd"
  | "nvme-ssd"
  | "memory"
  | "external"
  | "enterprise"
  | "accessory";

export type SpecGroup =
  | "performance"
  | "endurance"
  | "physical"
  | "compatibility"
  | "warranty";

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
  capacities: string[]; // ["128 GB","256 GB","512 GB","1 TB"]
  formFactor: string; // "2.5-inch SATA III" | "M.2 2280 PCIe Gen3 x4"
  interface: string;
  /** The four figures shown in the SpecRail. Exactly four. */
  highlights: { value: string; label: string; note?: string }[];
  specs: SpecRow[];
  useCases: string[]; // "Laptop upgrade", "Office desktop fleet"
  warrantyYears: number | null; // null → renders {{TBD}}
  images: { src: string; alt: string }[];
  documents: { title: string; href: string; type: "datasheet" | "guide" | "warranty" }[];
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

/** Populated in Phase 6 — kept typed and empty until then. */
export const products: Product[] = [];

/**
 * Families the company currently focuses on (confirmed in docs/05 §1).
 * The homepage shows one card per family — never padded to three.
 */
export const activeFamilies = [
  {
    key: "sata-ssd" as ProductFamily,
    name: "SATA SSDs",
    href: "/products/ssd/sata",
    descriptor: "2.5-inch drives that give working laptops and desktops a faster second life.",
    frameLabel: "SATA SSD family",
  },
  {
    key: "nvme-ssd" as ProductFamily,
    name: "NVMe SSDs",
    href: "/products/ssd/nvme",
    descriptor: "M.2 drives for gaming, content creation, and workstation builds.",
    frameLabel: "NVMe SSD family",
  },
];
