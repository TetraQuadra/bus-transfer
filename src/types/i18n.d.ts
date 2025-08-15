import type { locales } from "@/i18n";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export type Locale = (typeof locales)[number];

// Расширяем типы next-intl
declare module "next-intl" {
  interface Messages {
    common: {
      loading: string;
      error: string;
      success: string;
      cancel: string;
      save: string;
      edit: string;
      delete: string;
      search: string;
      filter: string;
      sort: string;
    };
    navigation: {
      home: string;
      about: string;
      services: string;
      contact: string;
    };
  }
}
