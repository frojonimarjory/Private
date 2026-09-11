import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { getSanityMessages } from "@/lib/sanity/content";

type Messages = Record<string, unknown>;

/** Deep-merge Sanity content over the bundled JSON defaults.
 *  Objects merge key by key; anything else (strings, arrays) is replaced. */
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const existing = out[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      existing &&
      typeof existing === "object" &&
      !Array.isArray(existing)
    ) {
      out[key] = deepMerge(existing as Messages, value as Messages);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const fallback = (await import(`../messages/${locale}.json`)).default;

  let messages: Messages = fallback;
  try {
    const sanity = await getSanityMessages(locale as "en" | "pt");
    if (sanity) messages = deepMerge(fallback, sanity);
  } catch {
    // Sanity unreachable — keep the bundled defaults so the site still renders.
  }

  return { locale, messages };
});
