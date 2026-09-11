"use client";

import { useLocale, useTranslations } from "next-intl";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { Link } from "@/i18n/navigation";
import type { Work } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

const richTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-foreground/90">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-heading text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-heading text-xl font-semibold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-5 border-l-2 border-foreground/30 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc space-y-2 pl-5 text-foreground/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2 pl-5 text-foreground/90">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 transition-colors hover:text-muted-foreground"
      >
        {children}
      </a>
    ),
  },
};

export function WorkDetail({ work }: { work: Work }) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("work");
  const tCat = useTranslations("categories");

  const title = work.title[locale] || work.title.en;
  const excerpt = work.excerpt[locale] || work.excerpt.en;

  const descBlocks = (work.description?.[locale]?.length
    ? work.description[locale]
    : work.description?.en) as unknown[] | undefined;
  const hasDescription = Array.isArray(descBlocks) && descBlocks.length > 0;

  const youtubeId =
    work.media?.youtubeUrl ? getYouTubeId(work.media.youtubeUrl) : null;

  return (
    <article>
      <Link
        href="/work"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        {t("backToWork")}
      </Link>

      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="font-medium uppercase tracking-[0.15em] text-muted-foreground">
          {tCat(work.category)}
        </span>
        <span className="text-border">&middot;</span>
        <span className="text-muted-foreground">{work.platform}</span>
        <span className="text-border">&middot;</span>
        <span className="text-muted-foreground">
          {new Date(work.publishedAt).toLocaleDateString(
            locale === "pt" ? "pt-BR" : "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </span>
      </div>

      <h1 className="mb-8 font-heading text-4xl font-bold leading-tight sm:text-5xl">
        {title}
      </h1>

      {/* Cover image */}
      {work.cover != null && !youtubeId && (
        <div className="mb-8 overflow-hidden">
          <img
            src={urlFor(work.cover).width(1200).url()}
            alt={title}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* YouTube embed */}
      {youtubeId && (
        <div className="mb-8 aspect-video overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      )}

      <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
        {excerpt}
      </p>

      {hasDescription && (
        <div className="mb-10 max-w-2xl text-base">
          <PortableText
            value={descBlocks as never}
            components={richTextComponents}
          />
        </div>
      )}

      {work.externalUrl && (
        <a
          href={work.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm font-medium tracking-wide text-background transition-all hover:bg-transparent hover:text-foreground"
        >
          {t("visitOriginal")}
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      )}
    </article>
  );
}
