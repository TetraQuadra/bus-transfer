import { notFound } from "next/navigation";

// Список поддерживаемых локалей
export const locales = ["uk", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

// Конфигурация по умолчанию
export const defaultLocale: Locale = "uk";

export async function loadMessages(locale: string) {
  const normalized = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  try {
    const messages = (await import(`./locales/${normalized}.json`)).default;
    return messages;
  } catch (e) {
    notFound();
  }
}
