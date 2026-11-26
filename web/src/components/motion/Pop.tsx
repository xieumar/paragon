"use client";

import * as m from "motion/react-m";

/** Springs in when scrolled into view; lifts and tilts slightly on hover. */
export function Pop({
  children,
  className,
  delay = 0,
}: WithChildren & { className?: string; delay?: number }) {
  return (
    <m.div
      className={className}
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 220, damping: 14, delay }}
      whileHover={{ y: -6, rotate: -4 }}
    >
      {children}
    </m.div>
  );
}
