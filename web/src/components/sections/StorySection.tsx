import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { RichText } from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

type RichTextValue = React.ComponentProps<typeof RichText>["value"];

export interface StoryData {
  eyebrow: string | null;
  heading: string | null;
  body: RichTextValue | null;
}

/** Long-form "our story": heading on the left, rich text on the right. */
export function StorySection({ data }: { data: StoryData | null | undefined }) {
  if (!data?.heading || !data.body) return null;
  if (Array.isArray(data.body) && data.body.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow={data.eyebrow}
              heading={data.heading}
              className="lg:sticky lg:top-28"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <RichText
              value={data.body}
              className="text-lg text-muted-foreground"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
