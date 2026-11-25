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

/** Grid of team members with portrait, role, short bio and LinkedIn link. */
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
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
          {people.map((person) => {
            const photo = toImage(person.photo);
            return (
              <StaggerItem key={person._id}>
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
                    {photo ? (
                      <SanityImage
                        image={photo}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
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
                  <h3 className="mt-5 text-lg font-bold tracking-tight">
                    {person.name}
                  </h3>
                  <p className="text-sm font-medium text-cta">{person.role}</p>
                  {person.bio && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {person.bio}
                    </p>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="mt-3 inline-block text-sm font-semibold underline-offset-4 hover:text-cta hover:underline"
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
