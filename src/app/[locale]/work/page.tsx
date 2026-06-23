import { setRequestLocale } from "next-intl/server";
import { WorkListPage } from "@/components/work-list-page";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <WorkListPage />
    </section>
  );
}
