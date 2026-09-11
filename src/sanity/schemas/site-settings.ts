import { defineType, defineField } from "sanity";
import { localeString } from "./locale";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  fields: [
    localeString("name", "Nome", {
      description: "Aparece no topo, na página inicial e na assinatura.",
    }),
    localeString("tagline", "Subtítulo / Profissão", {
      description: 'Ex.: "Jornalista & Documentarista".',
    }),
    defineField({
      name: "logoText",
      title: "Logo (iniciais)",
      description: 'Texto curto no canto do menu. Ex.: "MF".',
      type: "string",
    }),
    defineField({
      name: "profileImage",
      title: "Foto de perfil",
      description: "Usada na página inicial e na página Sobre.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "E-mail de contato",
      type: "string",
    }),
    localeString("location", "Cidade / Localização", {
      description: 'Ex.: "Chicago, IL".',
    }),
    defineField({
      name: "linkedinUrl",
      title: "Link do LinkedIn",
      type: "url",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp (só números)",
      description:
        'Apenas dígitos, com código do país, para montar o link. Ex.: "13123992403".',
      type: "string",
    }),
    defineField({
      name: "whatsappDisplay",
      title: "WhatsApp (como aparece)",
      description: 'Como o número é exibido. Ex.: "+1 (312) 399-2403".',
      type: "string",
    }),
    defineField({
      name: "resume",
      title: "Currículo (PDF)",
      description: "Arquivo baixado no botão da página Sobre.",
      type: "object",
      fields: [
        { name: "en", title: "English CV", type: "file" },
        { name: "pt", title: "Currículo PT", type: "file" },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Configurações do site" }),
  },
});
