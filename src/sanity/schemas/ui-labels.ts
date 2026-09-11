import { defineType, defineField } from "sanity";
import { localeStringField, localeTextField } from "./locale";

/**
 * Interface labels — the small texts that repeat across the whole site:
 * the menu, the buttons, the category filters, the footer. Grouped and
 * collapsed so the form stays manageable.
 */

function group(name: string, title: string, fields: string[][]) {
  return defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: fields.map(([n, t]) => localeStringField(n, t)),
  });
}

export const uiLabels = defineType({
  name: "uiLabels",
  title: "Textos da interface",
  type: "document",
  fields: [
    group("nav", "Menu", [
      ["home", "Início"],
      ["work", "Trabalhos"],
      ["about", "Sobre"],
      ["contact", "Contato"],
    ]),
    group("categories", "Categorias", [
      ["all", "Todos"],
      ["documentary", "Documentário"],
      ["article", "Reportagens"],
      ["consulting", "Assessoria"],
      ["podcast", "Podcast"],
    ]),
    group("spotlight", "Documentário em destaque", [
      ["eyebrow", "Etiqueta"],
      ["watch", "Botão assistir"],
      ["viewProject", "Botão ver projeto"],
    ]),
    group("work", "Trabalhos", [
      ["title", "Título da seção"],
      ["viewProject", "Ver projeto"],
      ["visitOriginal", "Ver original"],
      ["publishedAt", "Publicado em"],
      ["backToWork", "Voltar aos trabalhos"],
      ["featured", "Destaque"],
    ]),
    group("footer", "Rodapé", [
      ["rights", "Direitos reservados"],
      ["madeWith", "Feito com"],
    ]),
    group("common", "Botões gerais", [
      ["readMore", "Leia mais"],
      ["watchNow", "Assistir"],
      ["listenNow", "Ouvir agora"],
    ]),
    defineField({
      name: "metadata",
      title: "SEO (aba do navegador / Google)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        localeStringField("title", "Título da página"),
        localeTextField("description", "Descrição", 2),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Textos da interface" }),
  },
});
