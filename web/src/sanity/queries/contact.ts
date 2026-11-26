import { defineQuery } from "next-sanity";
import { cachedSanity } from "../lib/live";
import {
  FAQ_BLOCK_PROJECTION,
  IMAGE_PROJECTION,
  SEO_PROJECTION,
  TESTIMONIAL_BLOCK_PROJECTION,
} from "./fragments";

const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage"] | order(_updatedAt desc)[0]{
    header{
      eyebrow,
      heading,
      intro,
      image{ ${IMAGE_PROJECTION} }
    },
    form{ heading, submitLabel, consentLabel, successTitle, successMessage },
    nextSteps{ eyebrow, heading, items[]{ title, description } },
    "stats": statsBlock->items[]{ value, label },
    "clientLogos": logoBlock->logos[]{ ${IMAGE_PROJECTION} },
    "testimonials": testimonialBlock->{ ${TESTIMONIAL_BLOCK_PROJECTION} },
    "faq": faqBlock->{ ${FAQ_BLOCK_PROJECTION} },
    seo{ ${SEO_PROJECTION} }
  }
`);

/** The Contact page singleton. Returns `null` until first published. */
export async function getContactPage() {
  const { data } = await cachedSanity({
    query: CONTACT_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}
