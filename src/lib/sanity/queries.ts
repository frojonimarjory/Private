import { sanityClient } from "./client";

export type Work = {
  _id: string;
  title: { en: string; pt: string };
  slug: { current: string };
  excerpt: { en: string; pt: string };
  description: { en: unknown[]; pt: unknown[] };
  category: "documentary" | "article" | "consulting" | "podcast";
  media: {
    type: "image" | "video" | "embed";
    image?: unknown;
    videoUrl?: string;
    embedCode?: string;
  };
  thumbnail: unknown;
  externalUrl: string;
  platform: string;
  publishedAt: string;
  featured: boolean;
  gridSize: "small" | "medium" | "large" | "wide" | "tall";
  order: number;
};

export type SiteSettings = {
  name: { en: string; pt: string };
  tagline: { en: string; pt: string };
  bio: { en: unknown[]; pt: unknown[] };
  profileImage: unknown;
  email: string;
  socialLinks: { platform: string; url: string }[];
};

const workFields = `
  _id,
  title,
  slug,
  excerpt,
  description,
  category,
  media,
  thumbnail,
  externalUrl,
  platform,
  publishedAt,
  featured,
  gridSize,
  order
`;

export async function getWorks(): Promise<Work[]> {
  return sanityClient.fetch(
    `*[_type == "work"] | order(order asc, publishedAt desc) { ${workFields} }`
  );
}

export async function getFeaturedWorks(): Promise<Work[]> {
  return sanityClient.fetch(
    `*[_type == "work" && featured == true] | order(order asc) { ${workFields} }`
  );
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  return sanityClient.fetch(
    `*[_type == "work" && slug.current == $slug][0] { ${workFields} }`,
    { slug }
  );
}

export async function getWorksByCategory(
  category: string
): Promise<Work[]> {
  return sanityClient.fetch(
    `*[_type == "work" && category == $category] | order(order asc, publishedAt desc) { ${workFields} }`,
    { category }
  );
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      name,
      tagline,
      bio,
      profileImage,
      email,
      socialLinks
    }`
  );
}
