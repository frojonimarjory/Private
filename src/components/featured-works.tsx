"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BentoGrid } from "./bento-grid";
import { WorkCard } from "./work-card";
import { mockWorks } from "@/lib/mock-data";

export function FeaturedWorks() {
  const t = useTranslations("work");

  // Use mock data for now; will switch to Sanity fetch later
  const featured = mockWorks.filter((w) => w.featured);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-heading text-3xl font-bold">{t("title")}</h2>
        <Link
          href="/work"
          className="text-sm text-gold transition-colors hover:text-gold-light"
        >
          {t("viewProject")} →
        </Link>
      </div>
      <BentoGrid>
        {featured.map((work, i) => (
          <WorkCard key={work._id} work={work} index={i} />
        ))}
      </BentoGrid>
    </div>
  );
}
