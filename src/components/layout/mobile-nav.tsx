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
            "text-fg hover:bg-surface-subtle flex size-11 items-center justify-center",
            "rounded-md transition-colors duration-fast lg:hidden",
          )}
        >
          <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className={cn(
            "bg-surface fixed inset-0 z-50 flex flex-col",
            "animate-overlay-in motion-reduce:animate-none",
          )}
        >
          <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
          <div className="border-border flex h-18 shrink-0 items-center justify-between border-b px-5">
            <Link href="/" aria-label="NUCLIEX home" onClick={() => setOpen(false)}>
              <Logo kind="mark" className="h-9 w-auto" />
            </Link>
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className={cn(
                  "text-fg hover:bg-surface-subtle flex size-11 items-center justify-center",
                  "rounded-md transition-colors duration-fast",
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
                    className="border-border border-b"
                  >
                    <AccordionPrimitive.Header className="m-0">
                      <AccordionPrimitive.Trigger
                        className={cn(
                          "group text-body text-fg flex w-full items-center justify-between",
                          "py-4 text-left font-medium",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          size={20}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="text-fg-subtle transition-transform duration-base group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                        />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Content
                      className={cn(
                        "overflow-hidden",
                        "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
                        "motion-reduce:animate-none",
                      )}
                    >
                      <ul className="space-y-1 pb-4">
                        {item.panel.flatMap((column) => column.links).map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href as Route}
                              className="text-body text-fg-muted hover:text-brand-500 block rounded-md py-2.5 pl-3"
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
                    className="text-body text-fg border-border block border-b py-4 font-medium"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </AccordionPrimitive.Root>
            <Link href="/contact" className="text-body text-fg border-border block border-b py-4 font-medium">
              Contact
            </Link>
          </nav>

          <div className="border-border shrink-0 border-t p-5">
            <Button href="/business/quote" className="w-full">
              Request a quote
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
