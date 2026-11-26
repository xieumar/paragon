import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { Heading } from "@/components/ui";
import { HeroCta } from "./HeroCta";

export interface CtaBandData {
  heading: string | null;
  text: string | null;
  cta: { label: string | null; href: string | null } | null;
}

/** Closing call to action: heading on the left, supporting text and button on the right. */
export function CtaBand({ data }: { data: CtaBandData | null | undefined }) {
  if (!data?.heading) return null;

  return (
    <Section>
      <Container>
        <Reveal>
          <div className="grid items-center gap-10 rounded-3xl bg-secondary px-6 py-14 sm:px-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-16 lg:py-20">
            <div>
              <span
                aria-hidden
                className="mb-6 block h-1 w-12 rounded-full bg-cta"
              />
              <Heading as="h2" size="h1">
                {data.heading}
              </Heading>
            </div>
            <div className="flex flex-col items-start gap-8">
              {data.text && (
                <p className="text-lg text-muted-foreground">{data.text}</p>
              )}
              {data.cta?.label && data.cta.href && (
                <HeroCta label={data.cta.label} href={data.cta.href} />
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
