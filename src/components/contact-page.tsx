"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactPage() {
  const t = useTranslations("contact");
  const s = useTranslations("settings");
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
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${s("email")}`}
            className="text-sm font-medium transition-colors hover:text-muted-foreground"
          >
            {s("email")}
          </a>
          <a
            href={`https://wa.me/${s("whatsappNumber")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 border border-foreground px-5 py-2.5 text-sm font-medium tracking-wide transition-all hover:bg-foreground hover:text-background"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
            </svg>
            {t("whatsapp")} &middot; {s("whatsappDisplay")}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
