import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import {
  Capabilities,
  CtaBand,
  PageHero,
  ProcessSteps,
  SectionHeading,
} from "@/components/sections";
import { RichText } from "@/components/ui";
import { buildMetadata, toSeo } from "@/lib/seo";
import {
  getService,
  getServiceSlugs,
  getServicesPage,
  getSiteSettings,
} from "@/sanity/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.flatMap((s) => (s.slug ? [{ slug: s.slug }] : []));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([
    getService(slug),
    getSiteSettings(),
  ]);
  if (!service) return {};

  return buildMetadata({
    title: service.title ?? undefined,
    description: service.summary ?? undefined,
    path: `/services/${slug}`,
    seo: toSeo(service.seo),
    defaults: {
      siteName: settings?.siteName,
      seo: toSeo(settings?.defaultSeo),
    },
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [service, servicesPage] = await Promise.all([
    getService(slug),
    getServicesPage(),
  ]);

  if (!service || !service.title) notFound();

  const hasOverview = Array.isArray(service.overview)
    ? service.overview.length > 0
    : Boolean(service.overview);

  return (
    <>
      <PageHero
        data={{
          eyebrow: "Service",
          heading: service.title,
          intro: service.summary,
          image: service.image,
        }}
      />

      {hasOverview && (
        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <Reveal>
                <SectionHeading
                  eyebrow="Overview"
                  heading={`About ${service.title}`}
                  className="lg:sticky lg:top-28"
                />
              </Reveal>
              <Reveal delay={0.1}>
                <RichText
                  value={service.overview!}
                  className="text-lg text-muted-foreground"
                />
              </Reveal>
            </div>
          </Container>
        </Section>
      )}

      <Capabilities items={service.capabilities} />
      <ProcessSteps steps={service.processSteps} />
      <CtaBand data={servicesPage?.ctaBand} />
    </>
  );
}
