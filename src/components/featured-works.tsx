"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BentoGrid, assignBentoSizes } from "./bento-grid";
import { WorkCardBento } from "./work-card";
import type { Work } from "@/lib/sanity/queries";

export function FeaturedWorks({ works }: { works: Work[] }) {
  const t = useTranslations("work");
  const th = useTranslations("home");
  const sizes = assignBentoSizes(works.length);

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {th("portfolioHeading")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("title")}
          </p>
        </div>
        <Link
          href="/work"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("viewProject")} &rarr;
        </Link>
      </div>
      <BentoGrid>
        {works.map((work, i) => (
          <WorkCardBento
            key={work._id}
            work={work}
            index={i}
            size={sizes[i]}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
