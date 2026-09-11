import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { DocumentarySpotlight } from "@/components/documentary-spotlight";
import { FeaturedWorks } from "@/components/featured-works";
import { QuoteSection } from "@/components/quote-section";
import { getWorks } from "@/lib/sanity/queries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const works = await getWorks();

  // Flagship documentary gets its own spotlight; prefer a featured one.
  const documentary =
    works.find((w) => w.category === "documentary" && w.featured) ??
    works.find((w) => w.category === "documentary");

  // Curated, diverse featured grid (excludes the spotlighted documentary).
  const featured = works.filter(
    (w) => w.featured && w._id !== documentary?._id
  );
  const gridWorks = featured.length
    ? featured
    : works.filter((w) => w._id !== documentary?._id).slice(-8);

  return (
    <>
      <Hero />
      {documentary && <DocumentarySpotlight work={documentary} />}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeaturedWorks works={gridWorks} />
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
