import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** navy on light surfaces, white on navy/dark (docs/01 §7). */
  variant?: "navy" | "white";
  /** Full lockup vs mark-only (mark below 640px / tight spaces). */
  kind?: "lockup" | "mark";
  className?: string;
};

/**
 * Interim raster reproduction — the vector redraw is launch blocker #1
 * (docs/09). Source PNGs are 510×202 (lockup) and 480×216 (mark).
 */
export function Logo({ variant = "navy", kind = "lockup", className }: LogoProps) {
  if (kind === "mark") {
    return (
      <Image
        src="/brand/nucliex-mark-navy.png"
        alt="NUCLIEX INFOSYS"
        width={480}
        height={216}
        className={cn("h-8 w-auto", className)}
      />
    );
  }
  return (
    <Image
      src={variant === "navy" ? "/brand/nucliex-logo-navy.png" : "/brand/nucliex-logo-white.png"}
      alt="NUCLIEX INFOSYS"
      width={510}
      height={202}
      className={cn("h-14 w-auto", className)}
    />
  );
}
