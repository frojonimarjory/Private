/**
 * Seed Sanity with the initial portfolio data.
 *
 * Usage:
 *   npx tsx scripts/seed-sanity.ts
 *
 * Requires these environment variables (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET       (defaults to "production")
 *   SANITY_API_TOKEN                  (a write token from sanity.io/manage)
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in env."
  );
  console.error("1. Go to https://www.sanity.io/manage and create a project.");
  console.error(
    '2. Under API → Tokens, create a token with "Editor" permissions.'
  );
  console.error("3. Add both to your .env.local file.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const works = [
  {
    _type: "work",
    title: { en: "Do Ponto à Ponta", pt: "Do Ponto à Ponta" },
    slug: { _type: "slug", current: "do-ponto-a-ponta" },
    excerpt: {
      en: "Documentary portraying young ballet dancers at the Bolshoi Theater School. Co-produced and directed with Desirèe Assis, covering production, scriptwriting, and direction.",
      pt: "Documentário retratando jovens bailarinos da Escola do Teatro Bolshoi. Co-produzido e dirigido com Desirèe Assis, cobrindo produção, roteiro e direção.",
    },
    category: "documentary",
    media: { type: "none" },
    platform: "Documentary",
    publishedAt: "2023-01-01T00:00:00Z",
    featured: true,
    order: 1,
  },
  {
    _type: "work",
    title: {
      en: "Zuzu Angel: Needle and Thread Against Military Dictatorship",
      pt: "Zuzu Angel: Linha e agulha contra a ditadura militar no país",
    },
    slug: { _type: "slug", current: "zuzu-angel" },
    excerpt: {
      en: "The clothes, music, and atmosphere carried a sad message: the murder of Stuart Angel, who had been kidnapped and tortured by agents of the military regime in 1970.",
      pt: "As roupas, música e ambiente carregavam uma triste mensagem: o assassinato de Stuart Angel, que antes fora sequestrado e torturado por agentes do regime militar, em 1970.",
    },
    category: "article",
    media: { type: "none" },
    externalUrl:
      "https://fashionlismo.com.br/zuzu-angel-linha-e-agulha-contra-a-ditadura-militar-no-pais/",
    platform: "Fashionlismo",
    publishedAt: "2023-12-02T00:00:00Z",
    featured: true,
    order: 2,
  },
  {
    _type: "work",
    title: {
      en: "CCXP Consolidates as the Largest Pop Culture Event in the World",
      pt: "CCXP consolida-se como maior evento de cultura pop e geek do mundo",
    },
    slug: { _type: "slug", current: "ccxp-2023" },
    excerpt: {
      en: "Comic Con Experience became the world's largest pop and geek event, attracting approximately 300,000 attendees.",
      pt: "A Comic Con Experience se consolidou como o maior evento de cultura pop e geek do mundo, atraindo cerca de 300 mil participantes.",
    },
    category: "article",
    media: { type: "none" },
    externalUrl:
      "https://medium.com/@marjory.frojoni/ccxp-consolida-se-como-maior-evento-de-cultura-pop-e-geek-do-mundo-c259451655b1",
    platform: "Medium",
    publishedAt: "2023-09-27T00:00:00Z",
    featured: true,
    order: 3,
  },
  {
    _type: "work",
    title: {
      en: "App Delivery Workers Face Greater Job Precarity During Quarantine",
      pt: "Entregadores de aplicativos sofrem maior precarização do trabalho durante a quarentena",
    },
    slug: { _type: "slug", current: "entregadores-apps" },
    excerpt: {
      en: "Examining app delivery workers' deteriorating conditions and corporate contradictions during the pandemic.",
      pt: "Investigação sobre a precarização das condições dos entregadores de aplicativos e as contradições corporativas durante a pandemia.",
    },
    category: "article",
    media: { type: "none" },
    externalUrl:
      "https://jornalismoespecializadounesp.wordpress.com/2020/06/30/entregadores-de-aplicativos-sofrem-maior-precarizacao-do-trabalho-durante-a-quarentena/",
    platform: "WordPress",
    publishedAt: "2020-06-30T00:00:00Z",
    featured: false,
    order: 4,
  },
  {
    _type: "work",
    title: {
      en: "CMED Changes Discussed at PRO Health Subscriber Event",
      pt: "Mudanças na CMED foram tema de call para assinantes PRO Saúde",
    },
    slug: { _type: "slug", current: "cmed-pro-saude" },
    excerpt: {
      en: "Coverage of CMED regulatory changes discussed at a subscriber-exclusive call with JOTA analysts.",
      pt: "Cobertura das mudanças regulatórias na CMED discutidas em call exclusiva com analistas do JOTA.",
    },
    category: "consulting",
    media: { type: "none" },
    externalUrl:
      "https://jota.info/blog/mudancas-na-cmed-foram-tema-de-call-para-assinantes-pro-saude-08082023",
    platform: "JOTA Info",
    publishedAt: "2023-08-08T00:00:00Z",
    featured: false,
    order: 5,
  },
  {
    _type: "work",
    title: { en: "X-Ray of Lula 3", pt: "Raio-x de Lula 3" },
    slug: { _type: "slug", current: "raio-x-lula-3" },
    excerpt: {
      en: "Political approval analysis showing shifts in electoral demographics and rejection metrics.",
      pt: "Análise de aprovação política mostrando mudanças demográficas eleitorais e métricas de rejeição.",
    },
    category: "consulting",
    media: { type: "none" },
    externalUrl: "https://jota.info/especiais/raio-x-de-lula-3-26072023",
    platform: "JOTA Info",
    publishedAt: "2023-07-26T00:00:00Z",
    featured: true,
    order: 6,
  },
  {
    _type: "work",
    title: {
      en: "PRO Analysts Unpack Tax Reform Politics at Subscriber Event",
      pt: "Analistas PRO destrincham jogo político da reforma tributária em evento para assinantes",
    },
    slug: { _type: "slug", current: "reforma-tributaria" },
    excerpt: {
      en: "Behind-the-scenes political analysis of the tax reform process for professional subscribers.",
      pt: "Análise política dos bastidores do processo de reforma tributária para assinantes profissionais.",
    },
    category: "consulting",
    media: { type: "none" },
    externalUrl:
      "https://jota.info/blog/analistas-pro-destrincham-jogo-politico-da-reforma-tributaria-em-evento-para-assinantes-05072023",
    platform: "JOTA Info",
    publishedAt: "2023-07-05T00:00:00Z",
    featured: false,
    order: 7,
  },
  {
    _type: "work",
    title: {
      en: "Xenotransplantation: Everything About the New Scientific Advance | Hemodiálogos EP #04",
      pt: "Xenotransplante: Saiba tudo sobre o novo avanço científico que salvará vidas | Hemodiálogos EP #04",
    },
    slug: { _type: "slug", current: "xenotransplante-hemodialogos-04" },
    excerpt: {
      en: "Interview with Dr. Ernesto Goulart about xenotransplant breakthroughs and their impact on organ donation.",
      pt: "Entrevista com Dr. Ernesto Goulart sobre avanços em xenotransplante e seu impacto na doação de órgãos.",
    },
    category: "podcast",
    media: { type: "youtube", youtubeUrl: "https://youtube.com/watch?v=1_Swb5Fg8dw" },
    externalUrl: "https://youtube.com/watch?v=1_Swb5Fg8dw",
    platform: "Nefrostar",
    publishedAt: "2023-11-01T00:00:00Z",
    featured: true,
    order: 8,
  },
  {
    _type: "work",
    title: {
      en: "Health Insurance Operators in Brazil: A Panoramic View | Hemodiálogos EP #03",
      pt: "Operadoras de saúde no país: uma visão panorâmica | Hemodiálogos EP #03",
    },
    slug: { _type: "slug", current: "operadoras-saude-hemodialogos-03" },
    excerpt: {
      en: "Healthcare market analysis with founder discussing the transformation of Brazil's health insurance sector.",
      pt: "Análise do mercado de saúde com fundador discutindo a transformação do setor de planos de saúde no Brasil.",
    },
    category: "podcast",
    media: { type: "youtube", youtubeUrl: "https://youtube.com/watch?v=xlfnNc-EwD4" },
    externalUrl: "https://youtube.com/watch?v=xlfnNc-EwD4&t=1793s",
    platform: "Nefrostar",
    publishedAt: "2023-10-20T00:00:00Z",
    featured: false,
    order: 9,
  },
  {
    _type: "work",
    title: { en: "Nefrostar: The Beginning", pt: "Nefrostar: O início" },
    slug: { _type: "slug", current: "nefrostar-o-inicio" },
    excerpt: {
      en: "Founder discusses hemodiafiltration technology implementation and premium patient care approach.",
      pt: "Fundador discute implementação de tecnologia de hemodiafiltração e abordagem de cuidado premium ao paciente.",
    },
    category: "podcast",
    media: { type: "youtube", youtubeUrl: "https://youtube.com/watch?v=fVrmhEss0Co" },
    externalUrl: "https://youtube.com/watch?v=fVrmhEss0Co",
    platform: "Nefrostar",
    publishedAt: "2023-10-18T00:00:00Z",
    featured: false,
    order: 10,
  },
  {
    _type: "work",
    title: {
      en: "Yellow September: A Conversation About Mental Health | Hemodiálogos EP #01",
      pt: "Setembro Amarelo: um papo sobre saúde mental | Hemodiálogos EP #01",
    },
    slug: { _type: "slug", current: "setembro-amarelo-hemodialogos-01" },
    excerpt: {
      en: "Psychologist Leslie Figueiredo discussing mental health awareness for chronic kidney disease patients.",
      pt: "Psicóloga Leslie Figueiredo discutindo conscientização sobre saúde mental para pacientes com doença renal crônica.",
    },
    category: "podcast",
    media: { type: "youtube", youtubeUrl: "https://youtube.com/watch?v=3lIGtPksm1Y" },
    externalUrl: "https://youtube.com/watch?v=3lIGtPksm1Y",
    platform: "Nefrostar",
    publishedAt: "2023-09-19T00:00:00Z",
    featured: false,
    order: 11,
  },
];

const siteSettings = {
  _type: "siteSettings",
  _id: "siteSettings",
  name: { en: "Marjory Frojoni", pt: "Marjory Frojoni" },
  tagline: {
    en: "Journalist & Storyteller",
    pt: "Jornalista & Comunicadora",
  },
  bio: {
    en: [
      {
        _type: "block",
        _key: "en1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "en1s",
            text: "I'm a journalist by training and a communicator by nature. Communication is my passion and the way I move the world around me — I want to know, record, share, and impact what I see and live.",
            marks: [],
          },
        ],
      },
    ],
    pt: [
      {
        _type: "block",
        _key: "pt1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "pt1s",
            text: "Sou jornalista de formação e comunicadora de nascença. Comunicação é a minha paixão e a maneira como eu movimento o ambiente ao meu redor — quero conhecer, registrar, compartilhar e impactar o que vejo e vivo.",
            marks: [],
          },
        ],
      },
    ],
  },
  email: "marjory.frojoni@unesp.br",
  socialLinks: [
    { _key: "li", platform: "linkedin", url: "https://linkedin.com/in/marjory-frojoni/" },
  ],
};

async function seed() {
  console.log(`Seeding Sanity project "${projectId}" dataset "${dataset}"...\n`);

  // NOTE: Site Settings is now owned by scripts/seed-content.ts (richer schema:
  // photo, WhatsApp, location, CV, etc.). Intentionally NOT written here so this
  // script doesn't clobber it. `siteSettings` const kept for reference only.
  void siteSettings;

  // Create works
  console.log(`→ ${works.length} works...`);
  const transaction = client.transaction();
  for (const work of works) {
    transaction.create(work);
  }
  await transaction.commit();
  console.log("  ✓ Done\n");

  console.log("Seed complete! Open /studio to manage your content.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
