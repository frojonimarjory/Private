/**
 * Upload cover images and update work descriptions in Sanity.
 * Usage: npx tsx --env-file=.env.local scripts/update-covers.ts
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

const coversDir =
  process.platform === "win32"
    ? path.join(process.env.LOCALAPPDATA || "", "Temp", "covers")
    : "/tmp/covers";

type WorkUpdate = {
  slug: string;
  coverFile?: string;
  description?: { en: string; pt: string };
};

const updates: WorkUpdate[] = [
  {
    slug: "zuzu-angel",
    coverFile: "zuzu-angel.jpg",
    description: {
      en: "Brazilian fashion designer Zuleika de Souza Netto, known as Zuzu Angel, used her 1971 New York fashion show as a form of resistance against Brazil's military dictatorship. Her clothes, music, and atmosphere carried a message of protest: the murder of her son Stuart Angel, kidnapped and tortured by agents of the regime in 1970. This article examines how she leveraged fashion as a tool for human rights advocacy.",
      pt: "A estilista brasileira Zuleika de Souza Netto, conhecida como Zuzu Angel, usou seu desfile de moda em Nova York em 1971 como forma de resistência contra a ditadura militar brasileira. Suas roupas, músicas e atmosfera carregavam uma mensagem de protesto: o assassinato de seu filho Stuart Angel, sequestrado e torturado por agentes do regime em 1970. Este artigo examina como ela usou a moda como ferramenta de defesa dos direitos humanos.",
    },
  },
  {
    slug: "ccxp-2023",
    coverFile: "ccxp.png",
    description: {
      en: "Comic Con Experience (CCXP) became the world's largest pop culture event. The 2022 edition drew nearly 300,000 attendees in São Paulo, featuring celebrities like Bruna Marquezine and Jenna Ortega. Founded by former marketing professionals who created the Omelete portal, CCXP surpassed San Diego Comic Con in attendance within four years of its 2014 debut. The pandemic forced an adaptation to virtual formats that expanded global reach to over 113 countries.",
      pt: "A Comic Con Experience (CCXP) se consolidou como o maior evento de cultura pop do mundo. A edição de 2022 atraiu quase 300 mil participantes em São Paulo, com celebridades como Bruna Marquezine e Jenna Ortega. Fundada por ex-profissionais de marketing que criaram o portal Omelete, a CCXP superou a San Diego Comic Con em público em quatro anos desde sua estreia em 2014. A pandemia forçou uma adaptação para formatos virtuais que expandiu o alcance global para mais de 113 países.",
    },
  },
  {
    slug: "entregadores-apps",
    coverFile: "entregadores.jpg",
    description: {
      en: "This investigation examines how COVID-19 intensified precarious working conditions for app-based delivery workers. During the pandemic, these workers faced doubled health risks while experiencing reduced income. Despite increased demand for delivery services, rising numbers of couriers competing for work decreased individual earnings. The article exposes arbitrary account suspensions, inadequate per-kilometer compensation, and lack of fundamental labor protections.",
      pt: "Esta investigação examina como a COVID-19 intensificou as condições precárias de trabalho dos entregadores de aplicativos. Durante a pandemia, esses trabalhadores enfrentaram riscos de saúde duplicados com renda reduzida. Apesar do aumento na demanda por entregas, o número crescente de entregadores competindo por trabalho reduziu os ganhos individuais. O artigo expõe bloqueios arbitrários de contas, compensação inadequada por quilômetro e falta de proteções trabalhistas fundamentais.",
    },
  },
  {
    slug: "cmed-pro-saude",
    coverFile: "cmed.jpg",
    description: {
      en: "Coverage of CMED regulatory changes discussed at a subscriber-exclusive call with JOTA analysts. The analysts discussed healthcare sector scenarios projected for the second half of the year, providing in-depth analysis of pharmaceutical pricing regulation shifts and their impact on the Brazilian health industry.",
      pt: "Cobertura das mudanças regulatórias na CMED discutidas em call exclusiva para assinantes com analistas do JOTA. Os analistas discutiram cenários do setor da saúde projetados para o segundo semestre, fornecendo análise aprofundada das mudanças na regulação de preços farmacêuticos e seu impacto na indústria de saúde brasileira.",
    },
  },
  {
    slug: "raio-x-lula-3",
    coverFile: "raio-x-lula.jpg",
    description: {
      en: "A special JOTA report examining President Lula's popularity across demographic segments during the first half of 2023. The analysis covers approval ratings broken down by region, gender, age, income, education level, and religious affiliation, providing a comprehensive x-ray of the political landscape under Lula's third term.",
      pt: "Relatório especial do JOTA examinando a popularidade do presidente Lula em diferentes segmentos demográficos durante o primeiro semestre de 2023. A análise abrange índices de aprovação divididos por região, gênero, idade, renda, nível de escolaridade e afiliação religiosa, fornecendo um raio-x abrangente do cenário político no terceiro mandato de Lula.",
    },
  },
  {
    slug: "reforma-tributaria",
    coverFile: "reforma-tributaria.jpg",
    description: {
      en: "Behind-the-scenes political analysis of the tax reform process for JOTA professional subscribers. The event featured JOTA analysts unpacking the political maneuvering behind Brazil's tax reform, including key negotiations in the Chamber of Representatives and the strategic positions of different political players.",
      pt: "Análise política dos bastidores do processo de reforma tributária para assinantes profissionais do JOTA. O evento contou com analistas do JOTA desvendando as manobras políticas por trás da reforma tributária do Brasil, incluindo negociações-chave na Câmara dos Deputados e as posições estratégicas de diferentes atores políticos.",
    },
  },
];

async function uploadImage(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).slice(1);
  const contentType =
    ext === "png" ? "image/png" : ext === "gif" ? "image/gif" : "image/jpeg";
  return client.assets.upload("image", buffer, { contentType });
}

function makeBlocks(text: string, key: string) {
  return [
    {
      _type: "block",
      _key: key,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
    },
  ];
}

async function run() {
  for (const u of updates) {
    // Find the work document
    const work = await client.fetch(
      `*[_type == "work" && slug.current == $slug][0]{ _id }`,
      { slug: u.slug }
    );
    if (!work) {
      console.log(`⚠ Work "${u.slug}" not found, skipping`);
      continue;
    }

    const patch: Record<string, unknown> = {};

    // Upload cover image
    if (u.coverFile) {
      const filePath = path.join(coversDir, u.coverFile);
      if (fs.existsSync(filePath)) {
        console.log(`  Uploading ${u.coverFile}...`);
        const asset = await uploadImage(filePath);
        patch.cover = {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        };
      }
    }

    // Update description
    if (u.description) {
      patch.description = {
        en: makeBlocks(u.description.en, "en1"),
        pt: makeBlocks(u.description.pt, "pt1"),
      };
    }

    if (Object.keys(patch).length) {
      await client.patch(work._id).set(patch).commit();
      console.log(`✓ Updated "${u.slug}"`);
    }
  }

  console.log("\nDone!");
}

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
