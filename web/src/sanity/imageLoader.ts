"use client";

export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;

  const url = new URL(src);
  const requestedWidth = Number(url.searchParams.get("w"));
  const requestedHeight = Number(url.searchParams.get("h"));

  // If the URL was built with a fixed crop (width + height), keep its shape.
  if (requestedWidth && requestedHeight) {
    url.searchParams.set(
      "h",
      String(Math.round((requestedHeight * width) / requestedWidth))
    );
  }

  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  if (!url.searchParams.has("fit")) url.searchParams.set("fit", "max");
  return url.toString();
}
