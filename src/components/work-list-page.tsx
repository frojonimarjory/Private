"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BentoGrid } from "./bento-grid";
import { WorkCard } from "./work-card";
import {
  CategoryFilterBar,
  type CategoryFilter,
} from "./category-filter";
import { mockWorks } from "@/lib/mock-data";

export function WorkListPage() {
  const t = useTranslations("work");
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const works =
    filter === "all"
      ? mockWorks
      : mockWorks.filter((w) => w.category === filter);

  return (
    <div>
      <h1 className="mb-8 font-heading text-4xl font-bold">{t("title")}</h1>
      <div className="mb-8">
        <CategoryFilterBar active={filter} onChange={setFilter} />
      </div>
      <BentoGrid>
        {works.map((work, i) => (
          <WorkCard key={work._id} work={work} index={i} />
        ))}
      </BentoGrid>
    </div>
  );
}
