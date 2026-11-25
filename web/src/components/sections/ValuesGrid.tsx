import { Container, Section } from "@/components/layout";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./SectionHeading";

export interface ValuesData {
  eyebrow: string | null;
  heading: string | null;
  items: ReadonlyArray<{
    title: string | null;
    description: string | null;
  }> | null;
}

/** Company values as big numbered statements on a navy band. */
export function ValuesGrid({ data }: { data: ValuesData | null | undefined }) {
  const items = (data?.items ?? []).filter((i) => i.title && i.description);
  if (!data?.heading || items.length === 0) return null;

  return (
    <Section className="bg-navy text-navy-foreground">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} />
        </Reveal>

        <Stagger className="mt-14 border-t border-white/15">
          {items.map((item, i) => (
            <StaggerItem key={item.title}>
              <div className="group grid gap-4 border-b border-white/15 py-8 transition-colors hover:bg-white/5 sm:py-10 lg:grid-cols-[8rem_1fr_1.2fr] lg:items-baseline lg:gap-10 lg:px-4">
                <p
                  aria-hidden
                  className="text-5xl font-bold leading-none tracking-tighter text-cta tabular-nums transition-transform duration-300 group-hover:translate-x-2 lg:text-6xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {item.title}
                </h3>
                <p className="text-lg text-navy-foreground/70">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
