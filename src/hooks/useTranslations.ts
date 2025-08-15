import { useTranslations as useNextIntlTranslations } from "next-intl";

export function useTranslations(namespace?: string) {
  return useNextIntlTranslations(namespace);
}

export function useLocale() {
  // Этот хук будет доступен через next-intl
  return useNextIntlTranslations();
}
