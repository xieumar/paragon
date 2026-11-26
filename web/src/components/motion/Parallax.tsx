"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib";

/** Slides its content slower than the page scrolls, inside a clipped frame. */
export function Parallax({
  children,
  className,
  distance = 40,
}: WithChildren & { className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <m.div style={{ y, scale: 1.15 }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}
