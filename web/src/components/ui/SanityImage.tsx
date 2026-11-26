import Image, { type ImageProps } from "next/image";
import { urlFor } from "@/sanity/image";

interface SanityImageProps extends Omit<
  ImageProps,
  "src" | "alt" | "width" | "height" | "placeholder" | "blurDataURL"
> {
  image: SanityImage;
  /** Override the CMS alt text (e.g. decorative images: pass an empty string). */
  alt?: string;
}

/**
 * Renders a CMS image through `next/image`, with the editor's hotspot as the
 * focal point and a blur-up placeholder. `sizes` should be set by the caller
 * for responsive layouts.
 */
export function SanityImage({
  image,
  alt,
  style,
  sizes,
  ...props
}: SanityImageProps) {
  const src = urlFor(image)
    .width(Math.min(image.width, 2000))
    .auto("format")
    .url();
  const objectPosition = image.hotspot
    ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
    : undefined;

  return (
    <Image
      src={src}
      alt={alt ?? image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip}
      style={{ objectPosition, ...style }}
      {...props}
    />
  );
}
