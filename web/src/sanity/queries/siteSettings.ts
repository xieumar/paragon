import { defineQuery } from "next-sanity";
import { cachedSanity } from "../lib/live";
import { IMAGE_PROJECTION, SEO_PROJECTION } from "./fragments";

const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"] | order(_updatedAt desc)[0]{
    siteName,
    tagline,
    logo{ ${IMAGE_PROJECTION} },
    headerCta{ label, href },
    navigation[]{ label, href },
    footerColumns[]{ title, text, links[]{ label, href } },
    legalLinks[]{ label, href },
    contact{ email, phone, address },
    socials[]{ platform, url },
    defaultSeo{ ${SEO_PROJECTION} }
  }
`);

export type SiteSettings = Awaited<ReturnType<typeof getSiteSettings>>;

/**
 * Site-wide settings (singleton). Returns `null` until first published, and
 * also if Sanity is unreachable, so the header/footer fall back to defaults
 * instead of taking the whole site (including the 404 page) down. The error
 * is thrown outside the `"use cache"` boundary, so a failure is not cached
 * and the next request retries.
 */
export async function getSiteSettings() {
  try {
    const { data } = await cachedSanity({
      query: SITE_SETTINGS_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  } catch (error) {
    console.error("Failed to load site settings from Sanity:", error);
    return null;
  }
}
