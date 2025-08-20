import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["uk", "ru", "en"] as const;
const DEFAULT_LOCALE = "uk" as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

function negotiateLocale(acceptLanguage: string | null): AppLocale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const lower = acceptLanguage.toLowerCase();
  // simple checks by priority order
  if (lower.includes("uk")) return "uk";
  if (lower.includes("ru")) return "ru";
  if (lower.includes("en")) return "en";
  return DEFAULT_LOCALE;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;

  let locale: AppLocale | null = null;
  if (
    cookieLocale &&
    (SUPPORTED_LOCALES as readonly string[]).includes(cookieLocale)
  ) {
    locale = cookieLocale as AppLocale;
  }

  if (!locale) {
    const hdrs = await headers();
    const acceptLang = hdrs.get("accept-language");
    locale = negotiateLocale(acceptLang);
    // Note: can't persist cookies here (not a Route Handler/Server Action)
    // If persistence needed, set cookie in a Route Handler or on the client after hydration
  }

  return {
    locale: locale ?? DEFAULT_LOCALE,
    messages: (await import(`../locales/${locale ?? DEFAULT_LOCALE}.json`))
      .default,
  };
});
