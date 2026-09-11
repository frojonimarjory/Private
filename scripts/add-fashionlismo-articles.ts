/**
 * Add Marjory's Fashionlismo articles to Sanity as "article" works.
 * Downloads each article's featured image and uploads it as the cover.
 *
 * Usage: npx tsx --env-file=.env.local scripts/add-fashionlismo-articles.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

type Article = {
  slug: string;
  order: number;
  title: { en: string; pt: string };
  excerpt: { en: string; pt: string };
  description: { en: string; pt: string };
  externalUrl: string;
  publishedAt: string;
  imageUrl: string;
};

const articles: Article[] = [
  {
    slug: "rahul-mishra-couture-2024",
    order: 12,
    title: {
      en: "Rahul Mishra Delivers Conscious Luxury and Drama at Paris Haute Couture Week",
      pt: "Rahul Mishra entregou luxo consciente e drama na Semana de Alta Costura parisiense",
    },
    excerpt: {
      en: "Indian designer Rahul Mishra turns endangered biodiversity into intricate, artisan-embroidered drama with his 'Superheroes' couture collection in Paris.",
      pt: "O estilista indiano Rahul Mishra transforma a biodiversidade ameaçada em bordados artesanais e dramáticos com sua coleção de alta-costura 'Superheroes', em Paris.",
    },
    description: {
      en: "Indian designer Rahul Mishra presented his 'Superheroes' collection during Paris Haute Couture Week, pairing conscious luxury with theatrical presentation. Across 45 looks, intricate embroidery by Indian artisans depicts endangered biodiversity — butterflies, dragonflies, lizards and serpents — rendered in vibrant color, turbans, gold and silver detailing, and ethereal tulle.\n\nMishra uses his platform to advocate for environmental awareness and sustainable practice, describing insects and reptiles as 'benevolent architects of the planet' and calling for humanity to coexist with nature rather than harm it.",
      pt: "O estilista indiano Rahul Mishra apresentou sua coleção 'Superheroes' durante a Semana de Alta Costura de Paris, unindo luxo consciente a uma apresentação teatral. Em 45 looks, bordados minuciosos feitos por artesãos indianos retratam a biodiversidade ameaçada — borboletas, libélulas, lagartos e serpentes — em cores vibrantes, turbantes, detalhes em ouro e prata e tules etéreos.\n\nMishra usa sua plataforma para defender a consciência ambiental e práticas sustentáveis, descrevendo insetos e répteis como 'arquitetos benevolentes do planeta' e conclamando a humanidade a coexistir com a natureza em vez de agredi-la.",
    },
    externalUrl:
      "https://fashionlismo.com.br/rahul-mishra-entregou-luxo-consciente-e-drama-na-semana-alta-costura-parisiense/",
    publishedAt: "2024-01-23T00:00:00Z",
    imageUrl:
      "https://fashionlismo.com.br/wp-content/uploads/2024/01/00045-rahul-mishra-spring-2024-couture-credit-gorunway-1140x1710.webp",
  },
  {
    slug: "chloe-nova-direcao-2024",
    order: 13,
    title: {
      en: "Chloé Shines Under New Creative Direction at Paris Fashion Week",
      pt: "Chloé brilha sob nova direção na Semana de Moda de Paris",
    },
    excerpt: {
      en: "Chemena Kamali's debut as Chloé's creative director revives the house's 70s boho-chic soul with sheer fabrics, ruffles, lace and fringe.",
      pt: "A estreia de Chemena Kamali como diretora criativa da Chloé resgata a alma boho-chic anos 70 da marca com transparências, babados, rendas e franjas.",
    },
    description: {
      en: "The article celebrates Chemena Kamali's successful debut as creative director of Chloé at Paris Fashion Week. Returning to the house after stints alongside Phoebe Philo and at Saint Laurent, Kamali delivered a 70s-inspired collection that reclaimed the brand's boho-chic essence.\n\nThe looks combined ruffles, sheer fabrics, lace and fringe with fluid silhouettes that balanced romance and modernity. Bolder touches — a 'Free the Nipple' motif, statement belts, and a styling trick tucking dresses into above-the-knee boots — rounded out a collection critics hailed as a triumphant return, praising Kamali's command of form and texture.",
      pt: "O artigo celebra a estreia bem-sucedida de Chemena Kamali como diretora criativa da Chloé na Semana de Moda de Paris. De volta à marca após passagens ao lado de Phoebe Philo e na Saint Laurent, Kamali apresentou uma coleção inspirada nos anos 70 que resgatou a essência boho-chic da casa.\n\nOs looks combinaram babados, transparências, rendas e franjas a silhuetas fluidas que equilibravam romantismo e modernidade. Detalhes mais audaciosos — o motivo 'Free the Nipple', cintos marcantes e um truque de styling prendendo vestidos em botas acima do joelho — completaram uma coleção saudada pela crítica como um retorno triunfal, elogiando o domínio de Kamali sobre formas e texturas.",
    },
    externalUrl:
      "https://fashionlismo.com.br/chloe-brilha-sob-nova-direcao-na-semana-de-moda-de-paris/",
    publishedAt: "2024-03-06T00:00:00Z",
    imageUrl:
      "https://fashionlismo.com.br/wp-content/uploads/2024/03/429676943_18416031178059618_1767957247953447386_n.jpg",
  },
  {
    slug: "bottega-veneta-quiet-luxury",
    order: 14,
    title: {
      en: "Bottega Veneta: The Epitome of Quiet Luxury",
      pt: "Bottega Veneta: a epítome do quiet luxury",
    },
    excerpt: {
      en: "At Milan Fashion Week, Matthieu Blazy balances Bottega Veneta's signature intrecciato craft with contemporary cuts — and lets the handbags steal the show.",
      pt: "Na Semana de Moda de Milão, Matthieu Blazy equilibra o intrecciato característico da Bottega Veneta com cortes contemporâneos — e deixa as bolsas roubarem a cena.",
    },
    description: {
      en: "The article covers Bottega Veneta's Milan Fashion Week show, where creative director Matthieu Blazy struck a balance between classic elegance and contemporary innovation. The collection showcased the brand's signature intrecciato (woven leather) while introducing oversized silhouettes, deconstructed collars, fringe detailing and abstract floral prints.\n\nHandbags emerged as the highlight, shown in varied sizes, styles and colors from burnt orange to baby blue. Through textural variation and unconventional cuts, Blazy infused a modern aesthetic without compromising the brand's practicality or established identity — a lesson in how a heritage luxury house can evolve while keeping its design DNA intact.",
      pt: "O artigo cobre o desfile da Bottega Veneta na Semana de Moda de Milão, no qual o diretor criativo Matthieu Blazy equilibrou elegância clássica e inovação contemporânea. A coleção exibiu o característico intrecciato (couro trançado) da marca ao introduzir silhuetas oversized, golas desconstruídas, detalhes de franjas e estampas florais abstratas.\n\nAs bolsas foram o destaque, apresentadas em variados tamanhos, estilos e cores, do laranja-queimado ao azul-bebê. Por meio de variações de textura e cortes não convencionais, Blazy imprimiu uma estética moderna sem comprometer a praticidade e a identidade consolidada da marca — uma lição de como uma casa de luxo tradicional pode evoluir mantendo intacto o seu DNA de design.",
    },
    externalUrl: "https://fashionlismo.com.br/bottega-veneta-a-epitome-do-quiet-luxury/",
    publishedAt: "2024-03-05T00:00:00Z",
    imageUrl:
      "https://fashionlismo.com.br/wp-content/uploads/2024/02/429993189_415853247639778_6696639411185731111_n.jpg",
  },
  {
    slug: "masha-popova",
    order: 15,
    title: {
      en: "Masha Popova: Enemy of Linearity and Symmetry",
      pt: "Masha Popova: inimiga da linearidade e da simetria",
    },
    excerpt: {
      en: "Ukrainian designer Masha Popova opened London Fashion Week 2024 with a rebellious aesthetic that rejects symmetry and the industry's superficial 'fashion façade'.",
      pt: "A estilista ucraniana Masha Popova abriu a London Fashion Week 2024 com uma estética rebelde que rejeita a simetria e a superficial 'fachada fashion' da indústria.",
    },
    description: {
      en: "The piece profiles Ukrainian designer Masha Popova, a Central Saint Martins graduate who opened London Fashion Week 2024 on February 16. Popova challenges fashion conventions, criticizing the industry's superficial 'fashion façade' through an aesthetic that rejects perfect symmetry.\n\nHer collection favored alternative materials — hammered brass accessories and denim customized with diagonal cuts — over Swarovski crystals. Blending 'irreverent elegance' with 'sporty decadence', Popova's work has drawn recognition from the likes of Billie Eilish and Dua Lipa.",
      pt: "A matéria traça o perfil da estilista ucraniana Masha Popova, formada pela Central Saint Martins, que abriu a London Fashion Week 2024 em 16 de fevereiro. Popova desafia as convenções da moda, criticando a superficial 'fachada fashion' da indústria por meio de uma estética que rejeita a simetria perfeita.\n\nSua coleção privilegiou materiais alternativos — acessórios em latão batido e jeans customizado com cortes diagonais — no lugar de cristais Swarovski. Combinando 'elegância irreverente' e 'decadência esportiva', o trabalho de Popova já conquistou o reconhecimento de nomes como Billie Eilish e Dua Lipa.",
    },
    externalUrl:
      "https://fashionlismo.com.br/masha-popova-inimiga-da-linearidade-e-da-simetria/",
    publishedAt: "2024-02-25T00:00:00Z",
    imageUrl:
      "https://fashionlismo.com.br/wp-content/uploads/2024/02/427971475_393821390063739_3633093875091619801_n-1.jpg",
  },
  {
    slug: "tommy-hilfiger-comeback",
    order: 16,
    title: {
      en: "Tommy Hilfiger's Comeback to the Runway",
      pt: "O comeback de Tommy Hilfiger à passarela",
    },
    excerpt: {
      en: "Tommy Hilfiger returns to New York Fashion Week with 'A New York Moment' — an intimate, craft-focused show in the city's white, red and blue.",
      pt: "Tommy Hilfiger volta à New York Fashion Week com 'A New York Moment' — um desfile intimista e artesanal nas cores branco, vermelho e azul da cidade.",
    },
    description: {
      en: "Tommy Hilfiger marked his return to New York Fashion Week after years of touring global shows, closing the first day of the Winter 2024 event with impact. The collection revisited the brand's classics — pleated skirts, varsity sweatshirts and assorted collars — through a New York lens, in the white, red and blue of the city's flag.\n\nTitled 'A New York Moment', the show adopted a more intimate format, dropping the see-now-buy-now model in favor of higher-quality, craft-focused pieces delivered months later. It drew international and Brazilian celebrities alike, including Jade Picon, Malu Borges, K-pop's Lee Junho and Sofia Richie.",
      pt: "Tommy Hilfiger marcou seu retorno à New York Fashion Week após anos de desfiles em turnê global, encerrando com impacto o primeiro dia do evento de inverno 2024. A coleção revisitou os clássicos da marca — saias plissadas, moletons universitários e diversas golas — sob um olhar nova-iorquino, nas cores branco, vermelho e azul da bandeira da cidade.\n\nIntitulado 'A New York Moment', o desfile adotou um formato mais intimista, abandonando o modelo see-now-buy-now em favor de peças artesanais de maior qualidade, entregues meses depois. O evento atraiu celebridades internacionais e brasileiras, incluindo Jade Picon, Malu Borges, Lee Junho, do K-pop, e Sofia Richie.",
    },
    externalUrl: "https://fashionlismo.com.br/o-comeback-de-tommy-hilfiger-a-passarela/",
    publishedAt: "2024-02-15T00:00:00Z",
    imageUrl:
      "https://fashionlismo.com.br/wp-content/uploads/2024/02/426190602_1054941138899034_7624514157407252574_n-1-1140x641.jpg",
  },
  {
    slug: "mumo-museu-moda",
    order: 17,
    title: {
      en: "MUMO: Meet Brazil's First Public Fashion Museum",
      pt: "MUMO: conheça o primeiro museu de moda público do Brasil",
    },
    excerpt: {
      en: "Belo Horizonte's MUMO is Brazil's first public fashion museum — a living, free-access space for creating, exhibiting and experiencing fashion as cultural heritage.",
      pt: "O MUMO, em Belo Horizonte, é o primeiro museu de moda público do Brasil — um espaço vivo e de acesso gratuito para criar, expor e vivenciar a moda como patrimônio cultural.",
    },
    description: {
      en: "MUMO, the Belo Horizonte Fashion Museum, opened in 2016 as Brazil's first public fashion museum. Housed in a 1914 neo-Gothic building on Rua da Bahia, it functions as a dynamic space for creating, appreciating and experimenting with fashion, offering workshops, a theater, a library and rotating exhibitions — including a permanent display of pieces by designer Alceu Penna donated by his family.\n\nCoordinator Carolina Ladeira frames the museum as 'a living, dynamic entity' with free, inclusive access. A central challenge, the article notes, is winning recognition for fashion as cultural heritage on par with other art forms. MUMO is open Wednesday to Saturday, 10am to 6pm, and also offers virtual visits.",
      pt: "O MUMO, Museu da Moda de Belo Horizonte, foi inaugurado em 2016 como o primeiro museu público de moda do Brasil. Instalado em um edifício neogótico de 1914 na Rua da Bahia, funciona como um espaço dinâmico para criar, apreciar e experimentar a moda, com oficinas, teatro, biblioteca e exposições rotativas — incluindo uma mostra permanente de peças do estilista Alceu Penna doadas pela família.\n\nA coordenadora Carolina Ladeira define o museu como 'uma entidade viva e dinâmica', de acesso gratuito e inclusivo. Um desafio central, aponta o artigo, é conquistar o reconhecimento da moda como patrimônio cultural equiparado a outras formas de arte. O MUMO abre de quarta a sábado, das 10h às 18h, e também oferece visitas virtuais.",
    },
    externalUrl:
      "https://fashionlismo.com.br/mumo-conheca-o-primeiro-museu-de-moda-publico-do-brasil/",
    publishedAt: "2023-12-12T00:00:00Z",
    imageUrl:
      "https://fashionlismo.com.br/wp-content/uploads/2023/12/2019_12_10_Mumo_Exposicao_Inventando_a_Moda_Alceu_Penna_foto_Ricardo_Laf_11-1140x760.jpg",
  },
];

function makeBlocks(text: string, keyPrefix: string) {
  return text.split("\n\n").map((para, i) => ({
    _type: "block",
    _key: `${keyPrefix}${i}`,
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span", _key: `${keyPrefix}${i}s`, text: para, marks: [] }],
  }));
}

async function uploadImage(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const filename = url.split("/").pop() || "cover";
  return client.assets.upload("image", buffer, { contentType, filename });
}

async function run() {
  for (const a of articles) {
    // Skip if a work with this slug already exists
    const existing = await client.fetch(
      `*[_type == "work" && slug.current == $slug][0]{ _id }`,
      { slug: a.slug }
    );
    if (existing) {
      console.log(`⤼ "${a.slug}" already exists, skipping`);
      continue;
    }

    console.log(`→ ${a.slug}`);
    let cover;
    try {
      console.log(`  downloading cover...`);
      const asset = await uploadImage(a.imageUrl);
      cover = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
      console.log(`  ✓ cover uploaded`);
    } catch (e) {
      console.log(`  ⚠ cover failed (${(e as Error).message}) — creating without cover`);
    }

    const doc = {
      _type: "work",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      excerpt: a.excerpt,
      description: {
        en: makeBlocks(a.description.en, "en"),
        pt: makeBlocks(a.description.pt, "pt"),
      },
      ...(cover ? { cover } : {}),
      category: "article",
      media: { type: "none" },
      externalUrl: a.externalUrl,
      platform: "Fashionlismo",
      publishedAt: a.publishedAt,
      featured: false,
      order: a.order,
    };

    await client.create(doc);
    console.log(`  ✓ created`);
  }

  console.log("\nDone!");
}

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
