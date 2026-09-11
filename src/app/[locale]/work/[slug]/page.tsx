import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { WorkDetail } from "@/components/work-detail";
import { getWorks, getWorkBySlug } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((w) => ({ slug: w.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const work = await getWorkBySlug(slug);
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

  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <WorkDetail work={work} />
    </section>
  );
}
