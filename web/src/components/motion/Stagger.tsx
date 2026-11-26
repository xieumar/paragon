"use client";

import * as m from "motion/react-m";
import { cn } from "@/lib";

interface StaggerProps extends WithChildren {
  className?: string;
  /** Seconds between each child's entrance. */
  interval?: number;
  style?: React.CSSProperties;
}

const container = (interval: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: interval } },
});

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

/** Reveals its `StaggerItem` children one after another when scrolled into view. */
export function Stagger({
  children,
  className,
  interval = 0.08,
  style,
}: StaggerProps) {
  return (
    <m.div
      className={cn(className)}
      style={style}
      variants={container(interval)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
}: WithChildren & { className?: string }) {
  return (
    <m.div className={cn(className)} variants={item}>
      {children}
    </m.div>
  );
}
