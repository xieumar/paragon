import { ArrowRight, Check } from "lucide-react";
import { Container, Section, SiteLink } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { Button, SanityImage } from "@/components/ui";
import { toImage, type ImageInput } from "@/sanity/image";
import { SectionHeading } from "./SectionHeading";

export interface AboutData {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  highlights: ReadonlyArray<string> | null;
  image: ImageInput | null;
  cta: { label: string | null; href: string | null } | null;
}

/** Short introduction to the company: photo on one side, text on the other. */
export function About({ data }: { data: AboutData | null | undefined }) {
  if (!data?.heading) return null;

  const image = toImage(data.image);
  const paragraphs = (data.body ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const highlights = (data.highlights ?? []).filter(Boolean);

  return (
    <Section>
      <Container>
        <div
          className={
            image
              ? "grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
              : "max-w-3xl"
          }
        >
          {image && (
            <Reveal>
              <div className="relative">
                <SanityImage
                  image={image}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[4/5] w-full rounded-3xl object-cover"
                />
                <span
                  aria-hidden
                  className="absolute -bottom-3 -right-3 -z-10 hidden h-1/2 w-1/2 rounded-3xl bg-secondary lg:block"
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <SectionHeading eyebrow={data.eyebrow} heading={data.heading} />
            {paragraphs.length > 0 && (
              <div className="mt-6 space-y-4 text-lg text-muted-foreground">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            {highlights.length > 0 && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-cta text-cta-foreground"
                    >
                      <Check className="size-3.5" />
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {data.cta?.label && data.cta.href && (
              <Button size="xl" asChild className="mt-10">
                <SiteLink href={data.cta.href}>
                  {data.cta.label}
                  <ArrowRight className="size-4" />
                </SiteLink>
              </Button>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
