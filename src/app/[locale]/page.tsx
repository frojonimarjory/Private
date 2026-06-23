import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { FeaturedWorks } from "@/components/featured-works";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <FeaturedWorks />
      </section>
    </>
  );
}
