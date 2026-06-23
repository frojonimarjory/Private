"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import type { Work } from "@/lib/sanity/queries";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function WorkDetail({ work }: { work: Work }) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("work");
  const tCat = useTranslations("categories");

  const title = work.title[locale] || work.title.en;
  const excerpt = work.excerpt[locale] || work.excerpt.en;
  const youtubeId =
    work.media?.videoUrl ? getYouTubeId(work.media.videoUrl) : null;

  return (
    <article>
      <Link
        href="/work"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
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

      <div className="mb-6 flex items-center gap-3">
        <Badge variant="outline" className="border-gold/30 text-gold">
          {tCat(work.category)}
        </Badge>
        <span className="text-sm text-muted-foreground">{work.platform}</span>
        <span className="text-sm text-muted-foreground">
          {new Date(work.publishedAt).toLocaleDateString(
            locale === "pt" ? "pt-BR" : "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </span>
      </div>

      <h1 className="mb-6 font-heading text-4xl font-bold leading-tight sm:text-5xl">
        {title}
      </h1>

      {/* Video embed */}
      {youtubeId && (
        <div className="mb-8 aspect-video overflow-hidden rounded-xl">
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

      {work.externalUrl && (
        <a
          href={work.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gold bg-gold/10 px-6 py-3 text-sm font-medium text-gold transition-all hover:bg-gold hover:text-background"
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
