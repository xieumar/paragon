import { toImage, type ImageInput } from "@/sanity/image";

/** A `seo` object as returned by `SEO_PROJECTION`, before null-checking. */
export interface SeoInput {
  title: string | null;
  description: string | null;
  noindex: boolean | null;
  image: ImageInput | null;
}

/** Converts projected (nullable) SEO data into the clean global `Seo` shape. */
export function toSeo(seo: SeoInput | null | undefined): Seo | null {
  if (!seo) return null;
  return {
    title: seo.title ?? undefined,
    description: seo.description ?? undefined,
    noindex: seo.noindex ?? undefined,
    image: toImage(seo.image) ?? undefined,
  };
}
