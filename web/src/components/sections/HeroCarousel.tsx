"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FocusEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui";
import { cn } from "@/lib";

const AUTOPLAY_MS = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;

export interface HeroSlideView {
  layout: "overlay" | "split";
  eyebrow?: string;
  headline: string;
  subcopy?: string;
  badge?: string;
  /** Pre-rendered on the server so this client component stays link-agnostic. */
  cta?: ReactNode;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL?: string;
    objectPosition?: string;
  };
}

/**
 * Hero carousel. Slides crossfade inside one fixed-height frame, so switching
 * between the overlay and split layouts never makes the page jump. Autoplay
 * stops on hover/keyboard focus and for visitors who prefer reduced motion.
 */
export function HeroCarousel({ slides }: { slides: HeroSlideView[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false); // hover or keyboard focus inside
  const reduceMotion = useReducedMotion();

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + count) % count),
    [count]
  );

  const autoplaying = count > 1 && !engaged && !reduceMotion;

  useEffect(() => {
    if (!autoplaying) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
    // `index` restarts the timer after a manual change.
  }, [autoplaying, go, index]);

  const slide = slides[index];
  const light = slide.layout === "overlay";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative h-[44rem] overflow-hidden rounded-3xl bg-secondary sm:h-[40rem] lg:h-[42rem]"
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={(event: FocusEvent) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setEngaged(false);
        }
      }}
    >
      {/* Slides overlap while crossfading (default "sync" mode). */}
      <AnimatePresence initial={false}>
        <m.div
          key={index}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${count}`}
          aria-live={autoplaying ? "off" : "polite"}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {slide.layout === "split" ? (
            <SplitSlide slide={slide} priority={index === 0} />
          ) : (
            <OverlaySlide slide={slide} priority={index === 0} />
          )}
        </m.div>
      </AnimatePresence>

      {/* Controls live outside the slides so they don't flicker on change. */}
      {count > 1 && (
        <div
          className={cn(
            "absolute z-10 transition-colors duration-500",
            light
              ? "inset-x-0 bottom-6 flex justify-center px-6"
              : "bottom-6 left-6 sm:left-10 lg:left-24"
          )}
        >
          <Controls
            tone={light ? "light" : "dark"}
            index={index}
            count={count}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        </div>
      )}
    </div>
  );
}

/** Content rises in shortly after the slide starts fading in. */
function Rise({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/** Photo that eases from slightly zoomed to rest while the slide fades in. */
function SettlingPhoto({
  image,
  sizes,
  priority,
  className,
}: {
  image: HeroSlideView["image"];
  sizes: string;
  priority: boolean;
  className?: string;
}) {
  return (
    <m.div
      className={cn("absolute inset-0", className)}
      initial={{ scale: 1.06 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.6, ease: EASE }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        placeholder={image.blurDataURL ? "blur" : "empty"}
        blurDataURL={image.blurDataURL}
        className="object-cover"
        style={{ objectPosition: image.objectPosition }}
      />
    </m.div>
  );
}

interface SlideProps {
  slide: HeroSlideView;
  priority: boolean;
}

/** Full-width photo under a navy overlay with centred text. */
function OverlaySlide({ slide, priority }: SlideProps) {
  return (
    <div className="relative isolate flex h-full items-center justify-center overflow-hidden">
      <SettlingPhoto image={slide.image} sizes="100vw" priority={priority} />
      <div aria-hidden className="absolute inset-0 bg-navy/75" />

      <Rise className="relative mx-auto max-w-3xl px-6 pb-24 pt-16 text-center text-white">
        {slide.eyebrow && (
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
            {slide.eyebrow}
          </p>
        )}
        <Heading as="h1" size="display" className="text-white">
          {slide.headline}
        </Heading>
        {slide.subcopy && (
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
            {slide.subcopy}
          </p>
        )}
        {slide.cta && <div className="mt-9">{slide.cta}</div>}
      </Rise>

      {slide.badge && (
        <div
          aria-hidden
          className="absolute right-6 top-6 hidden size-24 items-center justify-center rounded-full bg-cta p-3 text-center text-[11px] font-bold uppercase leading-tight tracking-wide text-cta-foreground sm:flex lg:right-16 lg:top-12"
        >
          {slide.badge}
        </div>
      )}
    </div>
  );
}

/** Text on the left, full-height photo on the right (photo on top on phones). */
function SplitSlide({ slide, priority }: SlideProps) {
  return (
    <div className="grid h-full grid-rows-[13rem_1fr] bg-secondary sm:grid-rows-[15rem_1fr] lg:grid-cols-2 lg:grid-rows-1">
      <div className="relative order-first overflow-hidden lg:order-last">
        <SettlingPhoto
          image={slide.image}
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority}
        />
      </div>

      <div className="relative flex flex-col justify-center px-6 pb-20 pt-6 sm:px-10 lg:pb-12 lg:pl-24 lg:pr-12 lg:pt-12">
        {slide.eyebrow && (
          <div
            aria-hidden
            className="absolute bottom-10 left-8 top-10 hidden items-center gap-4 border-l border-border pl-4 lg:flex"
          >
            <p className="rotate-180 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground [writing-mode:vertical-rl]">
              {slide.eyebrow}
            </p>
          </div>
        )}
        <Rise className="flex flex-col gap-5">
          {slide.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:hidden">
              {slide.eyebrow}
            </p>
          )}
          <Heading as="h1" size="display">
            {slide.headline}
          </Heading>
          {slide.subcopy && (
            <p className="max-w-md text-lg text-muted-foreground">
              {slide.subcopy}
            </p>
          )}
          {slide.cta && <div className="mt-2">{slide.cta}</div>}
        </Rise>
      </div>
    </div>
  );
}

interface ControlsProps {
  tone: "light" | "dark";
  index: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
}

/** Previous/next arrows around a `01 ── 03` counter with a progress line. */
function Controls({ tone, index, count, onPrev, onNext }: ControlsProps) {
  const light = tone === "light";
  const button = cn(
    "flex size-10 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta",
    light
      ? "border-white/40 text-white hover:bg-white hover:text-navy"
      : "border-navy/30 text-navy hover:bg-navy hover:text-white"
  );
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className={cn(
        "flex items-center gap-4 transition-colors duration-500",
        light ? "text-white" : "text-navy"
      )}
    >
      <button
        type="button"
        onClick={onPrev}
        className={button}
        aria-label="Previous slide"
      >
        <ArrowLeft className="size-4" />
      </button>
      <div
        className="flex items-center gap-3 text-sm font-semibold tabular-nums"
        aria-hidden
      >
        <span>{pad(index + 1)}</span>
        <span
          className={cn(
            "relative h-px w-16 sm:w-24",
            light ? "bg-white/30" : "bg-navy/20"
          )}
        >
          <span
            className="absolute inset-y-0 left-0 h-0.5 -translate-y-1/4 bg-cta transition-all duration-500"
            style={{ width: `${((index + 1) / count) * 100}%` }}
          />
        </span>
        <span>{pad(count)}</span>
      </div>
      <button
        type="button"
        onClick={onNext}
        className={button}
        aria-label="Next slide"
      >
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
