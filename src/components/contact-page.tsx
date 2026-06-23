"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-4 font-heading text-4xl font-bold">{t("title")}</h1>
      <p className="mb-10 text-lg text-muted-foreground">{t("subtitle")}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            {t("name")}
          </label>
          <Input
            id="name"
            name="name"
            required
            className="border-border bg-card"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            {t("email")}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="border-border bg-card"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            {t("message")}
          </label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            required
            className="border-border bg-card"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="border border-foreground bg-foreground px-8 py-3 text-sm font-medium tracking-wide text-background transition-all hover:bg-transparent hover:text-foreground disabled:opacity-50"
        >
          {status === "sending" ? t("sending") : t("send")}
        </button>

        {status === "success" && (
          <p className="text-sm text-green-700">{t("success")}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-700">{t("error")}</p>
        )}
      </form>

      <div className="mt-12 border-t border-border pt-8">
        <p className="mb-4 text-sm text-muted-foreground">{t("subtitle")}</p>
        <a
          href="mailto:marjory.frojoni@unesp.br"
          className="text-sm font-medium transition-colors hover:text-muted-foreground"
        >
          marjory.frojoni@unesp.br
        </a>
      </div>
    </motion.div>
  );
}
