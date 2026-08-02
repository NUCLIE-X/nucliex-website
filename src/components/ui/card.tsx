import { cn } from "@/lib/utils";

type CardProps = {
  /**
   * Set when the whole card is a link. Pair with a stretched link inside
   * (CardTitleLink) so the surface is clickable while only the title tabs.
   */
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Border-first, no resting shadow (docs/02 §5). */
export function Card({ interactive = false, className, children }: CardProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface relative rounded-lg border",
        interactive &&
          "hover:border-brand-200 hover:shadow-md transition-[border-color,box-shadow] duration-fast ease-out",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardMedia({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-4 pb-0", className)}>{children}</div>;
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-6 lg:p-8", className)}>{children}</div>;
}

export function CardFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("border-border flex items-center gap-4 border-t px-6 py-4 lg:px-8", className)}>
      {children}
    </div>
  );
}
