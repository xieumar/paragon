import { Heading } from "@/components/ui";
import { cn } from "@/lib";

/** Eyebrow + heading + intro used at the top of content sections. */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  className,
}: {
  eyebrow?: string | null;
  heading: string;
  intro?: string | null;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cta">
          {eyebrow}
        </p>
      )}
      <Heading as="h2" size="h1">
        {heading}
      </Heading>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
