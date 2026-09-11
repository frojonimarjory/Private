"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");
  const s = useTranslations("settings");

  return (
    <section className="h-[calc(100vh-4rem)]">
      <div className="grid h-full md:grid-cols-2">
        {/* Photo area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-full overflow-hidden bg-muted"
        >
          <img
            src={s("profileImageUrl")}
            alt={t("name")}
            className="h-full w-full object-cover object-[center_60%]"
          />
        </motion.div>

        {/* Text content */}
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            {t("greeting")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 font-heading text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            {t("name")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 font-heading text-xl text-muted-foreground sm:text-2xl"
          >
            {t("tagline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-8 h-px w-16 bg-foreground"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm font-medium tracking-wide text-background transition-all hover:bg-transparent hover:text-foreground"
            >
              {t("cta")}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
