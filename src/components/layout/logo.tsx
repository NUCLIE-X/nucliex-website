import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Full lockup vs mark-only (mark below 640px / tight spaces). */
  kind?: "lockup" | "mark";
  className?: string;
};

/**
 * CLIENT DECISION 2026-08-02: the site uses the original teal (#7ACCC9)
 * artwork — the navy/white recolour from docs/02 §3.2 is superseded (see the
 * amendment in CLAUDE.md §3.2 and docs/09 decision #6). Navy/white PNGs stay
 * in public/brand for print/dark-collateral use.
 *
 * Interim raster — the vector redraw is still launch blocker #1 (docs/09).
 * Source PNGs are 510×202 (lockup) and 480×232 (mark).
 */
export function Logo({ kind = "lockup", className }: LogoProps) {
  if (kind === "mark") {
    return (
      <Image
        src="/brand/nucliex-mark-teal.png"
        alt="NUCLIEX INFOSYS"
        width={480}
        height={232}
        className={cn("h-8 w-auto", className)}
      />
    );
  }
  return (
    <Image
      src="/brand/nucliex-logo-teal.png"
      alt="NUCLIEX INFOSYS"
      width={510}
      height={202}
      className={cn("h-14 w-auto", className)}
    />
  );
}
