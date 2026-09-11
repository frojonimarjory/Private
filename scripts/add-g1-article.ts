/**
 * Add Marjory's G1 / TV TEM report ("pobreza menstrual") as an "article" work,
 * with the full text hosted (EN + PT) and the original G1 link as reference.
 *
 * Content was extracted + translated by article-tools/scrape_translate.py,
 * then cleaned here (repeated image captions removed, quotes marked).
 *
 * Usage: npx tsx --env-file=.env.local scripts/add-g1-article.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const SLUG = "pobreza-menstrual-absorventes-rio-preto";
const EXTERNAL_URL =
  "https://g1.globo.com/sp/sao-jose-do-rio-preto-aracatuba/noticia/2025/11/09/pobreza-menstrual-escola-oferece-absorventes-para-adolescentes-em-situacao-de-vulnerabilidade-no-interior-de-sp.ghtml";

type Item = { type: "p" | "h3" | "quote"; text: string };

function buildBlocks(items: Item[], prefix: string) {
  return items.map((item, i) => {
    const key = `${prefix}${i}`;
    const style =
      item.type === "h3" ? "h3" : item.type === "quote" ? "blockquote" : "normal";
    return {
      _type: "block",
      _key: key,
      style,
      markDefs: [],
      children: [{ _type: "span", _key: `${key}s`, text: item.text, marks: [] }],
    };
  });
}

const ptItems: Item[] = [
  {
    type: "p",
    text: "Uma escola estadual de São José do Rio Preto (SP) criou maneiras de falar sobre menstruação com mais naturalidade e empatia. Nas rodas de conversa, as alunas têm a oportunidade de tirar dúvidas com professores e profissionais da saúde, criando um espaço seguro para compartilhar experiências.",
  },
  {
    type: "p",
    text: "Além das atividades educativas, em dois locais da escola, há estoque de absorventes, caso as alunas em situação de vulnerabilidade precisem. A pobreza menstrual interfere na liberdade de adolescentes e mulheres, podendo gerar prejuízo psicológico e problemas sérios de saúde física.",
  },
  {
    type: "p",
    text: "Durante os encontros, as estudantes são incentivadas a falar sobre o próprio corpo, entender o ciclo menstrual e desconstruir preconceitos que ainda cercam o assunto. A proposta é tratar a menstruação como um processo biológico comum e não como algo vergonhoso.",
  },
  {
    type: "p",
    text: "Em entrevista à TV TEM, o diretor da escola, Denis Vander Rocha, comentou que o diálogo é o primeiro passo para quebrar tabus que atravessam gerações.",
  },
  {
    type: "quote",
    text: "A falta de informação é um problema, e a falta do produto [absorvente] também é outro problema. Existem relatos de meninas que, nesse período, não vêm para a escola porque não têm o absorvente. Apesar da orientação de que é uma coisa fisiológica e comum a todas as mulheres, ainda há esse tabu, essa resistência, há a vergonha. Por isso, procuramos deixar onde há mulheres.",
  },
  {
    type: "p",
    text: "Aos dez anos, Rayssa Abraão Ignácio menstruou pela primeira vez. A infância marcada por dificuldades financeiras traz lembranças de situações que ela não gostaria de ter vivido.",
  },
  {
    type: "p",
    text: "Mesmo que para muitas mulheres ter acesso ao produto seja algo corriqueiro, para a dona de casa fazia falta durante sua adolescência. À reportagem, ela explicou que ir para a escola sem ter o absorvente adequado era um desafio.",
  },
  {
    type: "quote",
    text: "A minha família é muito humilde. Então, a gente não tinha dinheiro para comprar absorvente. Minha mãe usava pano velho e costurava atrás do papel de arroz, aí eu ia para a escola. Às vezes, quando não tinha pano, eu precisava faltar ou perguntava se alguma vizinha tinha para emprestar. Quando não, pegava jornal ou papel para usar. Eu ficava com medo de manchar a minha roupa, alguém olhar e falar alguma coisa.",
  },
  {
    type: "p",
    text: "A médica ginecologista Vanessa Goulart alerta que a utilização de materiais inadequados ao longo do período menstrual pode trazer riscos à saúde da mulher.",
  },
  {
    type: "quote",
    text: "O uso de materiais inadequados para o cuidado pode levar a infecções genitais. Algumas meninas usam pão, folhas e tecidos sujos. Nas escolas, não há acesso à água encanada para lavar as próprias mãos e para se higienizar caso haja um transbordamento de sangue desses materiais já inadequados. A gente vê um absenteísmo grande nas escolas e no trabalho também.",
  },
  { type: "h3", text: "Dificuldade comum no Brasil" },
  {
    type: "p",
    text: "Essa é uma realidade presente em todo o país. Um estudo feito pela Unicef mostrou que seis a cada dez jovens brasileiras já deixaram de ir à escola ou ao trabalho porque estavam menstruadas.",
  },
  {
    type: "p",
    text: "Das 2,2 mil entrevistadas na pesquisa, 19% alegaram não ter dinheiro para comprar absorventes e 37% têm dificuldades de acesso a itens de higiene em escolas ou locais públicos.",
  },
  {
    type: "p",
    text: 'Esses números caracterizam um problema socioeconômico que tem nome: "pobreza menstrual", ou seja, a falta de acesso a itens básicos de higiene durante a menstruação, por falta de poder aquisitivo ou de informação.',
  },
  {
    type: "p",
    text: "Na pesquisa da Unicef, 77% das jovens disseram que já sentiram constrangimento em escolas ou lugares públicos por menstruarem e quase a metade nunca teve aulas ou palestras sobre o tema.",
  },
  {
    type: "p",
    text: "Embora os números retratem o problema, a oficial de participação de adolescentes da Unicef Brasil, Gabriela Mora, explicou que existem poucas políticas públicas voltadas ao tema.",
  },
  {
    type: "quote",
    text: "É preciso fornecer às meninas e mulheres todos os insumos necessários para garantir sua dignidade nesse período em que todas passam e que é natural. Para que possam ocupar espaços de liderança, praticar esportes, ir à praia e à piscina e também trabalhar sua própria educação sobre o tema, para que as escolas o abordem de maneira saudável, ajudando não só as meninas, mas os meninos também, a entender que isso não é motivo de vergonha. É preciso apoiar as meninas e mulheres nesse período menstrual para que elas não tenham seus direitos violados ou menos direitos que ninguém.",
  },
];

const enItems: Item[] = [
  {
    type: "p",
    text: "A state school in São José do Rio Preto (São Paulo) has created ways to talk about menstruation more naturally and with empathy. In conversation circles, students get the chance to ask questions to teachers and health professionals, building a safe space to share experiences.",
  },
  {
    type: "p",
    text: "Beyond the educational activities, two spots in the school keep a stock of sanitary pads in case students in vulnerable situations need them. Menstrual poverty interferes with the freedom of adolescents and women, and can cause psychological harm and serious physical health problems.",
  },
  {
    type: "p",
    text: "During the meetings, students are encouraged to talk about their own bodies, understand the menstrual cycle and deconstruct the prejudices that still surround the subject. The idea is to treat menstruation as a common biological process, not as something shameful.",
  },
  {
    type: "p",
    text: "In an interview with TV TEM, the school's director, Denis Vander Rocha, said that dialogue is the first step to breaking taboos that span generations.",
  },
  {
    type: "quote",
    text: "The lack of information is a problem, and the lack of the product [the sanitary pad] is another problem. There are reports of girls who, during this period, do not come to school because they do not have a pad. Despite the guidance that it is a physiological thing, common to all women, there is still this taboo, this resistance, there is shame. That's why we try to leave them where the women are.",
  },
  {
    type: "p",
    text: "At the age of ten, Rayssa Abraão Ignácio menstruated for the first time. A childhood marked by financial hardship brings back memories of situations she wishes she had never lived through.",
  },
  {
    type: "p",
    text: "Even though having access to the product is routine for many women, the housewife went without it during her adolescence. She told the report that going to school without an adequate sanitary pad was a challenge.",
  },
  {
    type: "quote",
    text: "My family is very humble. So we didn't have money to buy pads. My mother used old cloth and sewed it onto the back of rice paper, and then I went to school. Sometimes, when there was no cloth, I had to skip school or ask whether a neighbor had one to lend me. When they didn't, I'd grab newspaper or paper to use. I was afraid of staining my clothes, of someone looking and saying something.",
  },
  {
    type: "p",
    text: "Gynecologist Vanessa Goulart warns that using inappropriate materials during the menstrual period can pose risks to women's health.",
  },
  {
    type: "quote",
    text: "Using inappropriate materials for care can lead to genital infections. Some girls use bread, leaves and dirty fabrics. In schools, there is no access to running water to wash their hands or clean themselves if these already inadequate materials overflow with blood. We see a lot of absenteeism in schools and at work too.",
  },
  { type: "h3", text: "A common hardship across Brazil" },
  {
    type: "p",
    text: "This is a reality found across the country. A study by UNICEF showed that six out of ten young Brazilian women have already skipped school or work because they were menstruating.",
  },
  {
    type: "p",
    text: "Of the 2,200 people surveyed, 19% said they had no money to buy sanitary pads and 37% had difficulty accessing hygiene items at schools or in public places.",
  },
  {
    type: "p",
    text: 'These figures describe a socioeconomic problem that has a name: "menstrual poverty" — the lack of access to basic hygiene items during menstruation, due to a lack of purchasing power or information.',
  },
  {
    type: "p",
    text: "In the UNICEF survey, 77% of young women said they had felt embarrassed at schools or in public places because they were menstruating, and almost half had never had classes or talks about the topic.",
  },
  {
    type: "p",
    text: "Although the numbers portray the problem, UNICEF Brazil's adolescent participation officer, Gabriela Mora, explained that there are few public policies focused on the issue.",
  },
  {
    type: "quote",
    text: "We need to provide girls and women with all the supplies necessary to guarantee their dignity during this period that everyone goes through and that is natural — so they can occupy leadership positions, play sports, go to the beach and the pool, and also build their own education on the subject, so schools address it in a healthy way, helping not only girls but boys too to understand that this is nothing to be ashamed of. We need to support girls and women during this menstrual period so their rights are not violated and they do not have fewer rights than anyone else.",
  },
];

async function run() {
  const existing = await client.fetch(
    `*[_type=="work" && slug.current==$slug][0]{ _id }`,
    { slug: SLUG }
  );
  if (existing) {
    console.log(`⤼ "${SLUG}" already exists (${existing._id}), skipping`);
    return;
  }

  const maxOrder: number = await client.fetch(`math::max(*[_type=="work"].order)`);

  const doc = {
    _type: "work",
    title: {
      en: "Menstrual Poverty: School Offers Sanitary Pads to Vulnerable Teenagers in Rural São Paulo",
      pt: "Pobreza menstrual: escola oferece absorventes para adolescentes em situação de vulnerabilidade no interior de SP",
    },
    slug: { _type: "slug", current: SLUG },
    excerpt: {
      en: "A state school in the interior of São Paulo confronts menstrual poverty — offering free sanitary pads and open conversation circles so vulnerable students don't miss class.",
      pt: "Uma escola estadual do interior de São Paulo enfrenta a pobreza menstrual — com absorventes gratuitos e rodas de conversa para que alunas em vulnerabilidade não faltem às aulas.",
    },
    description: {
      en: buildBlocks(enItems, "en"),
      pt: buildBlocks(ptItems, "pt"),
    },
    category: "article",
    media: { type: "none" },
    externalUrl: EXTERNAL_URL,
    platform: "G1 / TV TEM",
    publishedAt: "2025-11-09T00:00:00Z",
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
