import { defineLive, type DefinedFetchType } from "next-sanity/live";
import { client } from "./client";

// Server-only token (no NEXT_PUBLIC_ prefix). Optional until draft content/Visual Editing is needed.
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});

// Required because `cacheComponents` is on: `sanityFetch` calls `cacheTag`
// internally but does not create the `"use cache"` boundary. Use this
// wrapper for all page/component data fetching.
export const cachedSanity: DefinedFetchType = async (options) => {
  "use cache";
  return sanityFetch(options);
};
