import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

const builder = projectId
  ? imageUrlBuilder(sanityClient!)
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error("Sanity not configured");
  return builder.image(source);
}
