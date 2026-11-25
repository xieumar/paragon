import { Container } from "@/components/layout";
import { SanityImage } from "@/components/ui";
import { toImage, type ImageInput } from "@/sanity/image";

/** Minimum logos per group so the loop always fills a wide screen. */
const MIN_PER_GROUP = 8;

/** A continuous, slowly scrolling row of client logos. */
export function LogoStrip({ logos }: { logos: ReadonlyArray<ImageInput> }) {
  const images = logos.flatMap((logo) => {
    const image = toImage(logo);
    return image ? [image] : [];
  });
  if (images.length === 0) return null;

  // Repeat the set so one group is wide enough, then render two identical
  // groups: the second is hidden from assistive tech and used only for the loop.
  const repeats = Math.ceil(MIN_PER_GROUP / images.length);
  const group = Array.from({ length: repeats }, () => images).flat();
  // Keep the visual speed steady regardless of how many logos there are.
  const duration = `${Math.max(24, group.length * 5)}s`;

  const renderGroup = (duplicate: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-16 pr-16"
      aria-hidden={duplicate || undefined}
      data-duplicate={duplicate || undefined}
    >
      {group.map((image, i) => (
        <li key={`${image.asset._ref}-${i}`} className="shrink-0">
          <SanityImage
            image={image}
            alt={duplicate ? "" : image.alt}
            sizes="160px"
            className="h-9 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Our clients" className="py-14">
      <Container>
        <div className="marquee overflow-hidden">
          <div
            className="marquee-track"
            style={{ "--marquee-duration": duration } as React.CSSProperties}
          >
            {renderGroup(false)}
            {renderGroup(true)}
          </div>
        </div>
      </Container>
    </section>
  );
}
