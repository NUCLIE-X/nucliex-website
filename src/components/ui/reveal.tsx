"use client";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  /** Stagger offset in seconds — use sparingly, hero only. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * The ONLY entry-animation path (docs/06 §6). Fade + 8px rise, 400ms, fires
 * once at 15% viewport intersection. Reduced motion renders statically.
 */
export function Reveal({ delay = 0, className, children }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
