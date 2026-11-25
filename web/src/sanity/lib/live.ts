import { defineLive, type StrictDefinedFetchType } from "next-sanity/live";
import { client } from "./client";

// Server-only token (no NEXT_PUBLIC_ prefix). Optional until draft content /
// Visual Editing is needed; `false` silences the "no token" warnings.
const token = process.env.SANITY_API_READ_TOKEN ?? false;

// `strict: true` makes `perspective` and `stega` explicit options, so
// `sanityFetch` never reads request state (draftMode/cookies) itself. That
// is required to call it inside `"use cache"` (we enable `cacheComponents`).
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  strict: true,
});

// The app's one shared `"use cache"` boundary. `sanityFetch` calls
// `cacheTag`/`cacheLife` internally but does not create the boundary, so all
// page/component data fetching goes through this wrapper. Pass
// `perspective: "published"` and `stega: false` for public content.
export const cachedSanity: StrictDefinedFetchType = async (options) => {
  "use cache";
  return sanityFetch(options);
};
