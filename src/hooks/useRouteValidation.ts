"use client";

import { useEffect, useMemo } from "react";
import { ALL_CITIES, findCityByName, isUkraineCity } from "@/const/cities";
import { useOptionalBookingContext } from "@/contexts/BookingContext";
import { useLocale } from "next-intl";

interface UseRouteValidationProps {
  departureCountry: string;
  departureCity: string;
  arrivalCountry: string;
  arrivalCity: string;
}

export function useRouteValidation({
  departureCountry,
  departureCity,
  arrivalCountry,
  arrivalCity,
}: UseRouteValidationProps) {
  const context = useOptionalBookingContext();
  const setSelectedRoute = context?.setSelectedRoute;
  const locale = useLocale();
  const supported = ["uk", "ru", "en"] as const;
  const lang = (supported as readonly string[]).includes(locale)
    ? (locale as "uk" | "ru" | "en")
    : "uk";

  const validationResult = useMemo(() => {
    // Проверяем, что все поля заполнены
    if (
      !departureCity ||
      !arrivalCity ||
      !departureCountry ||
      !arrivalCountry
    ) {
      return { isValid: false, fromCity: null, toCity: null };
    }

    // Ищем города
    const fromCity =
      ALL_CITIES.find((c) => c.names[lang] === departureCity) ||
      findCityByName(departureCity);
    const toCity =
      ALL_CITIES.find((c) => c.names[lang] === arrivalCity) ||
      findCityByName(arrivalCity);

    // Проверяем существование городов
    if (!fromCity || !toCity) {
      return { isValid: false, fromCity, toCity };
    }

    // Проверяем направление (Украина ↔ Европа)
    const fromIsUa = isUkraineCity(fromCity);
    const toIsUa = isUkraineCity(toCity);

    if (fromIsUa === toIsUa) {
      return { isValid: false, fromCity, toCity };
    }

    // Проверяем соответствие города и страны (упрощенная проверка)
    // Создаем мапу для перевода локализованных названий стран в английские коды
    const countryCodeMap: Record<string, string> = {
      // Украинский
      україна: "ukraine",
      польща: "poland",
      німеччина: "germany",
      бельгія: "belgium",
      нідерланди: "netherlands",
      // Русский
      украина: "ukraine",
      польша: "poland",
      германия: "germany",
      бельгия: "belgium",
      нидерланды: "netherlands",
      // Английский
      ukraine: "ukraine",
      poland: "poland",
      germany: "germany",
      belgium: "belgium",
      netherlands: "netherlands",
    };

    const depCode =
      countryCodeMap[departureCountry.toLowerCase()] ||
      departureCountry.toLowerCase();
    const arrCode =
      countryCodeMap[arrivalCountry.toLowerCase()] ||
      arrivalCountry.toLowerCase();

    if (fromCity.country !== depCode && fromCity.country !== "ukraine") {
      return { isValid: false, fromCity, toCity };
    }
    if (toCity.country !== arrCode && toCity.country !== "ukraine") {
      return { isValid: false, fromCity, toCity };
    }

    return { isValid: true, fromCity, toCity };
  }, [departureCountry, departureCity, arrivalCountry, arrivalCity, lang]);

  useEffect(() => {
    if (
      setSelectedRoute &&
      validationResult.isValid &&
      validationResult.fromCity &&
      validationResult.toCity
    ) {
      setSelectedRoute({
        fromCity: validationResult.fromCity,
        toCity: validationResult.toCity,
      });
    }
    // Не сбрасываем selectedRoute в null при невалидном состоянии
    // Это позволяет сохранить последний валидный маршрут
  }, [validationResult, setSelectedRoute, lang]);

  return validationResult;
}
