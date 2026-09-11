"use client";

import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, singletonTypes } from "./schemas";

/**
 * Studio structure:
 *  - Content blocks (site settings, pages, interface labels) appear as single,
 *    fixed documents that Marjory just opens and edits.
 *  - "Trabalhos" stays a normal list where she can add/remove items.
 */
const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Configurações do site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Página inicial")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Página Sobre")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Página de Contato")
        .id("contactPage")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage")
        ),
      S.listItem()
        .title("Textos da interface")
        .id("uiLabels")
        .child(S.document().schemaType("uiLabels").documentId("uiLabels")),
      S.divider(),
      S.documentTypeListItem("work").title("Trabalhos"),
    ]);

export default defineConfig({
  name: "marjory-portfolio",
  title: "Marjory Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "create new" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Remove "delete" / "duplicate" actions for singletons.
    actions: (input, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? input.filter((item) => {
            const name = (item as { action?: string }).action;
            return name
              ? ["publish", "discardChanges", "restore"].includes(name)
              : false;
          })
        : input,
  },
});
