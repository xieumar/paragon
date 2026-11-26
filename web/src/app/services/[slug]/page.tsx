import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BackLink, Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import {
  Capabilities,
  CtaBand,
  PageHero,
  ProcessSteps,
  SectionHeading,
} from "@/components/sections";
import { RichText, Skeleton } from "@/components/ui";
import { ROUTES } from "@/constants";
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

/**
 * `params` is request data, so it is read inside a Suspense boundary (required
 * by `cacheComponents`); known services are still generated ahead of time.
 */
export default function ServicePage({ params }: Props) {
  return (
    <Suspense fallback={<ServicePageSkeleton />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: Props) {
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
      <BackLink href={ROUTES.services}>All services</BackLink>
      <PageHero
        className="pt-6 sm:pt-8 lg:pt-10"
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

/** Shown while the service loads: header-shaped placeholders. */
function ServicePageSkeleton() {
  return (
    <Container className="space-y-6 py-16" aria-busy="true">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-16 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="mt-10 aspect-[4/3] w-full max-w-xl rounded-3xl" />
    </Container>
  );
}
