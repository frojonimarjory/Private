import { defineType, defineField } from "sanity";

export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
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
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 3 },
        { name: "pt", title: "Português", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "pt",
          title: "Português",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Documentary", value: "documentary" },
          { title: "Article", value: "article" },
          { title: "Consulting", value: "consulting" },
          { title: "Podcast", value: "podcast" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "media",
      title: "Media",
      type: "object",
      fields: [
        {
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "Image", value: "image" },
              { title: "Video", value: "video" },
              { title: "Embed", value: "embed" },
            ],
          },
        },
        { name: "image", title: "Image", type: "image", options: { hotspot: true } },
        { name: "videoUrl", title: "Video URL", type: "url" },
        { name: "embedCode", title: "Embed Code", type: "text" },
      ],
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      description: "e.g. Medium, YouTube, JOTA Info",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "gridSize",
      title: "Grid Size (Bento)",
      type: "string",
      options: {
        list: [
          { title: "Small (1x1)", value: "small" },
          { title: "Medium (1x2)", value: "medium" },
          { title: "Large (2x2)", value: "large" },
          { title: "Wide (2x1)", value: "wide" },
          { title: "Tall (1x2)", value: "tall" },
        ],
      },
      initialValue: "small",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Published", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title.en", subtitle: "category", media: "thumbnail" },
  },
});
