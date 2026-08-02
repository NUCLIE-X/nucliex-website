"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
};

export function Tabs({ items, defaultValue, className }: TabsProps) {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue ?? items[0]?.id}
      className={className}
    >
      <TabsPrimitive.List
        className="flex gap-6 border-b border-border"
        aria-label="Content sections"
      >
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.id}
            value={item.id}
            className={cn(
              "-mb-px border-b-2 border-transparent pt-1 pb-3 text-body font-medium text-fg-muted",
              "duration-fast transition-colors ease-out hover:text-fg",
              // Cyan underline: active tab is an interactive/live element (docs/02 §1)
              "data-[state=active]:border-accent-500 data-[state=active]:text-fg",
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content key={item.id} value={item.id} className="pt-6">
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
