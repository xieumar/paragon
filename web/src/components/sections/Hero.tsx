import { Container } from "@/components/layout";
import { toImage, urlFor, type ImageInput } from "@/sanity/image";
import { HeroCarousel, type HeroSlideView } from "./HeroCarousel";
import { HeroCta } from "./HeroCta";

interface HeroSlideInput {
  layout: "overlay" | "split" | null;
  eyebrow: string | null;
  headline: string | null;
  subcopy: string | null;
  cta: { label: string | null; href: string | null } | null;
  image: ImageInput | null;
  badge: string | null;
}

/**
 * Home hero. Prepares CMS slides on the server (image URLs, CTA markup) and
 * hands render-ready data to the client carousel. Slides missing a headline
 * or image are skipped so a half-finished slide never breaks the page.
 */
export function Hero({
  slides,
}: {
  slides: ReadonlyArray<HeroSlideInput> | null | undefined;
}) {
  const views = (slides ?? []).flatMap((slide): HeroSlideView[] => {
    const image = toImage(slide.image);
    if (!image || !slide.headline) return [];

    return [
      {
        layout: slide.layout ?? "overlay",
        eyebrow: slide.eyebrow ?? undefined,
        headline: slide.headline,
        subcopy: slide.subcopy ?? undefined,
        badge: slide.badge ?? undefined,
        cta:
          slide.cta?.label && slide.cta.href ? (
            <HeroCta label={slide.cta.label} href={slide.cta.href} />
          ) : undefined,
        image: {
          src: urlFor(image)
            .width(Math.min(image.width, 2000))
            .auto("format")
            .url(),
          alt: image.alt,
          width: image.width,
          height: image.height,
          blurDataURL: image.lqip,
          objectPosition: image.hotspot
            ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
            : undefined,
        },
      },
    ];
  });

  if (views.length === 0) return null;

  return (
    <section aria-label="Introduction" className="pt-4 sm:pt-6">
      <Container>
        <HeroCarousel slides={views} />
      </Container>
    </section>
  );
}
