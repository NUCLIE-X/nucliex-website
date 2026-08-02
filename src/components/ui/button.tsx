import Link from "next/link";
import type { Route } from "next";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  size?: "sm" | "md" | "lg";
  /** Renders next/link when present. */
  href?: Route | string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  /** Disables and swaps the label — pass the pending label as children upstream. */
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium " +
  "transition-[background-color,border-color,color,transform] duration-fast ease-out " +
  "disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 hover:-translate-y-px " +
    "disabled:bg-border-strong disabled:text-fg-subtle disabled:hover:translate-y-0",
  secondary:
    "bg-surface border border-border-strong text-fg " +
    "hover:border-brand-500 hover:text-brand-500 disabled:opacity-50",
  ghost: "bg-transparent text-fg-muted hover:bg-surface-subtle hover:text-fg disabled:opacity-50",
  onDark: "bg-white text-brand-900 hover:bg-accent-500 hover:text-brand-900",
};

// Heights 36/44/52, padding-x 16/24/32 (docs/02 §5). 44px min tap target ≥ md.
const sizes = {
  sm: "h-9 px-4 text-body-sm",
  md: "h-11 px-6 text-body",
  lg: "h-13 px-8 text-body",
};

const iconSizes = { sm: 16, md: 20, lg: 20 };

export function Button({
  variant = "primary",
  size = "md",
  href,
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  type = "button",
  className,
  onClick,
  children,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const iconEl = Icon ? (
    <Icon size={iconSizes[size]} strokeWidth={1.5} aria-hidden="true" />
  ) : null;
  const content = (
    <>
      {iconPosition === "left" && iconEl}
      {children}
      {iconPosition === "right" && iconEl}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href as Route} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
