import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Sanity client that can write documents. Server-only: the token has no
 * `NEXT_PUBLIC_` prefix and this module cannot be imported from client code.
 * Returns `null` when `SANITY_API_WRITE_TOKEN` is not configured.
 */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
    perspective: "published",
  });
}
