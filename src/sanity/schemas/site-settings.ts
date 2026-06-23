import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "pt", title: "Português", type: "string" },
      ],
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "pt", title: "Português", type: "string" },
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
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
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resumeFile",
      title: "Resume/CV",
      type: "object",
      fields: [
        { name: "en", title: "English CV", type: "file" },
        { name: "pt", title: "Currículo PT", type: "file" },
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
