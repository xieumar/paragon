import { Container, Section } from "@/components/layout";
import { Pop, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib";
import { SectionHeading } from "./SectionHeading";
import { ValueIcon } from "./ValueIcon";

export interface ValuesData {
  eyebrow: string | null;
  heading: string | null;
  items: ReadonlyArray<{
    icon: string | null;
    title: string | null;
    description: string | null;
  }> | null;
}

/** Company values on a navy band: big icon in a soft circle, title, text. */
export function ValuesGrid({ data }: { data: ValuesData | null | undefined }) {
  const items = (data?.items ?? []).filter((i) => i.title && i.description);
  if (!data?.heading || items.length === 0) return null;

  const columns = items.length <= 4 ? items.length : 3;
  const divided = items.length <= 4;

  return (
    <Section className="bg-navy text-navy-foreground">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={data.eyebrow}
            heading={data.heading}
            className="mx-auto text-center"
          />
        </Reveal>

        <Stagger
          className="mt-16 grid gap-y-14 sm:grid-cols-2 md:grid-cols-(--cols)"
          style={
            {
              "--cols": `repeat(${columns}, minmax(0, 1fr))`,
            } as React.CSSProperties
          }
        >
          {items.map((item, i) => (
            <StaggerItem
              key={item.title}
              className={cn(
                "px-6 text-center lg:px-10",
                divided && "md:border-l md:border-white/15 md:first:border-l-0"
              )}
            >
              <Pop
                delay={i * 0.08}
                className="mx-auto mb-8 flex size-36 items-center justify-center rounded-full bg-white/10"
              >
                <ValueIcon
                  name={item.icon}
                  index={i}
                  className="size-16 text-white"
                />
              </Pop>
              <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-lg text-navy-foreground/70">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
