"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type CapacitySelectorProps = {
  capacities: string[];
  /** Called when the selection changes — page swaps displayed specs if they differ. */
  onChange?: (capacity: string) => void;
  className?: string;
};

/**
 * Radio group styled as chips (docs/06 §3). Native radios give arrow-key
 * movement for free. Does not navigate and does not add to a cart — v1 has
 * no cart by decision.
 */
export function CapacitySelector({ capacities, onChange, className }: CapacitySelectorProps) {
  const [selected, setSelected] = useState(capacities[0]);

  if (capacities.length === 0) return null;

  return (
    <fieldset className={className}>
      <legend className="text-body text-fg mb-3 font-medium">Capacity</legend>
      <div className="flex flex-wrap gap-2">
        {capacities.map((capacity) => {
          const active = selected === capacity;
          return (
            <label
              key={capacity}
              className={cn(
                "text-body cursor-pointer rounded-md border px-4 py-2 font-medium",
                "transition-colors duration-fast ease-out",
                "has-focus-visible:outline-2 has-focus-visible:outline-accent-500 has-focus-visible:outline-offset-2",
                active
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-border-strong text-fg-muted hover:border-brand-500 hover:text-brand-500",
              )}
            >
              <input
                type="radio"
                name="capacity"
                value={capacity}
                checked={active}
                onChange={() => {
                  setSelected(capacity);
                  onChange?.(capacity);
                }}
                className="sr-only"
              />
              {capacity}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
