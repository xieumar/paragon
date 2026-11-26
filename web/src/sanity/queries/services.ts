import { defineQuery } from "next-sanity";
import { cachedSanity } from "../lib/live";
import {
  IMAGE_PROJECTION,
  PORTABLE_TEXT_PROJECTION,
  SEO_PROJECTION,
} from "./fragments";

/** Fields needed to render a service card. Reused by the home page query. */
export const SERVICE_CARD_PROJECTION = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  summary,
  image{ ${IMAGE_PROJECTION} }
`;

const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)]
    | order(coalesce(order, 100) asc, title asc){
    ${SERVICE_CARD_PROJECTION}
  }
`);

const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    ${SERVICE_CARD_PROJECTION},
    overview[]{ ${PORTABLE_TEXT_PROJECTION} },
    capabilities,
    processSteps[]{ title, description },
    seo{ ${SEO_PROJECTION} }
  }
`);

const SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)]{ "slug": slug.current }
`);

/** All published services, in display order. */
export async function getServices() {
  const { data } = await cachedSanity({
    query: SERVICES_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

/** One service by slug, or `null` if it does not exist. */
export async function getService(slug: string) {
  const { data } = await cachedSanity({
    query: SERVICE_QUERY,
    params: { slug },
    perspective: "published",
    stega: false,
  });
  return data;
}

/** Slugs of all published services, for `generateStaticParams`. */
export async function getServiceSlugs() {
  const { data } = await cachedSanity({
    query: SERVICE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}
