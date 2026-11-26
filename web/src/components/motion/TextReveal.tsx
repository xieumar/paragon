"use client";

import * as m from "motion/react-m";
import { headingVariants } from "@/components/ui";
import { cn } from "@/lib";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Heading whose words rise into place one after another on load.
 * Screen readers get the full text through `aria-label`.
 */
export function TextReveal({
  text,
  as: Tag = "h1",
  size = "display",
  className,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2";
  size?: "display" | "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <Tag aria-label={text} className={cn(headingVariants({ size }), className)}>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <m.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                ease: EASE,
                delay: delay + i * 0.07,
              }}
            >
              {word}
            </m.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
