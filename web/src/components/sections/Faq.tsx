import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { SectionHeading } from "./SectionHeading";

export interface FaqData {
  eyebrow: string | null;
  heading: string | null;
  intro: string | null;
  items: ReadonlyArray<{
    question: string | null;
    answer: string | null;
  }> | null;
}

/** Frequently asked questions: heading on the left, accordion on the right. */
export function Faq({ data }: { data: FaqData | null | undefined }) {
  const items = (data?.items ?? []).filter((i) => i.question && i.answer);
  if (!data?.heading || items.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow={data.eyebrow}
              heading={data.heading}
              intro={data.intro}
              className="lg:sticky lg:top-28"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion
              type="single"
              collapsible
              className="border-t border-border"
            >
              {items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
