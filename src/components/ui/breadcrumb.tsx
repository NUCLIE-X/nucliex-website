import Link from "next/link";
import type { Route } from "next";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";

type Crumb = {
  label: string;
  href?: Route | string;
};

type BreadcrumbProps = {
  /** Last item is the current page — rendered without a link. */
  items: Crumb[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-body-sm text-fg-subtle">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href as Route}
                    className="duration-fast transition-colors hover:text-brand-500"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="text-fg-muted"
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden="true">
                  <ChevronRight size={16} strokeWidth={1.5} />
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
