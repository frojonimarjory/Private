/**
 * Fetch cover images for works that link to an external publication but have no
 * cover yet. It reads each work's `externalUrl`, extracts the page's social
 * preview image (og:image / twitter:image) — the same image that shows when you
 * share the link — downloads it, uploads it to Sanity, and sets it as the cover.
 *
 * Best-effort: sites that block bots or have no preview image are skipped and
 * reported, so you can add those covers by hand in the Studio.
 *
 * Usage: node node_modules/tsx/dist/cli.mjs --env-file=.env.local scripts/fetch-covers.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

function extractPreviewImage(html: string): string | null {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::url)?["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1].replace(/&amp;/g, "&");
  }
  return null;
}

async function run() {
  const works: { _id: string; slug: string; externalUrl: string }[] =
    await client.fetch(
      `*[_type=="work" && defined(externalUrl) && !defined(cover) && media.type != "youtube"]{
        _id, "slug": slug.current, externalUrl
      }`
    );

  console.log(`${works.length} work(s) without cover to try...\n`);
  const failed: string[] = [];

  for (const w of works) {
    try {
      const page = await fetch(w.externalUrl, {
        headers: { "User-Agent": UA, Accept: "text/html" },
        redirect: "follow",
      });
      if (!page.ok) throw new Error(`page HTTP ${page.status}`);
      const html = await page.text();
      const imgUrl = extractPreviewImage(html);
      if (!imgUrl) throw new Error("no og:image/twitter:image found");

      const imgRes = await fetch(imgUrl, { headers: { "User-Agent": UA } });
      if (!imgRes.ok) throw new Error(`image HTTP ${imgRes.status}`);
      const contentType = imgRes.headers.get("content-type") || "image/jpeg";
      if (!contentType.startsWith("image/"))
        throw new Error(`not an image (${contentType})`);
      const buffer = Buffer.from(await imgRes.arrayBuffer());
      if (buffer.length < 1000) throw new Error("image too small");

      const asset = await client.assets.upload("image", buffer, {
        contentType,
        filename: `${w.slug}.${contentType.split("/")[1].split(";")[0]}`,
      });
      await client
        .patch(w._id)
        .set({
          cover: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
        })
        .commit();
      console.log(`✓ ${w.slug}  (${Math.round(buffer.length / 1024)} KB)`);
    } catch (e) {
      failed.push(w.slug);
      console.log(`✗ ${w.slug}  — ${(e as Error).message}`);
    }
  }

  console.log(`\nDone. ${works.length - failed.length} set, ${failed.length} failed.`);
  if (failed.length) console.log("Add covers manually for:", failed.join(", "));
}

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
