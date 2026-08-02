"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Menu, X } from "lucide-react";
import { headerNav } from "@/data/nav";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Full-height sheet (docs/04 §1): accordion sections, focus trapped and body
 * scroll locked by Radix Dialog, CTA pinned at the bottom, closes on route
 * change. Menu toggle is one of the two permitted icon-only controls.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change — state adjustment during render, not an effect.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn(
            "flex size-11 items-center justify-center text-fg hover:bg-surface-subtle",
            "duration-fast rounded-md transition-colors lg:hidden",
          )}
        >
          <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 flex flex-col bg-surface",
            "animate-overlay-in motion-reduce:animate-none",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Menu
          </DialogPrimitive.Title>
          <div className="flex h-18 shrink-0 items-center justify-between border-b border-border px-5">
            <Link
              href="/"
              aria-label="NUCLIEX home"
              onClick={() => setOpen(false)}
            >
              <Logo kind="mark" className="h-9 w-auto" />
            </Link>
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className={cn(
                  "flex size-11 items-center justify-center text-fg hover:bg-surface-subtle",
                  "duration-fast rounded-md transition-colors",
                )}
              >
                <X size={24} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </DialogPrimitive.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            <AccordionPrimitive.Root type="multiple">
              {headerNav.map((item) =>
                "panel" in item && item.panel ? (
                  <AccordionPrimitive.Item
                    key={item.label}
                    value={item.label}
                    className="border-b border-border"
                  >
                    <AccordionPrimitive.Header className="m-0">
                      <AccordionPrimitive.Trigger
                        className={cn(
                          "group flex w-full items-center justify-between text-body text-fg",
                          "py-4 text-left font-medium",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          size={20}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="duration-base text-fg-subtle transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                        />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Content
                      className={cn(
                        "overflow-hidden",
                        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
                        "motion-reduce:animate-none",
                      )}
                    >
                      <ul className="space-y-1 pb-4">
                        {item.panel
                          .flatMap((column) => column.links)
                          .map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href as Route}
                                className="block rounded-md py-2.5 pl-3 text-body text-fg-muted hover:text-brand-500"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </AccordionPrimitive.Content>
                  </AccordionPrimitive.Item>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href as Route}
                    className="block border-b border-border py-4 text-body font-medium text-fg"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </AccordionPrimitive.Root>
            <Link
              href="/contact"
              className="block border-b border-border py-4 text-body font-medium text-fg"
            >
              Contact
            </Link>
          </nav>

          <div className="shrink-0 border-t border-border p-5">
            <Button href="/business/quote" className="w-full">
              Request a quote
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
