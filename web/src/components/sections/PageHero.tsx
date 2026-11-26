import { Container } from "@/components/layout";
import { Parallax, Reveal, TextReveal } from "@/components/motion";
import { SanityImage } from "@/components/ui";
import { toImage, type ImageInput } from "@/sanity/image";

export interface PageHeroData {
  eyebrow: string | null;
  heading: string | null;
  intro: string | null;
  image: ImageInput | null;
}

/** Header at the top of an inner page: label, animated title, intro and photo. */
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
          <div>
            {data.eyebrow && (
              <Reveal y={12}>
                <p className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-cta">
                  <span aria-hidden className="h-px w-10 bg-cta" />
                  {data.eyebrow}
                </p>
              </Reveal>
            )}
            <TextReveal text={data.heading} as="h1" size="display" />
            {data.intro && (
              <Reveal delay={0.45}>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                  {data.intro}
                </p>
              </Reveal>
            )}
          </div>

          {image && (
            <Reveal delay={0.15}>
              <Parallax className="aspect-[4/3] rounded-3xl">
                <SanityImage
                  image={image}
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </Parallax>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
