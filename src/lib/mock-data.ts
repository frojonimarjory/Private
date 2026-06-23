import type { Work, SiteSettings } from "./sanity/queries";

export const mockSettings: SiteSettings = {
  name: { en: "Marjory Frojoni", pt: "Marjory Frojoni" },
  tagline: {
    en: "Journalist & Storyteller",
    pt: "Jornalista & Comunicadora",
  },
  bio: {
    en: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "I'm a journalist by training and a communicator by nature. Communication is my passion and the way I move the world around me — I want to know, record, share, and impact what I see and live.",
          },
        ],
      },
    ],
    pt: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Sou jornalista de formação e comunicadora de nascença. Comunicação é a minha paixão e a maneira como eu movimento o ambiente ao meu redor — quero conhecer, registrar, compartilhar e impactar o que vejo e vivo.",
          },
        ],
      },
    ],
  },
  profileImage: null,
  email: "marjory.frojoni@unesp.br",
  socialLinks: [
    { platform: "linkedin", url: "https://linkedin.com/in/marjory-frojoni/" },
  ],
};

export const mockWorks: Work[] = [
  {
    _id: "1",
    title: {
      en: "Do Ponto à Ponta",
      pt: "Do Ponto à Ponta",
    },
    slug: { current: "do-ponto-a-ponta" },
    excerpt: {
      en: "Documentary portraying young ballet dancers at the Bolshoi Theater School. Co-produced and directed with Desirèe Assis, covering production, scriptwriting, and direction.",
      pt: "Documentário retratando jovens bailarinos da Escola do Teatro Bolshoi. Co-produzido e dirigido com Desirèe Assis, cobrindo produção, roteiro e direção.",
    },
    description: { en: [], pt: [] },
    category: "documentary",
    media: { type: "video", videoUrl: "" },
    thumbnail: null,
    externalUrl: "",
    platform: "Documentary",
    publishedAt: "2023-01-01",
    featured: true,
    gridSize: "large",
    order: 1,
  },
  {
    _id: "2",
    title: {
      en: "Zuzu Angel: Needle and Thread Against Military Dictatorship",
      pt: "Zuzu Angel: Linha e agulha contra a ditadura militar no país",
    },
    slug: { current: "zuzu-angel" },
    excerpt: {
      en: "The clothes, music, and atmosphere carried a sad message: the murder of Stuart Angel, who had been kidnapped and tortured by agents of the military regime in 1970.",
      pt: "As roupas, música e ambiente carregavam uma triste mensagem: o assassinato de Stuart Angel, que antes fora sequestrado e torturado por agentes do regime militar, em 1970.",
    },
    description: { en: [], pt: [] },
    category: "article",
    media: { type: "image" },
    thumbnail: null,
    externalUrl:
      "https://fashionlismo.com.br/zuzu-angel-linha-e-agulha-contra-a-ditadura-militar-no-pais/",
    platform: "Fashionlismo",
    publishedAt: "2023-12-02",
    featured: true,
    gridSize: "medium",
    order: 2,
  },
  {
    _id: "3",
    title: {
      en: "CCXP Consolidates as the Largest Pop Culture Event in the World",
      pt: "CCXP consolida-se como maior evento de cultura pop e geek do mundo",
    },
    slug: { current: "ccxp-2023" },
    excerpt: {
      en: "Comic Con Experience became the world's largest pop and geek event, attracting approximately 300,000 attendees.",
      pt: "A Comic Con Experience se consolidou como o maior evento de cultura pop e geek do mundo, atraindo cerca de 300 mil participantes.",
    },
    description: { en: [], pt: [] },
    category: "article",
    media: { type: "image" },
    thumbnail: null,
    externalUrl:
      "https://medium.com/@marjory.frojoni/ccxp-consolida-se-como-maior-evento-de-cultura-pop-e-geek-do-mundo-c259451655b1",
    platform: "Medium",
    publishedAt: "2023-09-27",
    featured: true,
    gridSize: "small",
    order: 3,
  },
  {
    _id: "4",
    title: {
      en: "App Delivery Workers Face Greater Job Precarity During Quarantine",
      pt: "Entregadores de aplicativos sofrem maior precarização do trabalho durante a quarentena",
    },
    slug: { current: "entregadores-apps" },
    excerpt: {
      en: "Examining app delivery workers' deteriorating conditions and corporate contradictions during the pandemic.",
      pt: "Investigação sobre a precarização das condições dos entregadores de aplicativos e as contradições corporativas durante a pandemia.",
    },
    description: { en: [], pt: [] },
    category: "article",
    media: { type: "image" },
    thumbnail: null,
    externalUrl:
      "https://jornalismoespecializadounesp.wordpress.com/2020/06/30/entregadores-de-aplicativos-sofrem-maior-precarizacao-do-trabalho-durante-a-quarentena/",
    platform: "WordPress",
    publishedAt: "2020-06-30",
    featured: false,
    gridSize: "small",
    order: 4,
  },
  {
    _id: "5",
    title: {
      en: "CMED Changes Discussed at PRO Health Subscriber Event",
      pt: "Mudanças na CMED foram tema de call para assinantes PRO Saúde",
    },
    slug: { current: "cmed-pro-saude" },
    excerpt: {
      en: "Coverage of CMED regulatory changes discussed at a subscriber-exclusive call with JOTA analysts.",
      pt: "Cobertura das mudanças regulatórias na CMED discutidas em call exclusiva com analistas do JOTA.",
    },
    description: { en: [], pt: [] },
    category: "consulting",
    media: { type: "image" },
    thumbnail: null,
    externalUrl:
      "https://jota.info/blog/mudancas-na-cmed-foram-tema-de-call-para-assinantes-pro-saude-08082023",
    platform: "JOTA Info",
    publishedAt: "2023-08-08",
    featured: false,
    gridSize: "small",
    order: 5,
  },
  {
    _id: "6",
    title: {
      en: "X-Ray of Lula 3",
      pt: "Raio-x de Lula 3",
    },
    slug: { current: "raio-x-lula-3" },
    excerpt: {
      en: "Political approval analysis showing shifts in electoral demographics and rejection metrics.",
      pt: "Análise de aprovação política mostrando mudanças demográficas eleitorais e métricas de rejeição.",
    },
    description: { en: [], pt: [] },
    category: "consulting",
    media: { type: "image" },
    thumbnail: null,
    externalUrl: "https://jota.info/especiais/raio-x-de-lula-3-26072023",
    platform: "JOTA Info",
    publishedAt: "2023-07-26",
    featured: true,
    gridSize: "wide",
    order: 6,
  },
  {
    _id: "7",
    title: {
      en: "PRO Analysts Unpack Tax Reform Politics at Subscriber Event",
      pt: "Analistas PRO destrincham jogo político da reforma tributária em evento para assinantes",
    },
    slug: { current: "reforma-tributaria" },
    excerpt: {
      en: "Behind-the-scenes political analysis of the tax reform process for professional subscribers.",
      pt: "Análise política dos bastidores do processo de reforma tributária para assinantes profissionais.",
    },
    description: { en: [], pt: [] },
    category: "consulting",
    media: { type: "image" },
    thumbnail: null,
    externalUrl:
      "https://jota.info/blog/analistas-pro-destrincham-jogo-politico-da-reforma-tributaria-em-evento-para-assinantes-05072023",
    platform: "JOTA Info",
    publishedAt: "2023-07-05",
    featured: false,
    gridSize: "small",
    order: 7,
  },
  {
    _id: "8",
    title: {
      en: "Xenotransplantation: Everything About the New Scientific Advance | Hemodiálogos EP #04",
      pt: "Xenotransplante: Saiba tudo sobre o novo avanço científico que salvará vidas | Hemodiálogos EP #04",
    },
    slug: { current: "xenotransplante-hemodialogos-04" },
    excerpt: {
      en: "Interview with Dr. Ernesto Goulart about xenotransplant breakthroughs and their impact on organ donation.",
      pt: "Entrevista com Dr. Ernesto Goulart sobre avanços em xenotransplante e seu impacto na doação de órgãos.",
    },
    description: { en: [], pt: [] },
    category: "podcast",
    media: {
      type: "video",
      videoUrl: "https://youtube.com/watch?v=1_Swb5Fg8dw",
    },
    thumbnail: null,
    externalUrl: "https://youtube.com/watch?v=1_Swb5Fg8dw",
    platform: "Nefrostar",
    publishedAt: "2023-11-01",
    featured: true,
    gridSize: "wide",
    order: 8,
  },
  {
    _id: "9",
    title: {
      en: "Health Insurance Operators in Brazil: A Panoramic View | Hemodiálogos EP #03",
      pt: "Operadoras de saúde no país: uma visão panorâmica | Hemodiálogos EP #03",
    },
    slug: { current: "operadoras-saude-hemodialogos-03" },
    excerpt: {
      en: "Healthcare market analysis with founder discussing the transformation of Brazil's health insurance sector.",
      pt: "Análise do mercado de saúde com fundador discutindo a transformação do setor de planos de saúde no Brasil.",
    },
    description: { en: [], pt: [] },
    category: "podcast",
    media: {
      type: "video",
      videoUrl: "https://youtube.com/watch?v=xlfnNc-EwD4",
    },
    thumbnail: null,
    externalUrl: "https://youtube.com/watch?v=xlfnNc-EwD4&t=1793s",
    platform: "Nefrostar",
    publishedAt: "2023-10-20",
    featured: false,
    gridSize: "small",
    order: 9,
  },
  {
    _id: "10",
    title: {
      en: "Nefrostar: The Beginning",
      pt: "Nefrostar: O início",
    },
    slug: { current: "nefrostar-o-inicio" },
    excerpt: {
      en: "Founder discusses hemodiafiltration technology implementation and premium patient care approach.",
      pt: "Fundador discute implementação de tecnologia de hemodiafiltração e abordagem de cuidado premium ao paciente.",
    },
    description: { en: [], pt: [] },
    category: "podcast",
    media: {
      type: "video",
      videoUrl: "https://youtube.com/watch?v=fVrmhEss0Co",
    },
    thumbnail: null,
    externalUrl: "https://youtube.com/watch?v=fVrmhEss0Co",
    platform: "Nefrostar",
    publishedAt: "2023-10-18",
    featured: false,
    gridSize: "small",
    order: 10,
  },
  {
    _id: "11",
    title: {
      en: "Yellow September: A Conversation About Mental Health | Hemodiálogos EP #01",
      pt: "Setembro Amarelo: um papo sobre saúde mental | Hemodiálogos EP #01",
    },
    slug: { current: "setembro-amarelo-hemodialogos-01" },
    excerpt: {
      en: "Psychologist Leslie Figueiredo discussing mental health awareness for chronic kidney disease patients.",
      pt: "Psicóloga Leslie Figueiredo discutindo conscientização sobre saúde mental para pacientes com doença renal crônica.",
    },
    description: { en: [], pt: [] },
    category: "podcast",
    media: {
      type: "video",
      videoUrl: "https://youtube.com/watch?v=3lIGtPksm1Y",
    },
    thumbnail: null,
    externalUrl: "https://youtube.com/watch?v=3lIGtPksm1Y",
    platform: "Nefrostar",
    publishedAt: "2023-09-19",
    featured: false,
    gridSize: "small",
    order: 11,
  },
];
