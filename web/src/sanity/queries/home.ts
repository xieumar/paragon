import { defineQuery } from "next-sanity";
import { cachedSanity } from "../lib/live";
import { IMAGE_PROJECTION, SEO_PROJECTION } from "./fragments";
import { SERVICE_CARD_PROJECTION } from "./services";

const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage"][0]{
    heroSlides[]{
      layout,
      eyebrow,
      headline,
      subcopy,
      cta{ label, href },
      image{ ${IMAGE_PROJECTION} },
      badge
    },
    servicesEyebrow,
    servicesHeading,
    servicesIntro,
    featuredServices[]->{ ${SERVICE_CARD_PROJECTION} },
    stats[]{ value, label },
    clientLogos[]{ ${IMAGE_PROJECTION} },
    featuredTestimonial->{
      _id,
      quote,
      name,
      role,
      company,
      photo{ ${IMAGE_PROJECTION} }
    },
    ctaBand{ heading, text, cta{ label, href } },
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
