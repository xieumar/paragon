import { Container } from "@/components/layout";
import { CountUp, Stagger, StaggerItem } from "@/components/motion";

export interface StatData {
  value: string | null;
  label: string | null;
}

/** A navy band of headline numbers. */
export function StatsStrip({ stats }: { stats: ReadonlyArray<StatData> }) {
  const items = stats.filter((s) => s.value && s.label);
  if (items.length === 0) return null;

  return (
    <section aria-label="Key figures" className="bg-navy text-navy-foreground">
      <Container className="py-14">
        <Stagger className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat) => (
            <StaggerItem key={`${stat.value}-${stat.label}`}>
              <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                <CountUp value={stat.value!} />
              </p>
              <p className="mt-2 text-sm text-navy-foreground/70">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
