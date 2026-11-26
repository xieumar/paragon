import { defineQuery } from "next-sanity";
import { cachedSanity } from "../lib/live";
import { IMAGE_PROJECTION, SEO_PROJECTION } from "./fragments";

const SERVICES_PAGE_QUERY = defineQuery(`
  *[_type == "servicesPage"] | order(_updatedAt desc)[0]{
    header{
      eyebrow,
      heading,
      intro,
      image{ ${IMAGE_PROJECTION} }
    },
    ctaBand{ heading, text, cta{ label, href } },
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
