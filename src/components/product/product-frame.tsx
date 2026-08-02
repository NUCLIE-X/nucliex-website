import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductFrameProps = {
  ratio?: "1/1" | "4/3" | "16/9";
  /** Caption for the placeholder mode, e.g. "NX-500 · 512 GB SATA SSD". */
  label?: string;
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const ratios = {
  "1/1": "aspect-square",
  "4/3": "aspect-4/3",
  "16/9": "aspect-video",
};

/**
 * With src → next/image fill. Without → the honest placeholder (docs/02 §9):
 * a considered empty state, never a stock photo or AI-generated fake product.
 * Node motif at 4% opacity is the one permitted decorative use of the mark.
 */
export function ProductFrame({
  ratio = "4/3",
  label,
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  className,
}: ProductFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-surface-subtle",
        ratios[ratio],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? label ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain p-6"
        />
      ) : (
        <>
          <Image
            src="/brand/nucliex-mark-navy.png"
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            priority={priority}
            className="scale-75 object-contain opacity-4"
          />
          {label ? (
            <span className="absolute inset-x-4 bottom-4 text-center text-label text-fg-subtle uppercase">
              {label}
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}
