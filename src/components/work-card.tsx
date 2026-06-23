"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { BentoCell, type BentoSize } from "./bento-grid";
import type { Work } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function getCoverUrl(work: Work, width = 800): string | null {
  if (work.cover) {
    try {
      return urlFor(work.cover).width(width).height(Math.round(width * 0.75)).url();
    } catch {
      /* fallback */
    }
  }
  const ytUrl = work.media?.youtubeUrl;
  if (ytUrl) {
    const id = getYouTubeId(ytUrl);
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return null;
}

/**
 * Bento card — image fills the cell, text overlays at bottom.
 * Used in the home page featured grid and work list page.
 */
export function WorkCardBento({
  work,
  index,
  size = "small",
}: {
  work: Work;
  index: number;
  size?: BentoSize;
}) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("categories");

  const title = work.title[locale] || work.title.en;
  const coverUrl = getCoverUrl(work, size === "large" ? 1200 : 800);
  const isVideo =
    work.media?.type === "youtube" || work.media?.type === "video";

  return (
    <BentoCell size={size} index={index}>
      <Link href={`/work/${work.slug.current}`} className="block h-full">
        {/* Background image */}
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-border" />
        )}

        {/* Play icon for videos */}
        {isVideo && coverUrl && (
          <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm opacity-80 transition-opacity group-hover:opacity-100">
            <svg
              className="ml-0.5 h-4 w-4 text-foreground"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Text content */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
            {t(work.category)} &middot; {work.platform}
          </p>
          <h3
            className={`font-heading font-bold leading-snug ${
              size === "large"
                ? "text-xl sm:text-2xl"
                : size === "wide" || size === "tall"
                  ? "text-lg"
                  : "text-sm sm:text-base"
            }`}
          >
            {title}
          </h3>
          {(size === "large" || size === "wide" || size === "tall") && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70">
              {work.excerpt[locale] || work.excerpt.en}
            </p>
          )}
        </div>
      </Link>
    </BentoCell>
  );
}

/**
 * List card — clean editorial card for list views (non-bento).
 */
export function WorkCard({ work, index }: { work: Work; index: number }) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("categories");

  const title = work.title[locale] || work.title.en;
  const excerpt = work.excerpt[locale] || work.excerpt.en;
  const coverUrl = getCoverUrl(work);
  const isVideo =
    work.media?.type === "youtube" || work.media?.type === "video";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link href={`/work/${work.slug.current}`} className="group block">
        <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-muted">
          {coverUrl ? (
            <>
              <img
                src={coverUrl}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-sm">
                    <svg
                      className="ml-0.5 h-5 w-5 text-foreground"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {t(work.category)}
              </span>
            </div>
          )}
        </div>

        <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
          {t(work.category)} &middot; {work.platform}
        </p>
        <h3 className="mb-2 font-heading text-lg font-semibold leading-snug transition-colors group-hover:text-muted-foreground">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          {new Date(work.publishedAt).toLocaleDateString(
            locale === "pt" ? "pt-BR" : "en-US",
            { year: "numeric", month: "short" }
          )}
        </p>
      </Link>
    </motion.article>
  );
}
