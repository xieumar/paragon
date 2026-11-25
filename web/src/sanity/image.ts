import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Sanity image URL builder. Pass a projected image (asset ref, hotspot, crop). */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
