import type { Metadata } from "next";
import { Container } from "@/components/layout";
import {
  CtaBand,
  Faq,
  LogoStrip,
  PageHero,
  ServiceList,
  Testimonial,
} from "@/components/sections";
import { Heading } from "@/components/ui";
import { buildMetadata, toSeo } from "@/lib/seo";
import {
  getServices,
  getServicesPage,
  getSiteSettings,
} from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getServicesPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    title: page?.header?.heading ?? "Services",
    description: page?.header?.intro ?? undefined,
    path: "/services",
    seo: toSeo(page?.seo),
    defaults: {
      siteName: settings?.siteName,
      seo: toSeo(settings?.defaultSeo),
    },
  });
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getServicesPage(),
    getServices(),
  ]);

  if (!page?.header?.heading) {
    return (
      <Container className="flex flex-1 flex-col items-start justify-center gap-4 py-24">
        <Heading as="h1" size="h1">
          Services
        </Heading>
        <p className="max-w-md text-lg text-muted-foreground">
          The Services page has not been published yet. Add content to the
          &ldquo;Services page&rdquo; document in Sanity Studio and publish it.
        </p>
      </Container>
    );
  }

  return (
    <>
      <PageHero data={page.header} />
      {page.clientLogos && <LogoStrip logos={page.clientLogos} />}
      <ServiceList services={services} />
      <Testimonial data={page.testimonials} />
      <Faq data={page.faq} />
      <CtaBand data={page.ctaBand} />
    </>
  );
}
