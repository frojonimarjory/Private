import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { WorkDetail } from "@/components/work-detail";
import { getWorks, getWorkBySlug } from "@/lib/sanity/queries";
import { mockWorks } from "@/lib/mock-data";

export async function generateStaticParams() {
  try {
    const works = await getWorks();
    if (works.length) return works.map((w) => ({ slug: w.slug.current }));
  } catch {
    /* fallback below */
  }
  return mockWorks.map((w) => ({ slug: w.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  let work;
  try {
    work = await getWorkBySlug(slug);
  } catch {
    work = mockWorks.find((w) => w.slug.current === slug) ?? null;
  }
  if (!work) return {};

  const title = work.title[locale as "en" | "pt"] || work.title.en;
  const description = work.excerpt[locale as "en" | "pt"] || work.excerpt.en;

  return { title, description };
}

export default async function WorkSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let work;
  try {
    work = await getWorkBySlug(slug);
  } catch {
    work = mockWorks.find((w) => w.slug.current === slug) ?? null;
  }
  if (!work) notFound();

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <WorkDetail work={work} />
    </section>
  );
}
