"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DialogProps = {
  trigger: React.ReactNode;
  title: string;
  /** Optional supporting line under the title. */
  description?: string;
  className?: string;
  children: React.ReactNode;
};

/** Radix handles focus trap, Esc close, and focus return (docs/06 §2). */
export function Dialog({ trigger, title, description, className, children }: DialogProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "bg-brand-900/60 fixed inset-0 z-50",
            "animate-overlay-in motion-reduce:animate-none",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "bg-surface fixed top-1/2 left-1/2 z-50 w-[calc(100vw-40px)] max-w-lg",
            "-translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-lg lg:p-8",
            "animate-dialog-in motion-reduce:animate-none",
            className,
          )}
        >
          <DialogPrimitive.Title className="text-h3 text-brand-900 font-semibold">
            {title}
          </DialogPrimitive.Title>
          {description ? (
            <DialogPrimitive.Description className="text-body-sm text-fg-muted mt-2">
              {description}
            </DialogPrimitive.Description>
          ) : null}
          <div className="mt-6">{children}</div>
          <DialogPrimitive.Close
            aria-label="Close dialog"
            className={cn(
              "text-fg-subtle hover:text-fg hover:bg-surface-subtle absolute top-4 right-4",
              "flex size-11 items-center justify-center rounded-md transition-colors duration-fast",
            )}
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
