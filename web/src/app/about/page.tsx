import type { Metadata } from "next";
import { Container } from "@/components/layout";
import {
  CtaBand,
  PageHero,
  StorySection,
  TeamGrid,
  Testimonial,
  ValuesGrid,
} from "@/components/sections";
import { Heading } from "@/components/ui";
import { buildMetadata, toSeo } from "@/lib/seo";
import {
  getAboutPage,
  getSiteSettings,
  getTeamMembers,
} from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const [about, settings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    title: about?.header?.heading ?? "About",
    description: about?.header?.intro ?? undefined,
    path: "/about",
    seo: toSeo(about?.seo),
    defaults: {
      siteName: settings?.siteName,
      seo: toSeo(settings?.defaultSeo),
    },
  });
}

export default async function AboutPage() {
  const [about, members] = await Promise.all([
    getAboutPage(),
    getTeamMembers(),
  ]);

  const chosen = about?.team?.members?.filter(Boolean) ?? [];
  const team = chosen.length > 0 ? chosen : members;

  if (!about?.header?.heading) {
    return (
      <Container className="flex flex-1 flex-col items-start justify-center gap-4 py-24">
        <Heading as="h1" size="h1">
          About
        </Heading>
        <p className="max-w-md text-lg text-muted-foreground">
          The About page has not been published yet. Add content to the
          &ldquo;About page&rdquo; document in Sanity Studio and publish it.
        </p>
      </Container>
    );
  }

  return (
    <>
      <PageHero data={about.header} />
      <StorySection data={about.story} />
      <ValuesGrid data={about.values} />
      <TeamGrid data={about.team} members={team} />
      <Testimonial data={about.testimonials} />
      <CtaBand data={about.ctaBand} />
    </>
  );
}
