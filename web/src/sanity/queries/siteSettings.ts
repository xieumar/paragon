import { defineQuery } from "next-sanity";
import { cachedSanity } from "../lib/live";
import { IMAGE_PROJECTION, SEO_PROJECTION } from "./fragments";

const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    siteName,
    tagline,
    logo{ ${IMAGE_PROJECTION} },
    headerCta{ label, href },
    navigation[]{ label, href },
    footerColumns[]{ title, links[]{ label, href } },
    legalLinks[]{ label, href },
    contact{ email, phone, address },
    socials[]{ platform, url },
    defaultSeo{ ${SEO_PROJECTION} }
  }
`);

/** Site-wide settings (singleton). Returns `null` until first published. */
export async function getSiteSettings() {
  const { data } = await cachedSanity({ query: SITE_SETTINGS_QUERY });
  return data;
}
