import { setRequestLocale } from "next-intl/server";
import { WorkListPage } from "@/components/work-list-page";
import { getWorks } from "@/lib/sanity/queries";
import { mockWorks } from "@/lib/mock-data";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let works;
  try {
    works = await getWorks();
    if (!works.length) throw new Error("empty");
  } catch {
    works = mockWorks;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <WorkListPage works={works} />
    </section>
  );
}
