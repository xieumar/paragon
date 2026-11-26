import { Container, Section } from "@/components/layout";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SanityImage } from "@/components/ui";
import { toImage, type ImageInput } from "@/sanity/image";
import { SectionHeading } from "./SectionHeading";

export interface TeamMemberData {
  _id: string;
  name: string | null;
  role: string | null;
  bio: string | null;
  linkedin: string | null;
  photo: ImageInput | null;
}

interface TeamGridProps {
  data: {
    eyebrow: string | null;
    heading: string | null;
    intro: string | null;
  } | null;
  members: ReadonlyArray<TeamMemberData>;
}

/** "Jane Doe" -> "JD". Used when a team member has no photo yet. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

/** Team: clean portraits with the name and role centred underneath. */
export function TeamGrid({ data, members }: TeamGridProps) {
  const people = members.filter((m) => m.name && m.role);
  if (!data?.heading || people.length === 0) return null;

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={data.eyebrow}
            heading={data.heading}
            intro={data.intro}
            className="mx-auto text-center"
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-x-8 gap-y-14 [grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))]">
          {people.map((person) => {
            const photo = toImage(person.photo);
            return (
              <StaggerItem key={person._id}>
                <article className="group text-center">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
                    {photo ? (
                      <SanityImage
                        image={photo}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="flex h-full w-full items-center justify-center bg-navy text-6xl font-bold tracking-tight text-white/90"
                      >
                        {initials(person.name!)}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-muted-foreground">{person.role}</p>
                  {person.bio && (
                    <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground">
                      {person.bio}
                    </p>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="mt-3 inline-block text-sm font-semibold text-cta underline-offset-4 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
