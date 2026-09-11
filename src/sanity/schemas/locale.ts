import { defineField } from "sanity";

/**
 * Helpers for bilingual (English + Português) fields.
 *
 * Every editable string on the site is stored as an object with `en` and `pt`
 * so Marjory can edit both languages side by side in the Studio. The request
 * pipeline (`src/lib/sanity/content.ts`) later flattens these down to a single
 * language before they reach the components.
 */

type Opts = { description?: string };

export function localeString(name: string, title: string, opts: Opts = {}) {
  return defineField({
    name,
    title,
    type: "object",
    description: opts.description,
    fields: [
      { name: "en", title: "English", type: "string" },
      { name: "pt", title: "Português", type: "string" },
    ],
  });
}

export function localeText(
  name: string,
  title: string,
  rows = 3,
  opts: Opts = {}
) {
  return defineField({
    name,
    title,
    type: "object",
    description: opts.description,
    fields: [
      { name: "en", title: "English", type: "text", rows },
      { name: "pt", title: "Português", type: "text", rows },
    ],
  });
}

/** A bilingual field group used as a subfield inside another object. */
export function localeStringField(name: string, title: string) {
  return {
    name,
    title,
    type: "object" as const,
    fields: [
      { name: "en", title: "English", type: "string" },
      { name: "pt", title: "Português", type: "string" },
    ],
  };
}

export function localeTextField(name: string, title: string, rows = 3) {
  return {
    name,
    title,
    type: "object" as const,
    fields: [
      { name: "en", title: "English", type: "text", rows },
      { name: "pt", title: "Português", type: "text", rows },
    ],
  };
}
