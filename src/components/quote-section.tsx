"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function QuoteSection() {
  const t = useTranslations("hero");

  return (
    <section className="border-y border-border bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading text-2xl font-normal italic leading-relaxed sm:text-3xl">
            &ldquo;{t("description")}&rdquo;
          </p>
          <footer className="mt-8">
            <div className="mx-auto mb-4 h-px w-12 bg-foreground" />
            <cite className="text-sm font-medium not-italic tracking-wide">
              {t("name")}
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
