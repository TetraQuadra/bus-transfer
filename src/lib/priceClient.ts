import { PriceResult } from "./prices";

/**
 * Получает цену перевозки между двумя городами через API
 * @param fromCity - город отправления (слаг)
 * @param toCity - город назначения (слаг)
 * @returns Promise с данными о цене
 */
export async function getPrice(
  fromCity: string,
  toCity: string
): Promise<PriceResult> {
  try {
    const response = await fetch(
      `/api/price?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(
        toCity
      )}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching price:", error);
    return {
      from: fromCity,
      to: toCity,
      comfort: 0,
      luxury: 0,
      found: false,
    };
  }
}

/**
 * Получает цену по маршруту через API
 * @param routeSlug - маршрут в формате "kyiv-warszawa"
 * @returns Promise с данными о цене
 */
export async function getPriceByRoute(routeSlug: string): Promise<PriceResult> {
  try {
    const response = await fetch(
      `/api/price?route=${encodeURIComponent(routeSlug)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching price by route:", error);
    return {
      from: "",
      to: "",
      comfort: 0,
      luxury: 0,
      found: false,
    };
  }
}

/**
 * Форматирует цену для отображения
 * @param price - цена в евро
 * @returns отформатированная строка
 */
export function formatPrice(price: number): string {
  return `${price} €`;
}

/**
 * Получает цену с форматированием
 * @param fromCity - город отправления (слаг)
 * @param toCity - город назначения (слаг)
 * @returns Promise с отформатированными ценами
 */
export async function getFormattedPrice(
  fromCity: string,
  toCity: string
): Promise<{
  comfort: string;
  luxury: string;
  found: boolean;
}> {
  const price = await getPrice(fromCity, toCity);

  return {
    comfort: formatPrice(price.comfort),
    luxury: formatPrice(price.luxury),
    found: price.found,
  };
}

/**
 * Получает отформатированную цену по маршруту
 * @param routeSlug - маршрут в формате "kyiv-warszawa"
 * @returns Promise с отформатированными ценами
 */
export async function getFormattedPriceByRoute(routeSlug: string): Promise<{
  from: string;
  to: string;
  comfort: string;
  luxury: string;
  found: boolean;
}> {
  const price = await getPriceByRoute(routeSlug);

  return {
    from: price.from,
    to: price.to,
    comfort: formatPrice(price.comfort),
    luxury: formatPrice(price.luxury),
    found: price.found,
  };
}
