"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/work", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  function switchLocale() {
    const nextLocale = locale === "en" ? "pt" : "en";
    router.replace(
      // @ts-expect-error -- pathname is always a valid route
      { pathname, params },
      { locale: nextLocale }
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight">
          MF
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === item.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={switchLocale}
            className="rounded-full border border-border px-3 py-1 text-xs font-medium tracking-wider transition-colors hover:border-foreground hover:text-foreground"
          >
            {locale === "en" ? "PT" : "EN"}
          </button>

          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({
  navItems,
}: {
  navItems: ReadonlyArray<{ href: string; label: string }>;
}) {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <details className="group relative">
        <summary className="flex h-8 w-8 cursor-pointer items-center justify-center list-none">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-48 border border-border bg-card p-2 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 text-sm transition-colors hover:bg-muted ${
                pathname === item.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
