import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button, SanityImage } from "@/components/ui";
import { ROUTES } from "@/constants";
import { toImage, type ImageInput } from "@/sanity/image";
import { SectionHeading } from "./SectionHeading";

export interface ServiceCardData {
  _id: string;
  title: string | null;
  slug: string | null;
  summary: string | null;
  image: ImageInput | null;
}

interface ServiceGridProps {
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  services: ReadonlyArray<ServiceCardData>;
  /** Show a "View all services" button under the grid. */
  showAllLink?: boolean;
}

/** Grid of service cards linking to each service page. */
export function ServiceGrid({
  eyebrow,
  heading,
  intro,
  services,
  showAllLink = true,
}: ServiceGridProps) {
  const cards = services.filter((s) => s.title && s.slug);
  if (cards.length === 0) return null;

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((service) => {
            const image = toImage(service.image);
            return (
              <StaggerItem key={service._id}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg">
                  {image && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <SanityImage
                        image={image}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="text-xl font-bold tracking-tight">
                      <Link
                        href={`${ROUTES.services}/${service.slug}`}
                        className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
                      >
                        {service.title}
                      </Link>
                    </h3>
                    {service.summary && (
                      <p className="text-muted-foreground">{service.summary}</p>
                    )}
                    <span
                      aria-hidden
                      className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-cta"
                    >
                      Learn more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        {showAllLink && (
          <Reveal className="mt-10">
            <Button variant="outline" size="xl" asChild>
              <Link href={ROUTES.services}>View all services</Link>
            </Button>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
