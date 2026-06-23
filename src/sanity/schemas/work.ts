import { defineType, defineField } from "sanity";

export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "meta", title: "Metadata" },
  ],
  fields: [
    // --- Content group ---
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      group: "content",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "pt", title: "Português", type: "string" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Subtitle / Short description",
      description:
        "A short summary that appears on cards and previews. Keep it to 1–2 sentences.",
      type: "object",
      group: "content",
      fields: [
        { name: "en", title: "English", type: "text", rows: 3 },
        { name: "pt", title: "Português", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "description",
      title: "Full description",
      description: "The full write-up about this work. Supports rich text.",
      type: "object",
      group: "content",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
        },
        {
          name: "pt",
          title: "Português",
          type: "array",
          of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
        },
      ],
    }),

    // --- Media group ---
    defineField({
      name: "cover",
      title: "Cover image",
      description:
        "The main image shown on the card. If empty, a YouTube thumbnail or category label will be used instead.",
      type: "image",
      group: "media",
      options: { hotspot: true },
    }),
    defineField({
      name: "media",
      title: "Media content",
      description: "The main media for this work (video, images, or embed).",
      type: "object",
      group: "media",
      fields: [
        {
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "YouTube video", value: "youtube" },
              { title: "External video (Vimeo, etc.)", value: "video" },
              { title: "Image gallery", value: "images" },
              { title: "Embed code", value: "embed" },
              { title: "None (external link only)", value: "none" },
            ],
            layout: "radio",
          },
          initialValue: "none",
        },
        {
          name: "youtubeUrl",
          title: "YouTube URL",
          type: "url",
          description: "e.g. https://youtube.com/watch?v=...",
          hidden: ({ parent }: { parent?: { type?: string } }) =>
            parent?.type !== "youtube",
        },
        {
          name: "videoUrl",
          title: "Video URL",
          type: "url",
          description: "Vimeo, Dailymotion, or any direct video link",
          hidden: ({ parent }: { parent?: { type?: string } }) =>
            parent?.type !== "video",
        },
        {
          name: "images",
          title: "Images",
          type: "array",
          of: [{ type: "image", options: { hotspot: true } }],
          hidden: ({ parent }: { parent?: { type?: string } }) =>
            parent?.type !== "images",
        },
        {
          name: "embedCode",
          title: "Embed code",
          type: "text",
          description: "Paste the full embed HTML (iframe, etc.)",
          hidden: ({ parent }: { parent?: { type?: string } }) =>
            parent?.type !== "embed",
        },
      ],
    }),

    // --- Metadata group ---
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Documentary", value: "documentary" },
          { title: "Article", value: "article" },
          { title: "Consulting / Press Advisory", value: "consulting" },
          { title: "Podcast", value: "podcast" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      description:
        "Link to the original publication (article on another site, podcast platform, etc.)",
      type: "url",
      group: "meta",
    }),
    defineField({
      name: "platform",
      title: "Platform / Publisher",
      description: "Where this was published: Medium, JOTA Info, YouTube, etc.",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "meta",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      description: "Lower numbers appear first. Leave at 0 for automatic date-based ordering.",
      type: "number",
      group: "meta",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Published date",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "category",
      media: "cover",
    },
  },
});
