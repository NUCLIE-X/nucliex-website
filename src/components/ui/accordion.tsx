"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionItemData = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItemData[];
  /** Heading level of the trigger wrappers — keeps the page outline honest. */
  headingLevel?: 2 | 3;
  className?: string;
};

export function Accordion({ items, headingLevel = 3, className }: AccordionProps) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className={cn("w-full", className)}>
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className="border-border border-b"
        >
          <AccordionPrimitive.Header asChild>
            {headingLevel === 2 ? (
              <h2 className="m-0">
                <AccordionTrigger title={item.title} />
              </h2>
            ) : (
              <h3 className="m-0">
                <AccordionTrigger title={item.title} />
              </h3>
            )}
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className={cn(
              "overflow-hidden",
              "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
              "motion-reduce:animate-none",
            )}
          >
            <div className="text-body text-fg-muted max-w-[68ch] pb-5">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

function AccordionTrigger({ title }: { title: string }) {
  return (
    <AccordionPrimitive.Trigger
      className={cn(
        "group text-body text-fg flex w-full items-center justify-between gap-4 py-5 text-left font-medium",
        "hover:text-brand-500 transition-colors duration-fast ease-out",
      )}
    >
      {title}
      <ChevronDown
        size={20}
        strokeWidth={1.5}
        aria-hidden="true"
        className={cn(
          "text-fg-subtle shrink-0 transition-transform duration-base ease-out",
          "group-data-[state=open]:rotate-180 motion-reduce:transition-none",
        )}
      />
    </AccordionPrimitive.Trigger>
  );
}
