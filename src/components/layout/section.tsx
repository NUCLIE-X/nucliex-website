import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  tone?: "default" | "subtle" | "navy" | "dark";
  spacing?: "default" | "tight" | "hero";
  /** Full-width background with contained content (dark sections, spec rail). */
  bleed?: boolean;
  as?: "section" | "div";
  id?: string;
  className?: string;
  /** Container size passed through when bleed is false the content still gets a Container. */
  containerSize?: "default" | "narrow" | "wide";
  children: React.ReactNode;
};

const tones = {
  default: "bg-surface",
  subtle: "bg-surface-subtle",
  navy: "bg-surface-navy text-fg-inverse",
  dark: "bg-surface-dark text-fg-inverse",
};

// The ONLY place section vertical rhythm is defined (docs/02 §4).
const spacings = {
  default: "py-16 md:py-20 lg:py-24",
  tight: "py-10 md:py-12",
  hero: "py-20 lg:py-32",
};

/**
 * Owns all vertical section padding. No other component sets py-* at section
 * level — this single rule prevents multi-section cascade collisions.
 */
export function Section({
  tone = "default",
  spacing = "default",
  bleed = false,
  as: Tag = "section",
  id,
  className,
  containerSize = "default",
  children,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(tones[tone], spacings[spacing], className)}>
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </Tag>
  );
}
