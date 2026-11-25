// Ambient declarations: no top-level import/export, so everything here is global.
// Hand-written shared CMS shapes. Document-specific types come from TypeGen
// (`sanity.types.ts`) once schemas exist.

/** An image field projected by our shared image fragment. */
interface SanityImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  /** Low-quality image placeholder (base64) for blur-up loading. */
  lqip?: string;
}

/** Shared SEO object projected from the `seo` schema object. */
interface Seo {
  title?: string;
  description?: string;
  image?: SanityImage;
  noindex?: boolean;
}

/** Portable Text content as returned by GROQ. */
type PortableTextValue = import("next-sanity").PortableTextBlock[];
