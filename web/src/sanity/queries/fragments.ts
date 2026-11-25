/**
 * Shared GROQ projection fragments. Interpolate into `defineQuery` templates.
 * Shapes match the global `SanityImage` / `Seo` types in `src/@types/sanity.d.ts`.
 */

/** Projects an `imageWithAlt` field. Use as `logo{ ${IMAGE_PROJECTION} }`. */
export const IMAGE_PROJECTION = /* groq */ `
  asset,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  hotspot{x, y},
  crop{top, bottom, left, right}
`;

/** Projects the `seo` object. Use as `seo{ ${SEO_PROJECTION} }`. */
export const SEO_PROJECTION = /* groq */ `
  title,
  description,
  noindex,
  image{ ${IMAGE_PROJECTION} }
`;

/** Projects Portable Text, resolving inline images. Use as `body[]{ ${PORTABLE_TEXT_PROJECTION} }`. */
export const PORTABLE_TEXT_PROJECTION = /* groq */ `
  ...,
  _type == "imageWithAlt" => { ${IMAGE_PROJECTION} }
`;
