"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { headerNav, type NavItem } from "@/data/nav";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

/**
 * Sticky 72px header. Transparent until 8px of scroll, then bg-surface/85 +
 * backdrop-blur + bottom hairline — the only permitted glassmorphism on the
 * site (docs/04 §1). Mega-panels open on click/keyboard, close on Esc (focus
 * returns to trigger), trap Tab while open.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const pathname = usePathname();

  // Close any open panel on route change — state adjustment during render,
  // not an effect (react.dev/learn/you-might-not-need-an-effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenPanel(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While a panel is open: click outside closes; Esc closes and returns focus
  // to the trigger; Tab is trapped within trigger + panel.
  useEffect(() => {
    if (!openPanel) return;

    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const trigger = triggerRefs.current.get(openPanel);
      const panel = document.getElementById(`nav-panel-${openPanel}`);
      if (!trigger || !panel) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setOpenPanel(null);
        trigger.focus();
        return;
      }
      if (e.key === "Tab") {
        const focusables = [
          trigger,
          ...Array.from(panel.querySelectorAll<HTMLElement>("a[href]")),
        ];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openPanel]);

  return (
    <header
      className={cn(
        "duration-fast sticky top-0 z-40 transition-[background-color,box-shadow] ease-out",
        scrolled
          ? "bg-surface/85 shadow-[0_1px_0_0_var(--color-border)] backdrop-blur"
          : "bg-surface",
      )}
    >
      <a
        href="#main-content"
        className={cn(
          "absolute top-2 left-2 z-50 rounded-md bg-brand-500 px-4 py-2 text-label uppercase",
          "-translate-y-16 text-white transition-transform focus:translate-y-0",
        )}
      >
        Skip to content
      </a>

      <nav
        ref={navRef}
        aria-label="Main"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
      >
        <Link href="/" className="shrink-0" aria-label="NUCLIEX home">
          <Logo kind="lockup" className="hidden h-14 w-auto sm:block" />
          <Logo kind="mark" className="h-9 w-auto sm:hidden" />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {headerNav.map((item) => (
            <li key={item.label} className="relative">
              {"panel" in item && item.panel ? (
                <div
                  onBlur={(e) => {
                    // Light dismissal when focus leaves trigger + panel entirely.
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenPanel((current) =>
                        current === item.label ? null : current,
                      );
                    }
                  }}
                >
                  <button
                    ref={(el) => {
                      if (el) triggerRefs.current.set(item.label, el);
                    }}
                    type="button"
                    aria-expanded={openPanel === item.label}
                    aria-controls={`nav-panel-${item.label}`}
                    onClick={() =>
                      setOpenPanel(openPanel === item.label ? null : item.label)
                    }
                    className={cn(
                      "flex h-11 items-center gap-1 rounded-md px-3 text-body font-medium text-fg",
                      "duration-fast transition-colors ease-out hover:text-brand-500",
                      openPanel === item.label && "text-brand-500",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className={cn(
                        "duration-fast transition-transform",
                        openPanel === item.label && "rotate-180",
                      )}
                    />
                  </button>
                  <MegaPanel item={item} open={openPanel === item.label} />
                </div>
              ) : (
                <Link
                  href={item.href as Route}
                  className={cn(
                    "flex h-11 items-center rounded-md px-3 text-body font-medium text-fg",
                    "duration-fast transition-colors ease-out hover:text-brand-500",
                    pathname === item.href && "text-brand-500",
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" href="/contact">
            Contact
          </Button>
          <Button size="sm" href="/business/quote">
            Request a quote
          </Button>
        </div>

        <MobileNav />
      </nav>
    </header>
  );
}

function MegaPanel({
  item,
  open,
}: {
  item: Extract<NavItem, { panel: unknown }>;
  open: boolean;
}) {
  return (
    <div
      id={`nav-panel-${item.label}`}
      hidden={!open}
      className={cn(
        "absolute top-full left-1/2 mt-2 w-[560px] -translate-x-1/2 bg-surface",
        "rounded-xl border border-border p-6 shadow-lg",
      )}
    >
      <div className="grid grid-cols-2 gap-6">
        {item.panel.map((column) => (
          <div key={column.title}>
            <p className="mb-3 text-label text-fg-subtle uppercase">
              {column.title}
            </p>
            <ul className="space-y-1">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as Route}
                    className={cn(
                      "group block rounded-md p-3 hover:bg-surface-subtle",
                      "duration-fast transition-colors ease-out",
                    )}
                  >
                    <span className="block text-body font-medium text-fg group-hover:text-brand-500">
                      {link.label}
                    </span>
                    {link.description ? (
                      <span className="mt-0.5 block text-body-sm text-fg-muted">
                        {link.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
