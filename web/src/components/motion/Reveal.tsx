"use client";

import * as m from "motion/react-m";
import { cn } from "@/lib";

interface RevealProps extends WithChildren {
  className?: string;
  /** Delay in seconds, for manual staggering. */
  delay?: number;
  /** Vertical offset in px the element rises from. */
  y?: number;
}

/** Fades and rises content into view once, when scrolled into the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  return (
    <m.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  );
}
