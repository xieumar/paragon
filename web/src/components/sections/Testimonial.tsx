import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { SanityImage } from "@/components/ui";
import { toImage, type ImageInput } from "@/sanity/image";

export interface TestimonialData {
  _id: string;
  quote: string | null;
  name: string | null;
  role: string | null;
  company: string | null;
  photo: ImageInput | null;
}

/** A single large client quote. */
export function Testimonial({
  testimonial,
}: {
  testimonial: TestimonialData | null | undefined;
}) {
  if (!testimonial?.quote || !testimonial.name) return null;

  const photo = toImage(testimonial.photo);
  const byline = [testimonial.role, testimonial.company]
    .filter(Boolean)
    .join(", ");

  return (
    <Section className="bg-secondary">
      <Container>
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="text-2xl font-semibold leading-snug tracking-tight text-balance sm:text-3xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              {photo && (
                <SanityImage
                  image={photo}
                  sizes="56px"
                  className="size-14 rounded-full object-cover"
                />
              )}
              <span className="text-left">
                <span className="block font-semibold">{testimonial.name}</span>
                {byline && (
                  <span className="block text-sm text-muted-foreground">
                    {byline}
                  </span>
                )}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
