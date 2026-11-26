import { Container, Section } from "@/components/layout";
import { toImage, urlFor, type ImageInput } from "@/sanity/image";
import { TestimonialStack, type TestimonialView } from "./TestimonialStack";

export interface TestimonialData {
  _id: string;
  quote: string | null;
  name: string | null;
  role: string | null;
  company: string | null;
  photo: ImageInput | null;
}

export interface TestimonialBlockData {
  eyebrow: string | null;
  heading: string | null;
  items: ReadonlyArray<TestimonialData | null> | null;
}

/** Testimonial block: every chosen quote, as a scroll-driven card stack. */
export function Testimonial({
  data,
}: {
  data: TestimonialBlockData | null | undefined;
}) {
  const items = (data?.items ?? []).flatMap((t): TestimonialView[] => {
    if (!t?.quote || !t.name) return [];
    const photo = toImage(t.photo);
    return [
      {
        id: t._id,
        quote: t.quote,
        name: t.name,
        byline: [t.role, t.company].filter(Boolean).join(", ") || undefined,
        photo: photo
          ? {
              src: urlFor(photo)
                .width(160)
                .height(160)
                .fit("crop")
                .auto("format")
                .url(),
              blurDataURL: photo.lqip,
            }
          : undefined,
      },
    ];
  });
  if (items.length === 0) return null;

  return (
    <Section className="bg-secondary">
      <Container>
        <TestimonialStack
          eyebrow={data?.eyebrow ?? undefined}
          heading={data?.heading ?? undefined}
          items={items}
        />
      </Container>
    </Section>
  );
}
