import type { Metadata } from "next";
import { Container, Section } from "@/components/layout";
import { EnquiryForm } from "@/components/forms";
import { Reveal } from "@/components/motion";
import {
  ContactDetails,
  PageHero,
  StatsStrip,
  ProcessSteps,
  Testimonial,
} from "@/components/sections";
import { Heading } from "@/components/ui";
import { buildMetadata, toSeo } from "@/lib/seo";
import { getContactPage, getServices, getSiteSettings } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    title: page?.header?.heading ?? "Contact",
    description: page?.header?.intro ?? undefined,
    path: "/contact",
    seo: toSeo(page?.seo),
    defaults: {
      siteName: settings?.siteName,
      seo: toSeo(settings?.defaultSeo),
    },
  });
}

export default async function ContactPage() {
  const [page, settings, services] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    getServices(),
  ]);

  if (!page?.header?.heading) {
    return (
      <Container className="flex flex-1 flex-col items-start justify-center gap-4 py-24">
        <Heading as="h1" size="h1">
          Contact
        </Heading>
        <p className="max-w-md text-lg text-muted-foreground">
          The Contact page has not been published yet. Add content to the
          &ldquo;Contact page&rdquo; document in Sanity Studio and publish it.
        </p>
      </Container>
    );
  }

  const form = page.form;
  const serviceTitles = services.flatMap((s) => (s.title ? [s.title] : []));

  return (
    <>
      <PageHero data={page.header} />
      {page.stats && <StatsStrip stats={page.stats} />}
      <Section className="pt-8 sm:pt-12">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <Reveal>
              <EnquiryForm
                services={serviceTitles}
                copy={{
                  heading: form?.heading ?? undefined,
                  submitLabel: form?.submitLabel ?? "Send message",
                  consentLabel:
                    form?.consentLabel ??
                    "I agree to be contacted about my enquiry.",
                  successTitle: form?.successTitle ?? "Thank you!",
                  successMessage:
                    form?.successMessage ??
                    "Your message has been sent. We will get back to you shortly.",
                }}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ContactDetails
                contact={settings?.contact}
                socials={settings?.socials}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <ProcessSteps
        eyebrow={page.nextSteps?.eyebrow}
        heading={page.nextSteps?.heading ?? ""}
        steps={page.nextSteps?.heading ? page.nextSteps.items : null}
      />
      <Testimonial data={page.testimonials} />
    </>
  );
}
