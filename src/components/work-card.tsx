"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { BentoCell } from "./bento-grid";
import type { Work } from "@/lib/sanity/queries";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function CategoryIcon({ category }: { category: Work["category"] }) {
  const icons: Record<Work["category"], string> = {
    documentary: "🎬",
    article: "📝",
    consulting: "💼",
    podcast: "🎙️",
  };
  return <span className="text-lg">{icons[category]}</span>;
}

export function WorkCard({ work, index }: { work: Work; index: number }) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("categories");
  const tWork = useTranslations("work");

  const title = work.title[locale] || work.title.en;
  const excerpt = work.excerpt[locale] || work.excerpt.en;
  const youtubeId =
    work.media?.videoUrl ? getYouTubeId(work.media.videoUrl) : null;

  return (
    <BentoCell size={work.gridSize} index={index}>
      <Link
        href={`/work/${work.slug.current}`}
        className="flex h-full flex-col"
      >
        {/* Thumbnail / Video preview */}
        {youtubeId ? (
          <div className="relative aspect-video w-full overflow-hidden bg-surface">
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/90 text-background shadow-lg transition-transform group-hover:scale-110">
                <svg
                  className="ml-1 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-surface to-surface-hover">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <CategoryIcon category={work.category} />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-gold/30 text-gold text-xs"
              >
                {t(work.category)}
              </Badge>
              {work.featured && (
                <Badge className="bg-gold/10 text-gold text-xs border-0">
                  {tWork("featured")}
                </Badge>
              )}
            </div>
            <h3 className="mb-1 font-heading text-lg font-semibold leading-tight transition-colors group-hover:text-gold">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {excerpt}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{work.platform}</span>
            <span>
              {new Date(work.publishedAt).toLocaleDateString(
                locale === "pt" ? "pt-BR" : "en-US",
                { year: "numeric", month: "short" }
              )}
            </span>
          </div>
        </div>
      </Link>
    </BentoCell>
  );
}
