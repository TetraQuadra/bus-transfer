import { findCityByName } from "@/const/cities";
import { getPriceByRoute as getPriceByRouteData } from "./priceData";

export interface PriceResult {
  from: string;
  to: string;
  comfort: number;
  luxury: number;
  found: boolean;
}

/**
 * Получает цену перевозки между двумя городами по их латинским слагам
 * Автоматически пробует обратный маршрут если прямой не найден
 * @param fromSlug - слаг города отправления (например, "kyiv")
 * @param toSlug - слаг города назначения (например, "warszawa")
 * @returns объект с ценами и информацией о городах
 */
export function getPrice(fromSlug: string, toSlug: string): PriceResult {
  // Сначала пробуем прямой маршрут
  const directRoute = `${fromSlug}-${toSlug}`;
  let price = getPriceByRouteData(directRoute);
  let actualFrom = fromSlug;
  let actualTo = toSlug;

  // Если прямой маршрут не найден, пробуем обратный
  if (!price.found) {
    const reverseRoute = `${toSlug}-${fromSlug}`;
    price = getPriceByRouteData(reverseRoute);
    if (price.found) {
      actualFrom = toSlug;
      actualTo = fromSlug;
    }
  }

  // Получаем информацию о городах
  const fromCity = findCityByName(actualFrom);
  const toCity = findCityByName(actualTo);

  return {
    from: fromCity?.names.en || actualFrom,
    to: toCity?.names.en || actualTo,
    ...price,
  };
}

/**
 * Получает цену по маршруту в формате "fromSlug-toSlug"
 * Автоматически пробует обратный маршрут если прямой не найден
 * @param routeSlug - маршрут в формате "kyiv-warszawa"
 * @returns объект с ценами и информацией о городах
 */
export function getPriceByRoute(routeSlug: string): PriceResult {
  const parts = routeSlug.split("-");
  if (parts.length !== 2) {
    return {
      from: "",
      to: "",
      comfort: 0,
      luxury: 0,
      found: false,
    };
  }

  const [fromSlug, toSlug] = parts;
  return getPrice(fromSlug, toSlug);
}
