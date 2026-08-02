import { ArrowRight, Download } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field-error";
import { FileInput } from "@/components/ui/file-input";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/layout/section-header";
import { ProductFrame } from "@/components/product/product-frame";
import { SpecRail } from "@/components/product/spec-rail";
import { SpecTable } from "@/components/product/spec-table";
import { ProcessSteps } from "@/components/ui/process-steps";
import { TrustPoints } from "@/components/ui/trust-points";

export function SignatureShowcase() {
  return (
    <div className="space-y-14">
      <p className="text-body-sm text-fg-subtle">
        Structure demos with sample figures — not product data. Real values are
        gated by docs/09-OPEN-QUESTIONS.md.
      </p>
      <div>
        <h3 className="mb-6 text-h3 font-semibold">
          SpecRail — navy (signature) and light
        </h3>
        <div className="space-y-8">
          <SpecRail
            bleed={false}
            items={[
              {
                value: "550 MB/s",
                label: "Seq. read",
                note: "CrystalDiskMark 8, 1 GiB test file, empty drive.",
              },
              { value: "500 MB/s", label: "Seq. write" },
              { value: "3 YEAR", label: "Warranty" },
              { value: "24 HR", label: "RMA response" },
            ]}
          />
          <SpecRail
            bleed={false}
            tone="light"
            items={[
              { value: "02", label: "Condensed" },
              { value: "2-UP", label: "Service form" },
            ]}
          />
        </div>
      </div>
      <div>
        <h3 className="mb-6 text-h3 font-semibold">SpecTable</h3>
        <SpecTable
          className="max-w-2xl"
          specs={[
            {
              label: "Sequential read",
              value: "550 MB/s",
              group: "performance",
              note: "Measured at QD32, 1 GiB span.",
            },
            {
              label: "Sequential write",
              value: "500 MB/s",
              group: "performance",
            },
            { label: "TBW (512 GB)", value: "240 TB", group: "endurance" },
            { label: "Form factor", value: "2.5-inch", group: "physical" },
            {
              label: "Interface",
              value: "SATA III 6 Gb/s",
              group: "compatibility",
            },
            { label: "Warranty", value: "3 years", group: "warranty" },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-6 text-h3 font-semibold">
          ProductFrame — placeholder and ratios
        </h3>
        <div className="grid gap-6 sm:grid-cols-3">
          <ProductFrame ratio="1/1" label="NX-500 · 512 GB SATA SSD" />
          <ProductFrame ratio="4/3" label="NX-500 · 512 GB SATA SSD" />
          <ProductFrame ratio="16/9" label="Workspace placeholder" />
        </div>
      </div>
      <div>
        <h3 className="mb-6 text-h3 font-semibold">
          ProcessSteps (earned numbering only)
        </h3>
        <ProcessSteps
          className="max-w-2xl"
          steps={[
            {
              title: "Raise the RMA",
              detail:
                "Structure demo — the real sequence lives on /support/rma.",
            },
            {
              title: "We respond with a decision",
              detail: "Replacement or repair, stated plainly.",
            },
            {
              title: "Drive ships back",
              detail: "With the outcome documented.",
            },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-6 text-h3 font-semibold">
          TrustPoints (hairline list, not cards)
        </h3>
        <TrustPoints
          points={[
            {
              title: "Engineered, then verified.",
              body: "Structure demo — approved copy comes from docs/05 §3.",
            },
            {
              title: "A warranty written in plain language.",
              body: "The term, coverage, and exclusions on the product page.",
            },
          ]}
        />
      </div>
    </div>
  );
}

export function PrimitivesShowcase() {
  return (
    <div className="space-y-14">
      <div>
        <h3 className="mb-6 text-h3 font-semibold">
          Buttons — variants × sizes × states
        </h3>
        <div className="space-y-6">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-4">
              <Button size={size}>Request a quote</Button>
              <Button size={size} variant="secondary">
                View specifications
              </Button>
              <Button size={size} variant="ghost">
                Contact
              </Button>
              <Button size={size} icon={Download}>
                Download datasheet
              </Button>
              <Button
                size={size}
                icon={ArrowRight}
                iconPosition="right"
                variant="secondary"
              >
                Explore SSDs
              </Button>
              <Button size={size} disabled>
                Request a quote
              </Button>
              <Button size={size} loading>
                Sending…
              </Button>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-4 rounded-lg bg-surface-navy p-6">
            <Button variant="onDark">Register your warranty</Button>
            <Button variant="onDark" size="lg">
              Start an RMA
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-6 text-h3 font-semibold">Badges</h3>
        <div className="flex flex-wrap gap-3">
          <Badge tone="neutral">SATA III</Badge>
          <Badge tone="brand">New</Badge>
          <Badge tone="success">Available</Badge>
          <Badge tone="warning">Coming soon</Badge>
          <Badge tone="planned">Planned</Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-6 text-h3 font-semibold">Card family</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardBody>
              <h4 className="text-h4 font-medium">Resting card</h4>
              <p className="mt-2 text-body-sm text-fg-muted">
                Border-first, no shadow at rest.
              </p>
            </CardBody>
            <CardFooter>
              <span className="text-body-sm text-fg-subtle">Footer row</span>
            </CardFooter>
          </Card>
          <Card interactive>
            <CardBody>
              <h4 className="text-h4 font-medium">Interactive card</h4>
              <p className="mt-2 text-body-sm text-fg-muted">
                Hover: border-brand-200 + shadow-md. Used only when the whole
                card links.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="mb-6 text-h3 font-semibold">
          Form primitives — resting, error, disabled
        </h3>
        <div className="grid max-w-2xl gap-6">
          <div>
            <label
              htmlFor="sg-name"
              className="mb-2 block text-body font-medium text-fg"
            >
              Full name
            </label>
            <Input
              id="sg-name"
              name="name"
              autoComplete="name"
              placeholder="Priya Sharma"
            />
            <p className="mt-2 text-body-sm text-fg-subtle">
              Help text sits below the control.
            </p>
          </div>
          <div>
            <label
              htmlFor="sg-phone"
              className="mb-2 block text-body font-medium text-fg"
            >
              Mobile number
            </label>
            <Input
              id="sg-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue="12345"
              aria-invalid="true"
              aria-describedby="sg-phone-error"
            />
            <FieldError id="sg-phone-error">
              Enter a valid 10-digit mobile number.
            </FieldError>
          </div>
          <div>
            <label
              htmlFor="sg-disabled"
              className="mb-2 block text-body font-medium text-fg"
            >
              Disabled
            </label>
            <Input
              id="sg-disabled"
              name="disabled"
              disabled
              value="Not editable"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="sg-select"
              className="mb-2 block text-body font-medium text-fg"
            >
              Enquiry type
            </label>
            <Select id="sg-select" name="enquiry" defaultValue="">
              <option value="" disabled>
                Choose an enquiry type
              </option>
              <option value="sales">Product / sales</option>
              <option value="services">IT services</option>
              <option value="support">Support</option>
            </Select>
          </div>
          <div>
            <label
              htmlFor="sg-message"
              className="mb-2 block text-body font-medium text-fg"
            >
              Message
            </label>
            <Textarea
              id="sg-message"
              name="message"
              placeholder="Tell us what you're building."
            />
          </div>
          <Checkbox
            name="sg-check"
            label="Send me a copy of my enquiry"
            value="copy"
          />
          <RadioGroup
            legend="Who is this for?"
            name="sg-audience"
            options={[
              { value: "consumer", label: "Personal build" },
              {
                value: "business",
                label: "Business",
                description: "GST invoice required",
              },
            ]}
            defaultValue="consumer"
          />
          <div>
            <label
              htmlFor="sg-file"
              className="mb-2 block text-body font-medium text-fg"
            >
              Invoice upload
            </label>
            <FileInput
              id="sg-file"
              name="invoice"
              accept="image/jpeg,image/png,application/pdf"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-6 text-h3 font-semibold">
          Accordion · Dialog · Tabs (Radix)
        </h3>
        <div className="max-w-2xl space-y-10">
          <Accordion
            items={[
              {
                id: "one",
                title: "What does the warranty cover?",
                content:
                  "Structure demo — real copy comes from the FAQ data module.",
              },
              {
                id: "two",
                title: "How do I start an RMA?",
                content:
                  "Structure demo — the RMA process page holds the numbered sequence.",
              },
            ]}
          />
          <Dialog
            trigger={<Button variant="secondary">Open dialog demo</Button>}
            title="Dialog title"
            description="Focus is trapped, Esc closes, focus returns to the trigger."
          >
            <p className="text-body text-fg-muted">Dialog body content.</p>
          </Dialog>
          <Tabs
            items={[
              {
                id: "a",
                label: "Overview",
                content: <p className="text-body">Tab A content.</p>,
              },
              {
                id: "b",
                label: "Specifications",
                content: <p className="text-body">Tab B content.</p>,
              },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-6 text-h3 font-semibold">
          Breadcrumb · SectionHeader
        </h3>
        <div className="space-y-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "NX-500" },
            ]}
          />
          <SectionHeader
            eyebrow="Eyebrow label"
            title="Section header title"
            lead="Lead paragraph capped at 56 characters per line, muted."
            action={<Button variant="secondary">Action slot</Button>}
          />
        </div>
      </div>
    </div>
  );
}
