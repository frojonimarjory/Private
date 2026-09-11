"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { Work } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function getBackdrop(work: Work): string | null {
  if (work.cover) {
    try {
      return urlFor(work.cover).width(1920).height(1080).url();
    } catch {
      /* fall through to YouTube */
    }
  }
  const id = getYouTubeId(work.media?.youtubeUrl || work.externalUrl);
  if (id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  return null;
}

/**
 * Full-bleed cinematic spotlight for Marjory's flagship documentary.
 * A dark band that deliberately breaks from the light editorial page to
 * give the documentary the strongest possible presence on the home page.
 */
export function DocumentarySpotlight({ work }: { work: Work }) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("spotlight");
  const tc = useTranslations("categories");

  const title = work.title[locale] || work.title.en;
  const excerpt = work.excerpt[locale] || work.excerpt.en;
  const backdrop = getBackdrop(work);
  const watchUrl = work.externalUrl || work.media?.youtubeUrl;

  return (
    <section className="relative overflow-hidden bg-[#0b0a09] text-white">
      {/* Backdrop */}
      {backdrop && (
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={backdrop}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}

      {/* Legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/70 to-[#0b0a09]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a09]/90 via-[#0b0a09]/40 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-end px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[80vh] lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-white/60" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              {t("eyebrow")}
            </p>
          </div>

          <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-white/60">
            {tc(work.category)}
          </p>

          <h2 className="font-heading text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h2>

          {excerpt && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {watchUrl && (
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white bg-white px-6 py-3 text-sm font-medium tracking-wide text-[#0b0a09] transition-all hover:bg-transparent hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {t("watch")}
              </a>
            )}
            <Link
              href={`/work/${work.slug.current}`}
              className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 text-sm font-medium tracking-wide text-white transition-all hover:border-white hover:bg-white/10"
            >
              {t("viewProject")}
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
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
