import { defineType } from "sanity";
import { localeString, localeText } from "./locale";

export const homePage = defineType({
  name: "homePage",
  title: "Página inicial",
  type: "document",
  fields: [
    localeString("heroGreeting", "Saudação", {
      description: 'A linha acima do nome. Ex.: "Oi, eu sou a".',
    }),
    localeText("heroDescription", "Descrição de abertura", 4, {
      description: "O parágrafo de apresentação ao lado da foto.",
    }),
    localeString("heroCta", "Texto do botão", {
      description: 'Ex.: "Ver meus trabalhos".',
    }),
    localeString("portfolioHeading", "Título da grade de trabalhos", {
      description: 'O título grande da seção de trabalhos. Ex.: "Portfolio".',
    }),
    localeText("quoteText", "Frase em destaque", 4, {
      description: "A citação exibida em destaque mais abaixo na página.",
    }),
    localeString("quoteAttribution", "Assinatura da frase", {
      description: "Quem assina a frase em destaque.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Página inicial" }),
  },
});
