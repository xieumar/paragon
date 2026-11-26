"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button, Heading } from "@/components/ui";
import { ROUTES } from "@/constants";
import { cn } from "@/lib";

export interface ServiceShowcaseItem {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  image?: {
    src: string;
    alt: string;
    blurDataURL?: string;
    objectPosition?: string;
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Tabbed service showcase. Every panel is rendered in the same grid cell, so
 * the height never jumps; the active one fades in and the others are `inert`
 * (not focusable, hidden from assistive tech).
 */
export function ServiceShowcaseClient({
  services,
  label,
}: {
  services: ServiceShowcaseItem[];
  label: string;
}) {
  const baseId = useId();
  const count = services.length;
  const [active, setActive] = useState(0);

  const go = (index: number) => setActive((index + count) % count);

  const onTabKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
      document.getElementById(`${baseId}-tab-${(active + 1) % count}`)?.focus();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
      document
        .getElementById(`${baseId}-tab-${(active - 1 + count) % count}`)
        ?.focus();
    }
  };

  return (
    <div>
      <div className="grid">
        {services.map((service, i) => {
          const isActive = i === active;
          return (
            <div
              key={service.id}
              id={`${baseId}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${i}`}
              inert={!isActive}
              className={cn(
                "relative col-start-1 row-start-1 grid gap-8 transition-opacity duration-700 motion-reduce:transition-none lg:grid-cols-2 lg:gap-0",
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              {/* Oversized number straddling the photo/text seam. */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-5 top-3 z-10 select-none text-[6rem] font-bold leading-none tracking-tighter text-white/80 lg:left-1/2 lg:top-4 lg:-translate-x-1/2 lg:text-[11rem] lg:text-navy/20"
              >
                {pad(i + 1)}
              </span>

              <div className="relative min-h-[20rem] overflow-hidden rounded-3xl bg-secondary lg:min-h-[34rem]">
                {service.image && (
                  <Image
                    src={service.image.src}
                    alt={isActive ? service.image.alt : ""}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    placeholder={service.image.blurDataURL ? "blur" : "empty"}
                    blurDataURL={service.image.blurDataURL}
                    className={cn(
                      "object-cover transition-transform duration-[1600ms] ease-out motion-reduce:transition-none",
                      isActive ? "scale-100" : "scale-105"
                    )}
                    style={{ objectPosition: service.image.objectPosition }}
                  />
                )}
                {/* White tab with a vertical label, bottom-right of the photo. */}
                <div
                  aria-hidden
                  className="absolute bottom-0 right-0 hidden rounded-tl-3xl bg-background px-4 pb-6 pt-8 lg:block"
                >
                  <span className="text-sm font-bold uppercase tracking-[0.15em] [writing-mode:vertical-rl] rotate-180">
                    {label}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-6 lg:pl-20 lg:pr-4">
                <p
                  className={cn(
                    "flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-cta transition-all duration-700 delay-200 motion-reduce:transition-none",
                    isActive ? "translate-y-0" : "translate-y-3"
                  )}
                >
                  <span aria-hidden className="h-px w-10 bg-cta" />
                  Service {pad(i + 1)}
                </p>
                <Heading
                  as="h3"
                  size="h1"
                  className="lg:text-6xl lg:leading-[1.02]"
                >
                  {service.title}
                </Heading>
                {service.summary && (
                  <p className="max-w-md text-lg text-muted-foreground">
                    {service.summary}
                  </p>
                )}
                <Button size="xl" asChild className="mt-2 w-fit">
                  <Link href={`${ROUTES.services}/${service.slug}`}>
                    Explore service
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className="mt-10 lg:grid lg:grid-cols-2">
          <div className="flex items-center gap-6 lg:col-start-2 lg:pl-20">
            <div
              role="tablist"
              aria-label="Services"
              className="flex flex-wrap gap-x-5 gap-y-2"
              onKeyDown={onTabKeyDown}
            >
              {services.map((service, i) => (
                <button
                  key={service.id}
                  id={`${baseId}-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls={`${baseId}-panel-${i}`}
                  aria-label={service.title}
                  title={service.title}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative py-1.5 text-sm font-semibold tabular-nums transition-colors outline-none focus-visible:text-cta",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-cta after:transition-transform after:duration-300",
                    i === active
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground after:scale-x-0 hover:text-cta"
                  )}
                >
                  {pad(i + 1)}
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-3 lg:ml-6">
              {[
                { label: "Previous service", icon: ArrowLeft, step: -1 },
                { label: "Next service", icon: ArrowRight, step: 1 },
              ].map(({ label: ariaLabel, icon: Icon, step }) => (
                <button
                  key={ariaLabel}
                  type="button"
                  aria-label={ariaLabel}
                  onClick={() => go(active + step)}
                  className="flex size-10 items-center justify-center rounded-full border border-navy/30 text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
