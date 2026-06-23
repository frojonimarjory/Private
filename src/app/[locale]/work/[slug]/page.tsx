import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { WorkDetail } from "@/components/work-detail";
import { mockWorks } from "@/lib/mock-data";

export async function generateStaticParams() {
  return mockWorks.map((work) => ({ slug: work.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const work = mockWorks.find((w) => w.slug.current === slug);
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

  const work = mockWorks.find((w) => w.slug.current === slug);
  if (!work) notFound();

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <WorkDetail work={work} />
    </section>
  );
}
