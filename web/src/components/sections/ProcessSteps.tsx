import { Container, Section } from "@/components/layout";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./SectionHeading";

export interface ProcessStepsData {
  steps: ReadonlyArray<{
    title: string | null;
    description: string | null;
  }> | null;
}

/** Numbered vertical stepper showing how a service is delivered. */
export function ProcessSteps({
  steps,
  heading = "How we work",
}: {
  steps: ProcessStepsData["steps"] | undefined;
  heading?: string;
}) {
  const items = (steps ?? []).filter((s) => s.title && s.description);
  if (items.length === 0) return null;

  return (
    <Section className="bg-navy text-navy-foreground">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Our process"
              heading={heading}
              className="lg:sticky lg:top-28"
            />
          </Reveal>

          <Stagger className="relative">
            <ol className="space-y-10">
              {items.map((step, i) => (
                <StaggerItem key={step.title}>
                  <li className="relative flex gap-6">
                    {i < items.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-6 top-14 h-[calc(100%+0.5rem)] w-px bg-white/20"
                      />
                    )}
                    <span
                      aria-hidden
                      className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-cta text-base font-bold tabular-nums text-cta-foreground"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pb-2 pt-1.5">
                      <h3 className="text-xl font-bold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-navy-foreground/70">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </StaggerItem>
              ))}
            </ol>
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
