import { defineQuery } from "next-sanity";
import { cachedSanity } from "../lib/live";
import { SEO_PROJECTION } from "./fragments";

const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage"] | order(_updatedAt desc)[0]{
    header{ eyebrow, heading, intro },
    form{ heading, submitLabel, consentLabel, successTitle, successMessage },
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
