"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function AboutPage() {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("about");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-12 font-heading text-4xl font-bold">{t("title")}</h1>

      <div className="grid gap-12 md:grid-cols-[280px_1fr]">
        {/* Profile image + contact */}
        <div>
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src="/images/marjory-profile.jpg"
              alt="Marjory Frojoni"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-6">
            <a
              href="/CV_Marjory_Frojoni.pdf"
              download
              className="inline-flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-4 py-2.5 text-xs font-medium tracking-wide text-background transition-all hover:bg-transparent hover:text-foreground"
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
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              {t("downloadCV")}
            </a>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Chicago, IL
            </p>
            <a
              href="mailto:marjory.frojoni@unesp.br"
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Bio */}
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            {t("bio")}
          </p>

          {/* Education + Experience side by side */}
          <div className="grid gap-10 sm:grid-cols-2">
            {/* Education */}
            <div>
              <SectionTitle>{t("education")}</SectionTitle>
              <div className="space-y-4">
                <CredentialItem
                  primary={
                    locale === "pt"
                      ? "Bacharelado em Jornalismo"
                      : "B.A. in Journalism"
                  }
                  secondary="UNESP — São Paulo State University"
                  tertiary="2019 — 2023"
                  detail={
                    locale === "pt"
                      ? "TCC (Documentário): Bolshoi no Brasil — Diretora e produtora de documentário sobre o impacto cultural da Escola de Balé Bolshoi em Joinville."
                      : "Thesis (Documentary): Bolshoi in Brazil — Director and producer of a documentary exploring the cultural impact of the Bolshoi Ballet School in Joinville, Brazil."
                  }
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <SectionTitle>{t("experience")}</SectionTitle>
              <div className="space-y-4">
                <CredentialItem
                  primary={
                    locale === "pt"
                      ? "Assessora de Imprensa"
                      : "Press Officer"
                  }
                  secondary="Print Rio / SEBRAE-SP"
                  tertiary={
                    locale === "pt"
                      ? "Ago 2024 — Dez 2025"
                      : "Aug 2024 — Dec 2025"
                  }
                />
                <CredentialItem
                  primary={
                    locale === "pt"
                      ? "Repórter & Produtora"
                      : "Reporter & Producer"
                  }
                  secondary="TV TEM (TV Globo)"
                  tertiary={
                    locale === "pt"
                      ? "Abr 2024 — Jul 2024"
                      : "Apr 2024 — Jul 2024"
                  }
                />
                <CredentialItem
                  primary={
                    locale === "pt"
                      ? "Editora de Conteúdo"
                      : "Content Editor"
                  }
                  secondary="Splash UOL"
                  tertiary={
                    locale === "pt"
                      ? "Fev 2024 — Abr 2024"
                      : "Feb 2024 — Apr 2024"
                  }
                />
                <CredentialItem
                  primary={
                    locale === "pt"
                      ? "Especialista em Inbound Marketing"
                      : "Inbound Marketing Specialist"
                  }
                  secondary="JOTA Jornalismo"
                  tertiary={
                    locale === "pt"
                      ? "Mar 2022 — Jul 2023"
                      : "Mar 2022 — Jul 2023"
                  }
                />
                <CredentialItem
                  primary={
                    locale === "pt"
                      ? "Estagiária de Jornalismo"
                      : "Journalism Intern"
                  }
                  secondary="Record News"
                  tertiary={
                    locale === "pt"
                      ? "Mar 2021 — Abr 2022"
                      : "Mar 2021 — Apr 2022"
                  }
                />
              </div>
            </div>
          </div>

          {/* Filmography & Social Projects */}
          <div className="mt-10">
            <SectionTitle>{t("projects")}</SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border border-border p-5">
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {locale === "pt" ? "Documentário" : "Documentary"} — 2023
                </p>
                <h3 className="mb-2 font-heading text-base font-semibold">
                  {locale === "pt" ? "Bolshoi no Brasil" : "Bolshoi in Brazil"}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {locale === "pt"
                    ? "Documentário explorando a única escola Bolshoi fora da Rússia, focando na disciplina da dança como ferramenta de mobilidade social no Brasil."
                    : "Documentary exploring the only Bolshoi school outside of Russia, focusing on the discipline of dance as a tool for social mobility in Brazil."}
                </p>
              </div>
              <div className="border border-border p-5">
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {locale === "pt"
                    ? "Projeto Social"
                    : "Social Project"}{" "}
                  — 2019–2024
                </p>
                <h3 className="mb-2 font-heading text-base font-semibold">
                  LOBA — Acolhimento
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {locale === "pt"
                    ? "Iniciativa de empreendedorismo social fundada por Marjory, oferecendo apoio a mulheres e pessoas LGBTQIA+ sobreviventes de violência sexual. Consultoria para grandes eventos sobre protocolos de segurança e acessibilidade."
                    : "Social entrepreneurship initiative founded by Marjory, providing support for women and LGBTQIA+ survivors of sexual violence. Consulted for major events on safety protocols and accessibility."}
                </p>
              </div>
            </div>
          </div>

          {/* Skills + Languages side by side */}
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {/* Skills */}
            <div>
              <SectionTitle>{t("skills")}</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {(locale === "pt"
                  ? [
                      "Produção de Vídeo",
                      "Edição",
                      "SEO",
                      "Análise de Dados",
                      "WordPress",
                      "RD Station",
                      "Google Ads",
                      "AP Style",
                    ]
                  : [
                      "Video Production",
                      "Editing",
                      "SEO",
                      "Data Analysis",
                      "WordPress",
                      "RD Station",
                      "Google Ads",
                      "AP News Style",
                    ]
                ).map((skill) => (
                  <span
                    key={skill}
                    className="border border-border px-3 py-1.5 text-xs font-medium tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <SectionTitle>{t("languages")}</SectionTitle>
              <div className="space-y-3">
                <LanguageItem
                  lang={locale === "pt" ? "Português" : "Portuguese"}
                  level={locale === "pt" ? "Nativo" : "Native"}
                />
                <LanguageItem
                  lang={locale === "pt" ? "Inglês" : "English"}
                  level={locale === "pt" ? "Avançado" : "Advanced"}
                />
                <LanguageItem
                  lang={locale === "pt" ? "Espanhol" : "Spanish"}
                  level={locale === "pt" ? "Básico" : "Beginner"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 border-b border-foreground pb-2 text-xs font-semibold uppercase tracking-[0.15em]">
      {children}
    </h2>
  );
}

function CredentialItem({
  primary,
  secondary,
  tertiary,
  detail,
}: {
  primary: string;
  secondary: string;
  tertiary: string;
  detail?: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{primary}</h3>
      <p className="text-sm text-muted-foreground">{secondary}</p>
      <p className="text-xs text-muted-foreground">{tertiary}</p>
      {detail && (
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground/80">
          {detail}
        </p>
      )}
    </div>
  );
}

function LanguageItem({ lang, level }: { lang: string; level: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{lang}</span>
      <span className="text-xs text-muted-foreground">{level}</span>
    </div>
  );
}
