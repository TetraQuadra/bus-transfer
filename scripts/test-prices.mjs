#!/usr/bin/env node

import fs from "fs";
import path from "path";

console.log("🧪 Тест системы цен для билда");
console.log("=====================================");
console.log("");

// Читаем файл с ценами
const priceDataPath = path.join(process.cwd(), "src/lib/priceData.ts");
const priceDataContent = fs.readFileSync(priceDataPath, "utf8");

// Извлекаем все маршруты
const routeRegex =
  /"([a-z]+-[a-z]+)":\s*\{\s*comfort:\s*\d+,\s*luxury:\s*\d+\s*\}/g;
const existingRoutes = [];
let match;
while ((match = routeRegex.exec(priceDataContent)) !== null) {
  existingRoutes.push(match[1]);
}

console.log(`📊 Найдено ${existingRoutes.length} маршрутов в PRICE_DATA`);

// Читаем файл с городами
const citiesPath = path.join(process.cwd(), "src/const/cities.ts");
const citiesContent = fs.readFileSync(citiesPath, "utf8");

// Извлекаем города
const cities = [];
const cityRegex = /makeCity\("([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g;
while ((match = cityRegex.exec(citiesContent)) !== null) {
  const [, country, uk, ru, en] = match;
  const slug = en.toLowerCase().replace(/[^a-z]/g, "");
  cities.push({ slug, country, names: { uk, ru, en } });
}

// Разделяем города по странам
const ukraineCities = cities.filter((city) => city.country === "ukraine");
const europeCities = cities.filter((city) => city.country !== "ukraine");

console.log(`📊 Города:`);
console.log(`   🇺🇦 Украина: ${ukraineCities.length}`);
console.log(`   🇪🇺 Европа: ${europeCities.length}`);

// Создаем хеш-мапу для быстрого поиска
const priceMap = new Map();
existingRoutes.forEach((route) => {
  priceMap.set(route, true);
});

// Функция для проверки маршрута (с автоматическим переключением)
function canFindRoute(fromSlug, toSlug) {
  // Пробуем прямой маршрут
  if (priceMap.has(`${fromSlug}-${toSlug}`)) {
    return true;
  }
  // Пробуем обратный маршрут
  if (priceMap.has(`${toSlug}-${fromSlug}`)) {
    return true;
  }
  return false;
}

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failedRoutes = [];

// Тестируем все пары в обе стороны
for (const ukraineCity of ukraineCities) {
  for (const europeCity of europeCities) {
    // Украина → Европа
    totalTests++;
    if (canFindRoute(ukraineCity.slug, europeCity.slug)) {
      passedTests++;
    } else {
      failedTests++;
      failedRoutes.push(`${ukraineCity.slug}-${europeCity.slug}`);
    }

    // Европа → Украина
    totalTests++;
    if (canFindRoute(europeCity.slug, ukraineCity.slug)) {
      passedTests++;
    } else {
      failedTests++;
      failedRoutes.push(`${europeCity.slug}-${ukraineCity.slug}`);
    }
  }
}

console.log("");
console.log("📈 Результаты тестирования:");
console.log(
  `   ✅ Успешно: ${passedTests}/${totalTests} (${Math.round(
    (passedTests / totalTests) * 100
  )}%)`
);
console.log(
  `   ❌ Ошибок: ${failedTests}/${totalTests} (${Math.round(
    (failedTests / totalTests) * 100
  )}%)`
);

if (failedRoutes.length > 0) {
  console.log("");
  console.log("🚨 Проблемные маршруты:");
  failedRoutes.slice(0, 10).forEach((route) => {
    const [from, to] = route.split("-");
    const fromCity = cities.find((c) => c.slug === from);
    const toCity = cities.find((c) => c.slug === to);
    console.log(
      `   ❌ ${fromCity?.names.en || from} → ${toCity?.names.en || to}`
    );
  });

  if (failedRoutes.length > 10) {
    console.log(`   ... и еще ${failedRoutes.length - 10} маршрутов`);
  }
}

console.log("");
console.log("=====================================");

if (failedTests === 0) {
  console.log("🎉 ВСЕ ТЕСТЫ ПРОШЛИ УСПЕШНО!");
  console.log("✅ Система цен полностью готова к продакшену!");
  process.exit(0);
} else {
  console.log("⚠️  ЕСТЬ ПРОБЛЕМЫ С СИСТЕМОЙ ЦЕН!");
  console.log("❌ Некоторые маршруты недоступны");
  process.exit(1);
}
