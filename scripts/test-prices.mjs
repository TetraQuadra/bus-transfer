#!/usr/bin/env node

import fs from "fs";
import path from "path";

const priceDataPath = path.join(process.cwd(), "src/lib/priceData.ts");
const priceDataContent = fs.readFileSync(priceDataPath, "utf8");

const routeRegex =
  /"([a-z]+-[a-z]+)":\s*\{\s*comfort:\s*\d+,\s*luxury:\s*\d+\s*\}/g;
const existingRoutes = [];
let match;
while ((match = routeRegex.exec(priceDataContent)) !== null) {
  existingRoutes.push(match[1]);
}

console.log(`всего ${existingRoutes.length} маршрутов в PRICE_DATA`);

const citiesPath = path.join(process.cwd(), "src/const/cities.ts");
const citiesContent = fs.readFileSync(citiesPath, "utf8");
const cities = [];
const cityRegex = /makeCity\("([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g;
while ((match = cityRegex.exec(citiesContent)) !== null) {
  const [, country, uk, ru, en] = match;
  const slug = en.toLowerCase().replace(/[^a-z]/g, "");
  cities.push({ slug, country, names: { uk, ru, en } });
}

const ukraineCities = cities.filter((city) => city.country === "ukraine");
const europeCities = cities.filter((city) => city.country !== "ukraine");

console.log(`Города:`);
console.log(`Украина: ${ukraineCities.length}`);
console.log(`Европа: ${europeCities.length}`);

const priceMap = new Map();
existingRoutes.forEach((route) => {
  priceMap.set(route, true);
});

function canFindRoute(fromSlug, toSlug) {
  if (priceMap.has(`${fromSlug}-${toSlug}`)) {
    return true;
  }
  if (priceMap.has(`${toSlug}-${fromSlug}`)) {
    return true;
  }
  return false;
}

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failedRoutes = [];

for (const ukraineCity of ukraineCities) {
  for (const europeCity of europeCities) {
    totalTests++;
    if (canFindRoute(ukraineCity.slug, europeCity.slug)) {
      passedTests++;
    } else {
      failedTests++;
      failedRoutes.push(`${ukraineCity.slug}-${europeCity.slug}`);
    }

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
console.log(" Результаты тестирования:");
console.log(
  `Успешно: ${passedTests}/${totalTests} (${Math.round(
    (passedTests / totalTests) * 100
  )}%)`
);
console.log(
  `Ошибок: ${failedTests}/${totalTests} (${Math.round(
    (failedTests / totalTests) * 100
  )}%)`
);

if (failedRoutes.length > 0) {
  console.log("");
  console.log("Проблемные маршруты:");
  failedRoutes.slice(0, 10).forEach((route) => {
    const [from, to] = route.split("-");
    const fromCity = cities.find((c) => c.slug === from);
    const toCity = cities.find((c) => c.slug === to);
    console.log(`${fromCity?.names.en || from} → ${toCity?.names.en || to}`);
  });

  if (failedRoutes.length > 10) {
    console.log(`   ... и еще ${failedRoutes.length - 10} маршрутов`);
  }
}

console.log("");
console.log("=====================================");

if (failedTests === 0) {
  console.log("ВСЕ ТЕСТЫ ПРОШЛИ УСПЕШНО!");
  process.exit(0);
} else {
  console.log("ЕСТЬ ПРОБЛЕМЫ С СИСТЕМОЙ ЦЕН!");
  process.exit(1);
}
