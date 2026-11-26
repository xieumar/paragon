import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Sanity image URL builder. Pass a projected image (asset ref, hotspot, crop). */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

/** An image as returned by `IMAGE_PROJECTION`, before null-checking. */
export interface ImageInput {
  asset: { _ref: string; _type: "reference" } | null;
  alt: string | null;
  width: number | null;
  height: number | null;
  lqip: string | null;
  hotspot: { x: number | null; y: number | null } | null;
  crop: {
    top: number | null;
    bottom: number | null;
    left: number | null;
    right: number | null;
  } | null;
}

/**
 * Converts a projected (nullable) image into a render-ready `SanityImage`,
 * or `null` if the image is missing or incomplete (e.g. no asset yet).
 */
export function toImage(
  image: ImageInput | null | undefined
): SanityImage | null {
  if (!image?.asset || !image.width || !image.height) return null;

  const { hotspot, crop } = image;
  return {
    asset: image.asset,
    alt: image.alt ?? "",
    width: image.width,
    height: image.height,
    lqip: image.lqip ?? undefined,
    hotspot:
      hotspot && hotspot.x != null && hotspot.y != null
        ? { x: hotspot.x, y: hotspot.y }
        : undefined,
    crop:
      crop &&
      crop.top != null &&
      crop.bottom != null &&
      crop.left != null &&
      crop.right != null
        ? {
            top: crop.top,
            bottom: crop.bottom,
            left: crop.left,
            right: crop.right,
          }
        : undefined,
  };
}
