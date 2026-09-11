import { defineType, defineField } from "sanity";
import {
  localeString,
  localeText,
  localeStringField,
  localeTextField,
} from "./locale";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Página Sobre",
  type: "document",
  groups: [
    { name: "intro", title: "Introdução", default: true },
    { name: "lists", title: "Listas" },
    { name: "labels", title: "Títulos das seções" },
  ],
  fields: [
    // --- Intro ---
    { ...localeString("title", "Título da página"), group: "intro" },
    { ...localeText("bio", "Bio / Apresentação", 6), group: "intro" },

    // --- Section labels ---
    { ...localeString("experienceLabel", "Título: Experiência"), group: "labels" },
    { ...localeString("educationLabel", "Título: Formação"), group: "labels" },
    { ...localeString("skillsLabel", "Título: Habilidades"), group: "labels" },
    { ...localeString("projectsLabel", "Título: Projetos"), group: "labels" },
    { ...localeString("languagesLabel", "Título: Idiomas"), group: "labels" },
    { ...localeString("downloadCvLabel", "Texto do botão de currículo"), group: "labels" },

    // --- Experience ---
    defineField({
      name: "experience",
      title: "Experiência",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            localeStringField("role", "Cargo"),
            { name: "org", title: "Empresa / Veículo", type: "string" },
            localeStringField("period", "Período"),
          ],
          preview: {
            select: { title: "role.pt", subtitle: "org" },
          },
        },
      ],
    }),

    // --- Education ---
    defineField({
      name: "education",
      title: "Formação",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            localeStringField("degree", "Curso / Grau"),
            { name: "institution", title: "Instituição", type: "string" },
            { name: "period", title: "Período", type: "string" },
            localeTextField("detail", "Detalhe (opcional)", 3),
          ],
          preview: {
            select: { title: "degree.pt", subtitle: "institution" },
          },
        },
      ],
    }),

    // --- Projects ---
    defineField({
      name: "projects",
      title: "Filmografia & Projetos sociais",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            localeStringField("kind", "Tipo (ex.: Documentário)"),
            { name: "year", title: "Ano", type: "string" },
            localeStringField("title", "Título"),
            localeTextField("description", "Descrição", 4),
          ],
          preview: {
            select: { title: "title.pt", subtitle: "year" },
          },
        },
      ],
    }),

    // --- Skills ---
    defineField({
      name: "skills",
      title: "Habilidades",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            { name: "en", title: "English", type: "string" },
            { name: "pt", title: "Português", type: "string" },
          ],
          preview: {
            select: { title: "pt", subtitle: "en" },
          },
        },
      ],
    }),

    // --- Languages ---
    defineField({
      name: "languages",
      title: "Idiomas",
      type: "array",
      group: "lists",
      of: [
        {
          type: "object",
          fields: [
            localeStringField("name", "Idioma"),
            localeStringField("level", "Nível"),
          ],
          preview: {
            select: { title: "name.pt", subtitle: "level.pt" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Página Sobre" }),
  },
});
