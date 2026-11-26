"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Odometer-style counter: every digit is a column of 0-9 that rolls up to its
 * final value when scrolled into view. Non-digit characters (prefix, commas,
 * decimal point, suffix such as "+" or "%") stay fixed.
 *
 * Size comes from the parent's font size (everything is in `em`).
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  // e.g. "$1,200+" -> prefix "$", number "1,200", suffix "+"
  const match = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return <span className={className}>{value}</span>;

  const [, prefix, number, suffix] = match;
  const show = inView || reduceMotion;
  let digitIndex = 0;

  return (
    <span
      ref={ref}
      className={`inline-flex items-center leading-none tabular-nums ${className ?? ""}`}
    >
      <span className="sr-only">{value}</span>
      <span aria-hidden className="inline-flex items-center leading-none">
        {prefix}
        {number.split("").map((char, i) => {
          if (!/\d/.test(char)) return <span key={i}>{char}</span>;
          const digit = Number(char);
          const order = digitIndex++;
          return (
            <span
              key={i}
              className="relative inline-block h-[1em] overflow-hidden leading-none"
            >
              <m.span
                className="flex flex-col"
                initial={{ y: 0 }}
                animate={{ y: show ? `${-digit}em` : 0 }}
                transition={{
                  duration: 1.6,
                  delay: order * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {DIGITS.map((d) => (
                  <span key={d} className="block h-[1em] leading-none">
                    {d}
                  </span>
                ))}
              </m.span>
            </span>
          );
        })}
        {suffix}
      </span>
    </span>
  );
}
