import { defineQuery } from "next-sanity";
import { cachedSanity } from "../lib/live";
import {
  CTA_BLOCK_PROJECTION,
  FAQ_BLOCK_PROJECTION,
  IMAGE_PROJECTION,
  SEO_PROJECTION,
  TESTIMONIAL_BLOCK_PROJECTION,
} from "./fragments";

const SERVICES_PAGE_QUERY = defineQuery(`
  *[_type == "servicesPage"] | order(_updatedAt desc)[0]{
    header{
      eyebrow,
      heading,
      intro,
      image{ ${IMAGE_PROJECTION} }
    },
    "clientLogos": logoBlock->logos[]{ ${IMAGE_PROJECTION} },
    "testimonials": testimonialBlock->{ ${TESTIMONIAL_BLOCK_PROJECTION} },
    "faq": faqBlock->{ ${FAQ_BLOCK_PROJECTION} },
    "ctaBand": ctaBlock->{ ${CTA_BLOCK_PROJECTION} },
    seo{ ${SEO_PROJECTION} }
  }
`);

/** The Services page singleton. Returns `null` until first published. */
export async function getServicesPage() {
  const { data } = await cachedSanity({
    query: SERVICES_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}
