import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { Button, Heading, SanityImage } from "@/components/ui";
import { ROUTES } from "@/constants";
import { cn } from "@/lib";
import { toImage } from "@/sanity/image";
import type { ServiceCardData } from "./ServiceGrid";

/** Services as large alternating rows: photo on one side, details on the other. */
export function ServiceList({
  services,
}: {
  services: ReadonlyArray<ServiceCardData>;
}) {
  const items = services.filter((s) => s.title && s.slug);
  if (items.length === 0) return null;

  return (
    <Section className="pt-8 sm:pt-12">
      <Container className="space-y-20 lg:space-y-28">
        {items.map((service, i) => {
          const image = toImage(service.image);
          const flip = i % 2 === 1;
          const number = String(i + 1).padStart(2, "0");

          return (
            <Reveal key={service._id}>
              <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                <Link
                  href={`${ROUTES.services}/${service.slug}`}
                  tabIndex={-1}
                  aria-hidden
                  className={cn(
                    "group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-secondary",
                    flip && "lg:order-2"
                  )}
                >
                  {image && (
                    <SanityImage
                      image={image}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute left-5 top-3 text-8xl font-bold leading-none tracking-tighter text-white/80 lg:text-9xl"
                  >
                    {number}
                  </span>
                </Link>

                <div className="flex flex-col gap-5">
                  <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-cta">
                    <span aria-hidden className="h-px w-10 bg-cta" />
                    Service {number}
                  </p>
                  <Heading as="h2" size="h1">
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
              </article>
            </Reveal>
          );
        })}
      </Container>
    </Section>
  );
}
