/**
 * Publish full article bodies (PT + EN) into each work's `description`.
 *
 * Reads faithful Portuguese Markdown from ../article-tools/scraped/<slug>.pt.md
 * and the Claude-authored English translation from ../article-tools/translated/
 * <slug>.en.md, converts both to Sanity Portable Text (preserving subheadings,
 * blockquotes and lists), and patches description.{pt,en}.
 *
 * Only slugs that have BOTH files are processed. Usage:
 *   node node_modules/tsx/dist/cli.mjs --env-file=.env.local scripts/push-article-bodies.ts [slug ...]
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const SCRAPED = path.join("..", "article-tools", "scraped");
const TRANSLATED = path.join("..", "article-tools", "translated");

/** Strip inline emphasis / link syntax down to clean plain text. */
function cleanInline(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) -> text
    .replace(/\*\*([^*]+)\*\*/g, "$1") // **bold** -> bold
    .replace(/__([^_]+)__/g, "$1")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1$2") // *italic* -> italic
    .replace(/(^|[^_])_([^_]+)_/g, "$1$2")
    .replace(/\\([*_[\]()#>-])/g, "$1") // unescape
    .trim();
}

type Block = {
  _type: "block";
  _key: string;
  style: string;
  markDefs: never[];
  listItem?: "bullet" | "number";
  level?: number;
  children: { _type: "span"; _key: string; text: string; marks: never[] }[];
};

function block(style: string, text: string, i: number, list?: "bullet" | "number"): Block {
  return {
    _type: "block",
    _key: `b${i}`,
    style,
    markDefs: [],
    ...(list ? { listItem: list, level: 1 } : {}),
    children: [{ _type: "span", _key: `b${i}s`, text, marks: [] }],
  };
}

function mdToBlocks(md: string): Block[] {
  const blocks: Block[] = [];
  let i = 0;
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;

    let m: RegExpMatchArray | null;
    if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      const level = m[1].length;
      blocks.push(block(level <= 2 ? "h2" : "h3", cleanInline(m[2]), i++));
    } else if ((m = line.match(/^\*\*(.+?)\*\*$/))) {
      // A whole line in bold = a section subheading in these articles.
      blocks.push(block("h2", cleanInline(m[1]), i++));
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      blocks.push(block("blockquote", cleanInline(m[1]), i++));
    } else if ((m = line.match(/^[-*]\s+(.*)$/))) {
      blocks.push(block("normal", cleanInline(m[1]), i++, "bullet"));
    } else if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      blocks.push(block("normal", cleanInline(m[1]), i++, "number"));
    } else {
      blocks.push(block("normal", cleanInline(line), i++));
    }
  }
  return blocks;
}

async function main() {
  const wanted = process.argv.slice(2);
  const files = fs
    .readdirSync(TRANSLATED)
    .filter((f) => f.endsWith(".en.md"))
    .map((f) => f.replace(/\.en\.md$/, ""));
  const slugs = wanted.length ? wanted : files;

  for (const slug of slugs) {
    const ptPath = path.join(SCRAPED, `${slug}.pt.md`);
    const enPath = path.join(TRANSLATED, `${slug}.en.md`);
    if (!fs.existsSync(ptPath) || !fs.existsSync(enPath)) {
      console.log(`- skip ${slug} (missing pt or en file)`);
      continue;
    }
    const pt = mdToBlocks(fs.readFileSync(ptPath, "utf-8"));
    const en = mdToBlocks(fs.readFileSync(enPath, "utf-8"));

    const doc = await client.fetch(
      `*[_type=="work" && slug.current==$slug][0]{_id}`,
      { slug }
    );
    if (!doc?._id) {
      console.log(`- skip ${slug} (work not found)`);
      continue;
    }
    await client.patch(doc._id).set({ description: { en, pt } }).commit();
    console.log(`✓ ${slug}  (pt:${pt.length} blocks, en:${en.length} blocks)`);
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
