import type { Metadata } from "next";
import { DEFAULT_SITE_NAME } from "@/constants";
import { urlFor } from "@/sanity/image";

interface BuildMetadataInput {
  /** Page title, without the site name. */
  title?: string;
  description?: string;
  /** Route path, e.g. "/about". Used for the canonical URL. */
  path?: string;
  /** Page-level SEO from the CMS (overrides `title`/`description`). */
  seo?: Seo | null;
  /** Site-wide defaults (`siteSettings.defaultSeo`) and name. */
  defaults?: { siteName?: string | null; seo?: Seo | null };
}

/** Builds Next.js `Metadata` from page content, CMS SEO and site defaults. */
export function buildMetadata({
  title,
  description,
  path,
  seo,
  defaults,
}: BuildMetadataInput = {}): Metadata {
  const siteName = defaults?.siteName ?? DEFAULT_SITE_NAME;
  const resolvedTitle = seo?.title ?? title ?? defaults?.seo?.title;
  const resolvedDescription =
    seo?.description ?? description ?? defaults?.seo?.description;
  const image = seo?.image ?? defaults?.seo?.image;
  const noindex = seo?.noindex ?? false;

  const imageUrl = image
    ? urlFor(image).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: path ? { canonical: path } : undefined,
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName,
      title: resolvedTitle ?? siteName,
      description: resolvedDescription,
      url: path,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: image?.alt }]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: resolvedTitle ?? siteName,
      description: resolvedDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
