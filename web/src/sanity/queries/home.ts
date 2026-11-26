import { defineQuery } from "next-sanity";
import { cachedSanity } from "../lib/live";
import {
  CTA_BLOCK_PROJECTION,
  FAQ_BLOCK_PROJECTION,
  IMAGE_PROJECTION,
  SEO_PROJECTION,
  TESTIMONIAL_BLOCK_PROJECTION,
} from "./fragments";
import { SERVICE_CARD_PROJECTION } from "./services";

const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"] | order(_updatedAt desc)[0]{
    heroSlides[]{
      layout,
      eyebrow,
      headline,
      subcopy,
      cta{ label, href },
      image{ ${IMAGE_PROJECTION} },
      badge
    },
    about{
      eyebrow,
      heading,
      body,
      highlights,
      image{ ${IMAGE_PROJECTION} },
      cta{ label, href }
    },
    servicesEyebrow,
    servicesHeading,
    servicesIntro,
    featuredServices[]->{ ${SERVICE_CARD_PROJECTION} },
    "stats": statsBlock->items[]{ value, label },
    "clientLogos": logoBlock->logos[]{ ${IMAGE_PROJECTION} },
    "testimonials": testimonialBlock->{ ${TESTIMONIAL_BLOCK_PROJECTION} },
    "faq": faqBlock->{ ${FAQ_BLOCK_PROJECTION} },
    "ctaBand": ctaBlock->{ ${CTA_BLOCK_PROJECTION} },
    seo{ ${SEO_PROJECTION} }
  }
`);

/** The home page singleton. Returns `null` until first published. */
export async function getHomePage() {
  const { data } = await cachedSanity({
    query: HOME_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}
