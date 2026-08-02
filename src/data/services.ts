/**
 * Services — the revenue today (docs/01 §5). Every service here is confirmed
 * deliverable (docs/05 §1). Turnaround figures are deliberately absent: they
 * are not in the confirmed-facts list ({{TBD:turnaround}}, add to docs/09
 * before quoting any).
 */

export type ServiceCategory =
  "hardware" | "software" | "network" | "support" | "consulting";

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  audience: ("consumer" | "business")[];
  summary: string;
  deliverables: string[];
  /** Numbered — order matters here, which is what earns the numbering. */
  process?: { step: number; title: string; detail: string }[];
  turnaround?: string;
  /** lucide icon name, resolved in the UI layer. */
  icon: string;
}

export const categoryLabels: Record<ServiceCategory, string> = {
  hardware: "Hardware",
  software: "Software & systems",
  network: "Networking & surveillance",
  support: "Ongoing support",
  consulting: "Consulting",
};

export const services: Service[] = [
  {
    slug: "ssd-upgrades",
    name: "SSD & hardware upgrades",
    category: "hardware",
    audience: ["consumer", "business"],
    summary:
      "Laptop and desktop upgrades — SSDs, memory, and components — with your data moved across intact.",
    deliverables: [
      "Upgrade recommendation matched to the machine and workload",
      "Supply and fitting of the SSD or component",
      "Operating system and data migrated to the new drive",
      "Old drive returned to you, or wiped on request",
      "Post-upgrade health check",
    ],
    process: [
      {
        step: 1,
        title: "Tell us the machine and the problem",
        detail: "Model, symptoms, and what you use it for.",
      },
      {
        step: 2,
        title: "We recommend and quote",
        detail:
          "One recommendation with a straight price — not a menu of upsells.",
      },
      {
        step: 3,
        title: "Upgrade and migration",
        detail:
          "Drive fitted, data moved, system verified to boot and perform.",
      },
      {
        step: 4,
        title: "Handover",
        detail:
          "You get the machine back with the old drive and what was done in writing.",
      },
    ],
    icon: "HardDrive",
  },
  {
    slug: "repair-diagnostics",
    name: "Computer repair & diagnostics",
    category: "hardware",
    audience: ["consumer", "business"],
    summary:
      "Fault-finding and repair for laptops and desktops — a clear diagnosis before any money changes hands.",
    deliverables: [
      "Documented diagnosis of the fault",
      "Repair quote before work starts",
      "Component-level repair or replacement",
      "Verification testing after the repair",
    ],
    icon: "Wrench",
  },
  {
    slug: "windows-deployment",
    name: "Windows installation & deployment",
    category: "software",
    audience: ["consumer", "business"],
    summary:
      "Clean Windows installs for single machines, imaged rollouts for fleets — licensed, updated, and ready to work.",
    deliverables: [
      "Licensed Windows installation with current updates",
      "Drivers and essential software configured",
      "Fleet imaging and rollout for offices",
      "User data preserved where requested",
    ],
    icon: "MonitorCog",
  },
  {
    slug: "data-migration",
    name: "Data migration",
    category: "software",
    audience: ["consumer", "business"],
    summary:
      "Files, profiles, and whole systems moved between drives or machines — verified before the old copy is touched.",
    deliverables: [
      "Migration plan agreed before anything moves",
      "Data copied and verified against the source",
      "Nothing deleted until you sign off the new system",
    ],
    icon: "FolderSync",
  },
  {
    slug: "networking",
    name: "Networking & CCTV",
    category: "network",
    audience: ["business", "consumer"],
    summary:
      "Office and home networks set up and maintained — routers, switches, cabling, Wi-Fi, and CCTV surveillance.",
    deliverables: [
      "Network design and installation",
      "Router and switch configuration",
      "Structured cabling and Wi-Fi coverage",
      "CCTV installation and surveillance support",
      "Ongoing maintenance on request",
    ],
    icon: "Network",
  },
  {
    slug: "office-it",
    name: "Office IT infrastructure",
    category: "network",
    audience: ["business"],
    summary:
      "Complete office IT: workstations, storage, networking, and the boring-but-critical setup in between.",
    deliverables: [
      "Workstation and peripheral setup",
      "Shared storage and backup configuration",
      "Email and productivity tooling setup",
      "Documentation your next IT person will thank you for",
    ],
    icon: "Building2",
  },
  {
    slug: "amc",
    name: "Annual Maintenance Contracts",
    category: "support",
    audience: ["business"],
    summary:
      "A contract that keeps your office IT running — scheduled maintenance, priority response, and one number to call.",
    deliverables: [
      "Scheduled preventive maintenance visits",
      "Priority response when something breaks",
      "Cover for workstations, network, and peripherals as agreed",
      "A named contact who knows your setup",
    ],
    process: [
      {
        step: 1,
        title: "Site assessment",
        detail: "We inventory what you run and how critical each piece is.",
      },
      {
        step: 2,
        title: "Contract scoped",
        detail:
          "Coverage, visit schedule, and response expectations in plain language.",
      },
      {
        step: 3,
        title: "Onboarding",
        detail:
          "Documentation, monitoring where agreed, and introductions to your contact.",
      },
      {
        step: 4,
        title: "Steady state",
        detail:
          "Scheduled maintenance plus priority support for the life of the contract.",
      },
    ],
    icon: "ShieldCheck",
  },
  {
    slug: "remote-support",
    name: "Remote support & optimisation",
    category: "support",
    audience: ["consumer", "business"],
    summary:
      "Remote diagnosis, fixes, and system optimisation — most software problems don't need a site visit.",
    deliverables: [
      "Remote session with your consent, ended when you say",
      "Diagnosis and fix, or a clear next step if hardware is at fault",
      "System optimisation and cleanup",
    ],
    icon: "Headset",
  },
  {
    slug: "it-consulting",
    name: "Business IT consulting",
    category: "consulting",
    audience: ["business"],
    summary:
      "Straight answers on what to buy, what to fix, and what to stop paying for — from people who also do the work.",
    deliverables: [
      "Current-state review of your IT",
      "Prioritised recommendations with costs",
      "Vendor-neutral hardware guidance",
      "Implementation by our own team if you want it",
    ],
    icon: "Lightbulb",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
