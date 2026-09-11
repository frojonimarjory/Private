/**
 * Seed the editable site content (settings, pages, interface labels) into Sanity.
 *
 * It reads the bundled defaults in src/messages/{en,pt}.json and uploads them as
 * bilingual documents, plus the profile photo and CV from /public. Run this once
 * against Marjory's new Sanity project so she starts with everything filled in
 * and editable in the Studio.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/seed-content.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN (Editor) in .env.local.
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

import en from "../src/messages/en.json";
import pt from "../src/messages/pt.json";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

/** Build a bilingual { en, pt } value. */
const pair = (e?: string, p?: string) => ({ en: e ?? "", pt: p ?? "" });

/** Map matching keys of two objects into { en, pt } fields. */
function pairObject(
  enObj: Record<string, string>,
  ptObj: Record<string, string>
) {
  const out: Record<string, { en: string; pt: string }> = {};
  for (const key of Object.keys(enObj)) out[key] = pair(enObj[key], ptObj[key]);
  return out;
}

async function uploadAsset(
  kind: "image" | "file",
  relPath: string
): Promise<string | null> {
  const abs = path.join(process.cwd(), relPath);
  if (!fs.existsSync(abs)) {
    console.warn(`  ! asset not found, skipping: ${relPath}`);
    return null;
  }
  const asset = await client.assets.upload(kind, fs.createReadStream(abs), {
    filename: path.basename(abs),
  });
  console.log(`  ↑ uploaded ${relPath}`);
  return asset._id;
}

async function main() {
  console.log("Uploading assets...");
  const imageId = await uploadAsset("image", "public/images/marjory-profile.jpg");
  const cvId = await uploadAsset("file", "public/CV_Marjory_Frojoni.pdf");

  const imageRef = imageId
    ? { _type: "image", asset: { _type: "reference", _ref: imageId } }
    : undefined;
  const fileRef = cvId
    ? { _type: "file", asset: { _type: "reference", _ref: cvId } }
    : undefined;

  const ea = en.about;
  const pa = pt.about;

  const zip = <T,>(
    enArr: T[],
    ptArr: T[],
    fn: (e: T, p: T, i: number) => Record<string, unknown>,
    keyPrefix: string
  ) => enArr.map((e, i) => ({ _key: `${keyPrefix}-${i}`, ...fn(e, ptArr[i], i) }));

  const docs: Record<string, unknown>[] = [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      name: pair(en.hero.name, pt.hero.name),
      tagline: pair(en.hero.tagline, pt.hero.tagline),
      logoText: pt.settings.logoText,
      email: pt.settings.email,
      location: pair(en.settings.location, pt.settings.location),
      linkedinUrl: pt.settings.linkedinUrl,
      whatsappNumber: pt.settings.whatsappNumber,
      whatsappDisplay: pt.settings.whatsappDisplay,
      ...(imageRef ? { profileImage: imageRef } : {}),
      ...(fileRef ? { resume: { en: fileRef, pt: fileRef } } : {}),
    },
    {
      _id: "homePage",
      _type: "homePage",
      heroGreeting: pair(en.hero.greeting, pt.hero.greeting),
      heroDescription: pair(en.hero.description, pt.hero.description),
      heroCta: pair(en.hero.cta, pt.hero.cta),
      portfolioHeading: pair(en.home.portfolioHeading, pt.home.portfolioHeading),
      quoteText: pair(en.quote.text, pt.quote.text),
      quoteAttribution: pair(en.quote.attribution, pt.quote.attribution),
    },
    {
      _id: "aboutPage",
      _type: "aboutPage",
      title: pair(ea.title, pa.title),
      bio: pair(ea.bio, pa.bio),
      experienceLabel: pair(ea.experience, pa.experience),
      educationLabel: pair(ea.education, pa.education),
      skillsLabel: pair(ea.skills, pa.skills),
      projectsLabel: pair(ea.projects, pa.projects),
      languagesLabel: pair(ea.languages, pa.languages),
      downloadCvLabel: pair(ea.downloadCV, pa.downloadCV),
      experience: zip(
        ea.experienceItems,
        pa.experienceItems,
        (e, p) => ({
          role: pair(e.role, p.role),
          org: e.org,
          period: pair(e.period, p.period),
        }),
        "exp"
      ),
      education: zip(
        ea.educationItems,
        pa.educationItems,
        (e, p) => ({
          degree: pair(e.degree, p.degree),
          institution: e.institution,
          period: e.period,
          detail: pair(e.detail, p.detail),
        }),
        "edu"
      ),
      projects: zip(
        ea.projectItems,
        pa.projectItems,
        (e, p) => ({
          kind: pair(e.kind, p.kind),
          year: e.year,
          title: pair(e.title, p.title),
          description: pair(e.description, p.description),
        }),
        "prj"
      ),
      skills: zip(
        ea.skillsList,
        pa.skillsList,
        (e, p) => ({ en: e, pt: p }),
        "skl"
      ),
      languages: zip(
        ea.languageList,
        pa.languageList,
        (e, p) => ({ name: pair(e.name, p.name), level: pair(e.level, p.level) }),
        "lng"
      ),
    },
    {
      _id: "contactPage",
      _type: "contactPage",
      title: pair(en.contact.title, pt.contact.title),
      subtitle: pair(en.contact.subtitle, pt.contact.subtitle),
      nameLabel: pair(en.contact.name, pt.contact.name),
      emailLabel: pair(en.contact.email, pt.contact.email),
      messageLabel: pair(en.contact.message, pt.contact.message),
      sendLabel: pair(en.contact.send, pt.contact.send),
      sendingLabel: pair(en.contact.sending, pt.contact.sending),
      successMessage: pair(en.contact.success, pt.contact.success),
      errorMessage: pair(en.contact.error, pt.contact.error),
      whatsappLabel: pair(en.contact.whatsapp, pt.contact.whatsapp),
    },
    {
      _id: "uiLabels",
      _type: "uiLabels",
      nav: pairObject(en.nav, pt.nav),
      categories: pairObject(en.categories, pt.categories),
      spotlight: pairObject(en.spotlight, pt.spotlight),
      work: pairObject(en.work, pt.work),
      footer: pairObject(en.footer, pt.footer),
      common: pairObject(en.common, pt.common),
      metadata: pairObject(en.metadata, pt.metadata),
    },
  ];

  console.log("Writing documents...");
  for (const doc of docs) {
    await client.createOrReplace(doc as never);
    console.log(`  ✓ ${doc._id}`);
  }

  console.log("\nDone. All site content is now editable in the Studio.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
