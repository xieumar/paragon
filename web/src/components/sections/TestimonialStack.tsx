"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib";

export interface TestimonialView {
  id: string;
  quote: string;
  name: string;
  byline?: string;
  photo?: { src: string; blurDataURL?: string };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Scroll-driven testimonial stack: each card pins near the top and the next
 * one slides over it while the cards underneath shrink slightly. A pinned
 * heading on the left shows which testimonial you are on.
 */
export function TestimonialStack({
  eyebrow,
  heading,
  items,
}: {
  eyebrow?: string;
  heading?: string;
  items: TestimonialView[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const count = items.length;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(value * count)));
    if (next !== active) setActive(next);
  });

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cta">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
        )}
        {count > 1 && (
          <div className="mt-8 hidden items-center gap-4 lg:flex" aria-hidden>
            <span className="text-sm font-semibold tabular-nums">
              {pad(active + 1)}
            </span>
            <span className="relative h-px w-28 bg-navy/15">
              <m.span
                className="absolute inset-y-0 left-0 h-0.5 w-full origin-left -translate-y-1/4 bg-cta"
                style={{ scaleX: scrollYProgress }}
              />
            </span>
            <span className="text-sm font-semibold tabular-nums text-muted-foreground">
              {pad(count)}
            </span>
          </div>
        )}
      </div>

      <div ref={ref} className="relative">
        {items.map((item, i) => (
          <StackCard
            key={item.id}
            item={item}
            index={i}
            count={count}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function StackCard({
  item,
  index,
  count,
  progress,
}: {
  item: TestimonialView;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const stacked = count > 1;
  // Cards further back end up smaller, so the stack reads as layers.
  const targetScale = 1 - (count - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / count, 1], [1, targetScale]);

  return (
    <div
      className={cn(
        stacked && "sticky flex min-h-[60vh] items-start lg:min-h-[70vh]"
      )}
      style={stacked ? { top: `calc(7rem + ${index * 1.25}rem)` } : undefined}
    >
      <m.figure
        style={{
          scale: stacked && !reduceMotion ? scale : 1,
          transformOrigin: "top center",
        }}
        className="relative w-full rounded-3xl border bg-background p-8 sm:p-12"
      >
        <div className="flex items-start justify-between gap-6">
          <span
            aria-hidden
            className="flex size-12 items-center justify-center rounded-full bg-cta text-cta-foreground"
          >
            <Quote className="size-5" />
          </span>
          {stacked && (
            <span
              aria-hidden
              className="text-5xl font-bold leading-none tracking-tighter text-navy/10 tabular-nums"
            >
              {pad(index + 1)}
            </span>
          )}
        </div>
        <blockquote className="mt-8 text-xl font-semibold leading-snug tracking-tight text-balance sm:text-2xl">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-4 border-t pt-6">
          {item.photo && (
            <Image
              src={item.photo.src}
              alt=""
              width={56}
              height={56}
              placeholder={item.photo.blurDataURL ? "blur" : "empty"}
              blurDataURL={item.photo.blurDataURL}
              className="size-14 rounded-full object-cover"
            />
          )}
          <span>
            <span className="block font-semibold">{item.name}</span>
            {item.byline && (
              <span className="block text-sm text-muted-foreground">
                {item.byline}
              </span>
            )}
          </span>
        </figcaption>
      </m.figure>
    </div>
  );
}
