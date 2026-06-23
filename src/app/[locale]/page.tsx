import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { FeaturedWorks } from "@/components/featured-works";
import { QuoteSection } from "@/components/quote-section";
import { getWorks } from "@/lib/sanity/queries";
import { mockWorks } from "@/lib/mock-data";

export default async function HomePage({
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
    <>
      <Hero />
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeaturedWorks works={works.slice(-8)} />
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
