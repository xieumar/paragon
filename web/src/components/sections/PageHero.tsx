import { Container } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { Heading, SanityImage } from "@/components/ui";
import { toImage, type ImageInput } from "@/sanity/image";

export interface PageHeroData {
  eyebrow: string | null;
  heading: string | null;
  intro: string | null;
  image: ImageInput | null;
}

/** Header at the top of an inner page: label, big title, intro and optional photo. */
export function PageHero({ data }: { data: PageHeroData | null | undefined }) {
  if (!data?.heading) return null;
  const image = toImage(data.image);

  return (
    <section className="pb-8 pt-12 sm:pt-16 lg:pt-20">
      <Container>
        <div
          className={
            image
              ? "grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
              : "max-w-4xl"
          }
        >
          <Reveal>
            {data.eyebrow && (
              <p className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-cta">
                <span aria-hidden className="h-px w-10 bg-cta" />
                {data.eyebrow}
              </p>
            )}
            <Heading as="h1" size="display">
              {data.heading}
            </Heading>
            {data.intro && (
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                {data.intro}
              </p>
            )}
          </Reveal>

          {image && (
            <Reveal delay={0.1}>
              <SanityImage
                image={image}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full rounded-3xl object-cover"
              />
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
