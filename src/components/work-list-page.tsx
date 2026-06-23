"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BentoGrid, assignBentoSizes } from "./bento-grid";
import { WorkCardBento } from "./work-card";
import {
  CategoryFilterBar,
  type CategoryFilter,
} from "./category-filter";
import type { Work } from "@/lib/sanity/queries";

export function WorkListPage({ works }: { works: Work[] }) {
  const t = useTranslations("work");
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filtered =
    filter === "all" ? works : works.filter((w) => w.category === filter);

  const sizes = assignBentoSizes(filtered.length);

  return (
    <div>
      <h1 className="mb-8 font-heading text-4xl font-bold">{t("title")}</h1>
      <div className="mb-10">
        <CategoryFilterBar active={filter} onChange={setFilter} />
      </div>
      <BentoGrid>
        {filtered.map((work, i) => (
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
