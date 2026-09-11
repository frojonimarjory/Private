"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type ExperienceItem = { role?: string; org?: string; period?: string };
type EducationItem = {
  degree?: string;
  institution?: string;
  period?: string;
  detail?: string;
};
type ProjectItem = {
  kind?: string;
  year?: string;
  title?: string;
  description?: string;
};
type LanguageItem = { name?: string; level?: string };

export function AboutPage() {
  const t = useTranslations("about");
  const s = useTranslations("settings");

  const experience = (t.raw("experienceItems") as ExperienceItem[]) ?? [];
  const education = (t.raw("educationItems") as EducationItem[]) ?? [];
  const projects = (t.raw("projectItems") as ProjectItem[]) ?? [];
  const skills = (t.raw("skillsList") as string[]) ?? [];
  const languages = (t.raw("languageList") as LanguageItem[]) ?? [];

  const email = s("email");
  const linkedinUrl = s("linkedinUrl");

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
              src={s("profileImageUrl")}
              alt="Marjory Frojoni"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-6">
            <a
              href={s("cvUrl")}
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
              {s("location")}
            </p>
            <a
              href={`mailto:${email}`}
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
              {email}
            </a>
            <a
              href={linkedinUrl}
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
                {education.map((item, i) => (
                  <CredentialItem
                    key={i}
                    primary={item.degree}
                    secondary={item.institution}
                    tertiary={item.period}
                    detail={item.detail}
                  />
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <SectionTitle>{t("experience")}</SectionTitle>
              <div className="space-y-4">
                {experience.map((item, i) => (
                  <CredentialItem
                    key={i}
                    primary={item.role}
                    secondary={item.org}
                    tertiary={item.period}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Filmography & Social Projects */}
          <div className="mt-10">
            <SectionTitle>{t("projects")}</SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((item, i) => (
                <div key={i} className="border border-border p-5">
                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    {[item.kind, item.year].filter(Boolean).join(" — ")}
                  </p>
                  <h3 className="mb-2 font-heading text-base font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills + Languages side by side */}
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {/* Skills */}
            <div>
              <SectionTitle>{t("skills")}</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
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
                {languages.map((item, i) => (
                  <LanguageItem key={i} lang={item.name} level={item.level} />
                ))}
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
  primary?: string;
  secondary?: string;
  tertiary?: string;
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

function LanguageItem({ lang, level }: { lang?: string; level?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{lang}</span>
      <span className="text-xs text-muted-foreground">{level}</span>
    </div>
  );
}
