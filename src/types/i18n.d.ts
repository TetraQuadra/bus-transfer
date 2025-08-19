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
  interface BookingMessages {
    title: string;
    submitLabel: string;
    meta: {
      directionTitlePrefix: string;
      directionDescription: string;
      pairTitlePrefix: string;
      pairDescription: string;
    };
    fields: {
      departureCountry: { label: string; placeholder: string };
      departureCity: { label: string; placeholder: string };
      arrivalCountry: { label: string; placeholder: string };
      arrivalCity: { label: string; placeholder: string };
      date: { label: string; placeholder: string };
      fullName: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
    };
    errors: {
      required: string;
      invalidCity: string;
      directionConstraint: string;
    };
    log: { submitted: string };
    alert: { submitted: string };
    suggestions: {
      countries: string[];
      cities: string[];
    };
    countryTexts: {
      title: string;
      poland: { p1: string; p2: string };
      germany: { p1: string; p2: string };
      belgium: { p1: string; p2: string };
      netherlands: { p1: string; p2: string };
    };
  }
  interface Messages {
    booking: BookingMessages;
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
