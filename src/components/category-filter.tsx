"use client";

import { useTranslations } from "next-intl";

const categories = [
  "all",
  "documentary",
  "article",
  "consulting",
  "podcast",
] as const;

export type CategoryFilter = (typeof categories)[number];

export function CategoryFilterBar({
  active,
  onChange,
}: {
  active: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}) {
  const t = useTranslations("categories");

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 text-sm font-medium tracking-wide transition-all ${
            active === cat
              ? "bg-foreground text-background"
              : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          {t(cat)}
        </button>
      ))}
    </div>
  );
}
