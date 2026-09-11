import { sanityClient } from "./client";

type Locale = "en" | "pt";

/** Pick one language out of a { en, pt } object; undefined if empty. */
function pick(obj: unknown, locale: Locale): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const o = obj as Record<string, unknown>;
  const value = (o[locale] ?? o.en) as unknown;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

/** Map every { en, pt } value of an object to a single locale. */
function localizeMap(
  obj: unknown,
  locale: Locale
): Record<string, string> | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const out: Record<string, string> = {};
  for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
    const v = pick(val, locale);
    if (v !== undefined) out[key] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Recursively drop undefined / empty values so JSON fallbacks show through. */
function prune<T>(value: T): T | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") return value.length ? value : undefined;
  if (Array.isArray(value)) {
    const arr = value.map(prune).filter((v) => v !== undefined);
    return (arr.length ? arr : undefined) as unknown as T;
  }
  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const pv = prune(v);
      if (pv !== undefined) out[k] = pv;
    }
    return (Object.keys(out).length ? out : undefined) as unknown as T;
  }
  return value;
}

const CONTENT_QUERY = `{
  "settings": *[_type == "siteSettings"][0]{
    ...,
    "profileImageUrl": profileImage.asset->url,
    "cvEn": resume.en.asset->url,
    "cvPt": resume.pt.asset->url
  },
  "home": *[_type == "homePage"][0],
  "about": *[_type == "aboutPage"][0],
  "contact": *[_type == "contactPage"][0],
  "ui": *[_type == "uiLabels"][0]
}`;

/**
 * Fetch all editable content from Sanity and shape it into the same message
 * tree that `src/messages/*.json` provides. Returns a partial tree (only the
 * fields Marjory has actually filled in); `src/i18n/request.ts` deep-merges it
 * over the bundled JSON defaults, so anything left blank keeps its default.
 *
 * Returns null when Sanity isn't configured or the fetch fails, so the site
 * always falls back to the bundled defaults and never breaks.
 */
export async function getSanityMessages(
  locale: Locale
): Promise<Record<string, unknown> | null> {
  if (!sanityClient) return null;

  let data: {
    settings?: Record<string, unknown>;
    home?: Record<string, unknown>;
    about?: Record<string, unknown>;
    contact?: Record<string, unknown>;
    ui?: Record<string, unknown>;
  } | null;

  try {
    data = await sanityClient.fetch(CONTENT_QUERY);
  } catch {
    return null;
  }
  if (!data) return null;

  const s = data.settings ?? {};
  const home = data.home ?? {};
  const about = data.about ?? {};
  const contact = data.contact ?? {};
  const ui = data.ui ?? {};

  const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

  const messages: Record<string, unknown> = {
    metadata: localizeMap(ui.metadata, locale),

    nav: localizeMap(ui.nav, locale),
    categories: localizeMap(ui.categories, locale),
    spotlight: localizeMap(ui.spotlight, locale),
    work: localizeMap(ui.work, locale),
    footer: localizeMap(ui.footer, locale),
    common: localizeMap(ui.common, locale),

    settings: {
      logoText: typeof s.logoText === "string" ? s.logoText : undefined,
      profileImageUrl:
        typeof s.profileImageUrl === "string" ? s.profileImageUrl : undefined,
      email: typeof s.email === "string" ? s.email : undefined,
      location: pick(s.location, locale),
      linkedinUrl:
        typeof s.linkedinUrl === "string" ? s.linkedinUrl : undefined,
      whatsappNumber:
        typeof s.whatsappNumber === "string" ? s.whatsappNumber : undefined,
      whatsappDisplay:
        typeof s.whatsappDisplay === "string" ? s.whatsappDisplay : undefined,
      cvUrl:
        (locale === "pt"
          ? (s.cvPt as string | undefined)
          : (s.cvEn as string | undefined)) ??
        (s.cvEn as string | undefined) ??
        (s.cvPt as string | undefined),
    },

    hero: {
      greeting: pick(home.heroGreeting, locale),
      name: pick(s.name, locale),
      tagline: pick(s.tagline, locale),
      description: pick(home.heroDescription, locale),
      cta: pick(home.heroCta, locale),
    },

    home: {
      portfolioHeading: pick(home.portfolioHeading, locale),
    },

    quote: {
      text: pick(home.quoteText, locale),
      attribution: pick(home.quoteAttribution, locale) ?? pick(s.name, locale),
    },

    about: {
      title: pick(about.title, locale),
      bio: pick(about.bio, locale),
      experience: pick(about.experienceLabel, locale),
      education: pick(about.educationLabel, locale),
      skills: pick(about.skillsLabel, locale),
      projects: pick(about.projectsLabel, locale),
      languages: pick(about.languagesLabel, locale),
      downloadCV: pick(about.downloadCvLabel, locale),
      experienceItems: arr(about.experience).map((e) => {
        const it = e as Record<string, unknown>;
        return {
          role: pick(it.role, locale),
          org: typeof it.org === "string" ? it.org : undefined,
          period: pick(it.period, locale),
        };
      }),
      educationItems: arr(about.education).map((e) => {
        const it = e as Record<string, unknown>;
        return {
          degree: pick(it.degree, locale),
          institution:
            typeof it.institution === "string" ? it.institution : undefined,
          period: typeof it.period === "string" ? it.period : undefined,
          detail: pick(it.detail, locale),
        };
      }),
      projectItems: arr(about.projects).map((e) => {
        const it = e as Record<string, unknown>;
        return {
          kind: pick(it.kind, locale),
          year: typeof it.year === "string" ? it.year : undefined,
          title: pick(it.title, locale),
          description: pick(it.description, locale),
        };
      }),
      skillsList: arr(about.skills)
        .map((sk) => pick(sk, locale))
        .filter((v): v is string => Boolean(v)),
      languageList: arr(about.languages).map((e) => {
        const it = e as Record<string, unknown>;
        return {
          name: pick(it.name, locale),
          level: pick(it.level, locale),
        };
      }),
    },

    contact: {
      title: pick(contact.title, locale),
      subtitle: pick(contact.subtitle, locale),
      name: pick(contact.nameLabel, locale),
      email: pick(contact.emailLabel, locale),
      message: pick(contact.messageLabel, locale),
      send: pick(contact.sendLabel, locale),
      sending: pick(contact.sendingLabel, locale),
      success: pick(contact.successMessage, locale),
      error: pick(contact.errorMessage, locale),
      whatsapp: pick(contact.whatsappLabel, locale),
    },
  };

  return (prune(messages) as Record<string, unknown>) ?? {};
}
