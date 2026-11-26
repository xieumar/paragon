import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { toImage, urlFor } from "@/sanity/image";
import { SectionHeading } from "./SectionHeading";
import type { ServiceCardData } from "./ServiceGrid";
import {
  ServiceShowcaseClient,
  type ServiceShowcaseItem,
} from "./ServiceShowcaseClient";

interface ServiceShowcaseProps {
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  services: ReadonlyArray<ServiceCardData>;
}

/**
 * Services as a showcase: one large feature at a time (photo, oversized
 * number, title, summary, button) with numbered tabs to switch.
 */
export function ServiceShowcase({
  eyebrow,
  heading,
  intro,
  services,
}: ServiceShowcaseProps) {
  const items = services.flatMap((service): ServiceShowcaseItem[] => {
    if (!service.title || !service.slug) return [];
    const image = toImage(service.image);
    return [
      {
        id: service._id,
        title: service.title,
        slug: service.slug,
        summary: service.summary ?? undefined,
        image: image
          ? {
              src: urlFor(image)
                .width(Math.min(image.width, 1400))
                .auto("format")
                .url(),
              alt: image.alt,
              blurDataURL: image.lqip,
              objectPosition: image.hotspot
                ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
                : undefined,
            }
          : undefined,
      },
    ];
  });
  if (items.length === 0) return null;

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />
        </Reveal>
        <Reveal className="mt-12" delay={0.1}>
          <ServiceShowcaseClient
            services={items}
            label={eyebrow ?? "Our services"}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
