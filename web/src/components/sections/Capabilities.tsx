import { Check } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./SectionHeading";

/** Ticked grid of what a service includes. */
export function Capabilities({
  items,
  heading = "What's included",
}: {
  items: ReadonlyArray<string> | null | undefined;
  heading?: string;
}) {
  const list = (items ?? []).filter(Boolean);
  if (list.length === 0) return null;

  return (
    <Section className="bg-secondary">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Capabilities" heading={heading} />
        </Reveal>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
            <StaggerItem key={item}>
              <div className="flex h-full items-start gap-4 rounded-2xl bg-background p-6">
                <span
                  aria-hidden
                  className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-cta text-cta-foreground"
                >
                  <Check className="size-4" />
                </span>
                <p className="font-semibold">{item}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
