import type { Metadata } from "next";
import { Container } from "@/components/layout";
import {
  About,
  CtaBand,
  Faq,
  Hero,
  LogoStrip,
  ServiceShowcase,
  StatsStrip,
  Testimonial,
} from "@/components/sections";
import { Heading } from "@/components/ui";
import { buildMetadata, toSeo } from "@/lib/seo";
import { getHomePage, getSiteSettings } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    path: "/",
    seo: toSeo(home?.seo),
    defaults: {
      siteName: settings?.siteName,
      seo: toSeo(settings?.defaultSeo),
    },
  });
}

export default async function HomePage() {
  const home = await getHomePage();

  if (!home?.heroSlides?.length) {
    return (
      <Container className="flex flex-1 flex-col items-start justify-center gap-4 py-24">
        <Heading as="h1" size="h1">
          Welcome
        </Heading>
        <p className="max-w-md text-lg text-muted-foreground">
          The home page has not been published yet. Add content to the
          &ldquo;Home page&rdquo; document in Sanity Studio and publish it.
        </p>
      </Container>
    );
  }

  return (
    <>
      <Hero slides={home.heroSlides} />
      <About data={home.about} />
      {home.stats && <StatsStrip stats={home.stats} />}
      {home.servicesHeading && home.featuredServices && (
        <ServiceShowcase
          eyebrow={home.servicesEyebrow}
          heading={home.servicesHeading}
          intro={home.servicesIntro}
          services={home.featuredServices}
        />
      )}
      <Testimonial testimonial={home.featuredTestimonial} />
      {home.clientLogos && <LogoStrip logos={home.clientLogos} />}

      <Faq data={home.faq} />
      <CtaBand data={home.ctaBand} />
    </>
  );
}
