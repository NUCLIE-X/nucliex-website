import { cn } from "@/lib/utils";

type ContainerProps = {
  /** default 1280px · narrow 768px (prose) · wide 1536px (full-bleed inner) */
  size?: "default" | "narrow" | "wide";
  className?: string;
  children: React.ReactNode;
};

const sizes = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  wide: "max-w-(--breakpoint-2xl)",
};

export function Container({ size = "default", className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizes[size], className)}>
      {children}
    </div>
  );
}
