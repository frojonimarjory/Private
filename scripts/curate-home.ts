/**
 * Curate the homepage:
 *  - Upload the documentary's YouTube still as its cover (flagship spotlight image).
 *  - Set `featured` flags to a diverse, low-Nefrostar mix for the home grid.
 *
 * Usage: npx tsx --env-file=.env.local scripts/curate-home.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// The documentary is the flagship — spotlighted separately on the home.
const DOCUMENTARY_SLUG = "do-ponto-a-ponta";
const DOCUMENTARY_YT_ID = "tfdJ7uPxjdo";

// Curated, diverse featured set for the home grid (excludes the documentary,
// which gets its own spotlight). Only ONE Nefrostar item, more from other places.
const FEATURED_SLUGS = [
  "zuzu-angel", // article · Fashionlismo
  "ccxp-2023", // article · Medium
  "raio-x-lula-3", // consulting · JOTA
  "bottega-veneta-quiet-luxury", // article · Fashionlismo
  "chloe-nova-direcao-2024", // article · Fashionlismo
  "xenotransplante-hemodialogos-04", // podcast · Nefrostar (the single Nefrostar)
  "reforma-tributaria", // consulting · JOTA
  "mumo-museu-moda", // article · Fashionlismo
];

async function uploadYouTubeStill(id: string) {
  const urls = [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  ];
  for (const url of urls) {
    const res = await fetch(url);
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      // maxresdefault can 404 with a 200 placeholder; require a real size
      if (buf.byteLength > 2000) {
        return client.assets.upload("image", buf, {
          contentType: "image/jpeg",
          filename: `${id}.jpg`,
        });
      }
    }
  }
  throw new Error("no usable YouTube still");
}

async function run() {
  // 1. Documentary cover
  const doc = await client.fetch(
    `*[_type=="work" && slug.current==$slug][0]{ _id, "hasCover": defined(cover) }`,
    { slug: DOCUMENTARY_SLUG }
  );
  if (!doc) {
    console.log(`⚠ documentary "${DOCUMENTARY_SLUG}" not found`);
  } else if (doc.hasCover) {
    console.log("✓ documentary already has a cover, leaving it");
  } else {
    console.log("→ uploading documentary still as cover...");
    const asset = await uploadYouTubeStill(DOCUMENTARY_YT_ID);
    await client
      .patch(doc._id)
      .set({
        cover: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      })
      .commit();
    console.log("  ✓ cover set");
  }

  // 2. Featured flags — first clear all, then set the curated set + documentary.
  const all = await client.fetch(
    `*[_type=="work"]{ _id, "slug": slug.current, featured }`
  );
  const keep = new Set([DOCUMENTARY_SLUG, ...FEATURED_SLUGS]);

  const tx = client.transaction();
  let on = 0;
  let off = 0;
  for (const w of all) {
    const shouldFeature = keep.has(w.slug);
    if (Boolean(w.featured) !== shouldFeature) {
      tx.patch(w._id, (p) => p.set({ featured: shouldFeature }));
      if (shouldFeature) on++;
      else off++;
    }
  }
  await tx.commit();
  console.log(`✓ featured flags updated (+${on} / -${off})`);

  const featured = await client.fetch(
    `*[_type=="work" && featured==true]{ "slug": slug.current, category, platform, order } | order(order asc)`
  );
  console.log(`\nFeatured now (${featured.length}):`);
  for (const w of featured)
    console.log(`  #${w.order} [${w.category}/${w.platform}] ${w.slug}`);

  console.log("\nDone!");
}

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
