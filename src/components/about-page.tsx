"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { mockSettings } from "@/lib/mock-data";

export function AboutPage() {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("about");
  const tHero = useTranslations("hero");

  const bio = locale === "pt" ? tHero("description") : tHero("description");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-8 font-heading text-4xl font-bold">{t("title")}</h1>

      <div className="grid gap-12 md:grid-cols-[300px_1fr]">
        {/* Profile image placeholder */}
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-gold/20 to-surface">
            <div className="flex h-full items-center justify-center text-6xl text-gold/30">
              MF
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href="mailto:marjory.frojoni@unesp.br"
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              marjory.frojoni@unesp.br
            </a>
            <a
              href="https://linkedin.com/in/marjory-frojoni/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bio content */}
        <div>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            {bio}
          </p>

          <h2 className="mb-4 font-heading text-2xl font-semibold">
            {t("experience")}
          </h2>

          <div className="space-y-6">
            <ExperienceItem
              role={locale === "pt" ? "Assessora de Imprensa" : "Press Advisor"}
              company="JOTA Info"
              period="2023"
            />
            <ExperienceItem
              role={
                locale === "pt"
                  ? "Produtora & Apresentadora de Podcast"
                  : "Podcast Producer & Host"
              }
              company="Clínica Nefrostar — Hemodiálogos"
              period="2023"
            />
            <ExperienceItem
              role={
                locale === "pt"
                  ? "Documentarista & Co-diretora"
                  : "Documentary Filmmaker & Co-director"
              }
              company="Do Ponto à Ponta"
              period="2023"
            />
            <ExperienceItem
              role={locale === "pt" ? "Jornalista Freelancer" : "Freelance Journalist"}
              company="Fashionlismo, Medium, UNESP"
              period="2020 — present"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceItem({
  role,
  company,
  period,
}: {
  role: string;
  company: string;
  period: string;
}) {
  return (
    <div className="relative border-l-2 border-gold/20 pl-6">
      <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-gold" />
      <h3 className="font-medium">{role}</h3>
      <p className="text-sm text-muted-foreground">{company}</p>
      <p className="text-xs text-muted-foreground/70">{period}</p>
    </div>
  );
}
