/**
 * Add Marjory's LinkedIn post as an "article" work, with the full text hosted
 * (translated EN + PT) in the description, while linking back to the original.
 *
 * Usage: npx tsx --env-file=.env.local scripts/add-linkedin-post.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const SLUG = "journalist-or-content-creator";
const EXTERNAL_URL =
  "https://www.linkedin.com/posts/marjory-frojoni_jornalismo-conteaeqdodigital-share-7295838402703167488-KVwR/";
const ACTIVITY_ID = "7295838402703167488"; // LinkedIn encodes the timestamp in the first 41 bits

// --- Rich text authoring model -------------------------------------------
type Item =
  | { type: "p" | "h3"; text: string }
  | { type: "bullet"; text: string; href: string };

function buildBlocks(items: Item[], prefix: string) {
  return items.map((item, i) => {
    const key = `${prefix}${i}`;
    if (item.type === "bullet") {
      return {
        _type: "block",
        _key: key,
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [{ _key: `${key}l`, _type: "link", href: item.href }],
        children: [
          { _type: "span", _key: `${key}s`, text: item.text, marks: [`${key}l`] },
        ],
      };
    }
    return {
      _type: "block",
      _key: key,
      style: item.type === "h3" ? "h3" : "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `${key}s`, text: item.text, marks: [] }],
    };
  });
}

const ptItems: Item[] = [
  {
    type: "p",
    text: 'Hoje finalizei o curso "Criadores de Conteúdo Digital e Jornalistas: Como Ser uma Voz Confiável Online", oferecido gratuitamente pelo Knight Center e pela Unesco.',
  },
  {
    type: "p",
    text: "O período em que fiz o curso coincidiu com as eleições nos Estados Unidos e o debate sobre a regulamentação das redes sociais, ressaltando como a internet, embora seja uma ferramenta fundamental, ainda está longe de ser um ambiente totalmente idôneo para a informação.",
  },
  {
    type: "p",
    text: "Uma das discussões mais enriquecedoras do curso foi justamente sobre o papel do jornalista e do criador de conteúdo. Ao final, percebemos que não se trata de definir quem faz o que, mas de como podemos desempenhar nossa função de informar da melhor maneira possível. Afinal, em muitas situações, a pessoa pode ser tanto jornalista quanto criadora de conteúdo.",
  },
  {
    type: "p",
    text: "O que realmente buscamos, como jornalistas, criadores e consumidores, é compartilhar e consumir a verdade, não é mesmo? Por isso, o curso disponibilizou materiais incríveis, que estou compartilhando com vocês, juntamente com o link para acesso.",
  },
  { type: "h3", text: "Materiais recomendados" },
  {
    type: "bullet",
    text: "Estratégia Brasileira de Educação Midiática — Secretaria de Comunicação Social, Governo Federal",
    href: "https://lnkd.in/dkJvUCMg",
  },
  {
    type: "bullet",
    text: "Fakebook Eco — agência de checagem voltada ao combate da desinformação ambiental",
    href: "https://fakebook.eco.br/",
  },
  {
    type: "bullet",
    text: '"É preciso prevenir desastres informacionais", por Clara Becker — O Globo',
    href: "https://lnkd.in/dhcwfTY3",
  },
  {
    type: "bullet",
    text: "Guia responsável em situações de emergência — Chuvas no Rio Grande do Sul",
    href: "https://lnkd.in/dy_iT5f9",
  },
  { type: "bullet", text: "Link do curso", href: "https://lnkd.in/dk8pKaTX" },
];

const enItems: Item[] = [
  {
    type: "p",
    text: 'I\'ve just completed the course "Digital Content Creators and Journalists: How to Be a Trustworthy Voice Online," offered free of charge by the Knight Center and UNESCO.',
  },
  {
    type: "p",
    text: "The period when I took the course coincided with the U.S. elections and the debate over regulating social media, underscoring how the internet — while an essential tool — is still far from being a fully reliable environment for information.",
  },
  {
    type: "p",
    text: "One of the course's richest discussions was precisely about the role of the journalist and the content creator. In the end, we realized it isn't about defining who does what, but about how we can best carry out our job of informing. After all, in many situations a person can be both a journalist and a content creator.",
  },
  {
    type: "p",
    text: "What we truly seek — as journalists, creators, and consumers — is to share and consume the truth, isn't it? That's why the course provided incredible resources, which I'm sharing with you here, along with the link to access it.",
  },
  { type: "h3", text: "Recommended resources" },
  {
    type: "bullet",
    text: "Brazilian Media Education Strategy — Department of Social Communication, Federal Government",
    href: "https://lnkd.in/dkJvUCMg",
  },
  {
    type: "bullet",
    text: "Fakebook Eco — a fact-checking agency dedicated to fighting environmental disinformation",
    href: "https://fakebook.eco.br/",
  },
  {
    type: "bullet",
    text: '"We must prevent information disasters," by Clara Becker — O Globo',
    href: "https://lnkd.in/dhcwfTY3",
  },
  {
    type: "bullet",
    text: "Responsible guide for emergency situations — Floods in Rio Grande do Sul",
    href: "https://lnkd.in/dy_iT5f9",
  },
  { type: "bullet", text: "Course link", href: "https://lnkd.in/dk8pKaTX" },
];

async function run() {
  const existing = await client.fetch(
    `*[_type=="work" && slug.current==$slug][0]{ _id }`,
    { slug: SLUG }
  );
  if (existing) {
    console.log(`⤼ "${SLUG}" already exists (${existing._id}), skipping create`);
    return;
  }

  // Derive publish date from the LinkedIn activity id (ms in the top 41 bits).
  const ms = Number(BigInt(ACTIVITY_ID) >> 22n);
  const publishedAt = new Date(ms).toISOString();
  console.log(`Derived publish date: ${publishedAt}`);

  const maxOrder: number = await client.fetch(
    `math::max(*[_type=="work"].order)`
  );

  const doc = {
    _type: "work",
    title: {
      en: "Journalist or Digital Content Creator? Who Really Informs?",
      pt: "Jornalista ou Criador de Conteúdo Digital? Quem realmente informa?",
    },
    slug: { _type: "slug", current: SLUG },
    excerpt: {
      en: "A reflection prompted by the Knight Center and UNESCO course on the roles of journalist and content creator — and why what matters is informing with the truth.",
      pt: "Uma reflexão a partir do curso do Knight Center e da Unesco sobre os papéis do jornalista e do criador de conteúdo — e por que o que importa é informar com a verdade.",
    },
    description: {
      en: buildBlocks(enItems, "en"),
      pt: buildBlocks(ptItems, "pt"),
    },
    category: "article",
    media: { type: "none" },
    externalUrl: EXTERNAL_URL,
    platform: "LinkedIn",
    publishedAt,
    featured: false,
    order: (maxOrder || 0) + 1,
  };

  const created = await client.create(doc);
  console.log(`✓ created "${SLUG}" (${created._id}) at order ${doc.order}`);
}

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
