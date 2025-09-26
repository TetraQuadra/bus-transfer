export type CountryId =
  | "ukraine"
  | "poland"
  | "germany"
  | "belgium"
  | "netherlands";

export type DirectionId = "poland" | "germany" | "belgium" | "netherlands";

export interface City {
  slug: string;
  country: CountryId;
  names: {
    uk: string;
    ru: string;
    en: string;
  };
  synonyms: string[];
}

export function normalizeToken(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s'’`-]+/g, "");
}

function makeCity(
  country: CountryId,
  uk: string,
  ru: string,
  en: string,
  extraSynonyms: string[] = []
): City {
  const baseSynonyms = [uk, ru, en];
  const synonyms = Array.from(new Set([...baseSynonyms, ...extraSynonyms]));
  const slug = normalizeToken(en);
  return { slug, country, names: { uk, ru, en }, synonyms };
}

// Украина
const UA_CITIES: City[] = [
  makeCity("ukraine", "Умань", "Умань", "Uman"),
  makeCity("ukraine", "Біла Церква", "Белая Церковь", "Bila Tserkva", [
    "BilaTserkva",
  ]),
  makeCity("ukraine", "Київ", "Киев", "Kyiv", ["Kiev"]),
  makeCity("ukraine", "Житомир", "Житомир", "Zhytomyr", ["Zhitomir"]),
  makeCity("ukraine", "Вінниця", "Винница", "Vinnytsia", ["Vinnitsa"]),
  makeCity("ukraine", "Хмельницький", "Хмельницкий", "Khmelnytskyi", [
    "Khmelnitskyi",
    "Khmelnitsky",
  ]),
  makeCity("ukraine", "Тернопіль", "Тернополь", "Ternopil", []),
  makeCity("ukraine", "Рівне", "Ровно", "Rivne", ["Rovno"]),
  makeCity("ukraine", "Луцьк", "Луцк", "Lutsk", []),
  makeCity("ukraine", "Львів", "Львов", "Lviv", ["Lvov"]),
];

// Польша
const PL_CITIES: City[] = [
  makeCity("poland", "Перемишль", "Перемышль", "Przemysl", ["Przemyśl"]),
  makeCity("poland", "Краків", "Краков", "Krakow", ["Kraków"]),
  makeCity("poland", "Катовіце", "Катовице", "Katowice", []),
  makeCity("poland", "Легніца", "Легница", "Legnica", []),
  makeCity("poland", "Люблін", "Люблин", "Lublin", []),
  makeCity("poland", "Варшава", "Варшава", "Warszawa", ["Warsaw"]),
  makeCity("poland", "Познань", "Познань", "Poznan", ["Poznań"]),
  makeCity("poland", "Щецин", "Щецин", "Szczecin", []),
  makeCity(
    "poland",
    "Гожув-Великопольський",
    "Гожув-Великопольский",
    "Gorzow Wielkopolski",
    ["Gorzów Wielkopolski", "GorzowWielkopolski"]
  ),
];

// Германия
const DE_CITIES: City[] = [
  makeCity("germany", "Берлін", "Берлин", "Berlin", []),
  makeCity("germany", "Магдебург", "Магдебург", "Magdeburg", []),
  makeCity("germany", "Ганновер", "Ганновер", "Hannover", []),
  makeCity("germany", "Оснабрюк", "Оснабрюк", "Osnabruck", ["Osnabrück"]),
  makeCity("germany", "Гамбург", "Гамбург", "Hamburg", []),
  makeCity("germany", "Бремен", "Бремен", "Bremen", []),
  makeCity("germany", "Росток", "Росток", "Rostock", []),
  makeCity("germany", "Дрезден", "Дрезден", "Dresden", []),
  makeCity("germany", "Лейпциг", "Лейпциг", "Leipzig", []),
  makeCity("germany", "Кассель", "Кассель", "Kassel", []),
  makeCity("germany", "Дортмунд", "Дортмунд", "Dortmund", []),
  makeCity("germany", "Дюссельдорф", "Дюссельдорф", "Dusseldorf", [
    "Düsseldorf",
  ]),
  makeCity("germany", "Вупперталь", "Вупперталь", "Wuppertal", []),
  makeCity("germany", "Кельн", "Кёльн", "Koln", ["Köln", "Cologne"]),
  makeCity("germany", "Нюрнберг", "Нюрнберг", "Nurnberg", [
    "Nürnberg",
    "Nuernberg",
  ]),
  makeCity("germany", "Мюнхен", "Мюнхен", "Munich", ["München", "Munchen"]),
  makeCity("germany", "Штутгарт", "Штутгарт", "Stuttgart", []),
  makeCity("germany", "Карлсруе", "Карлсруэ", "Karlsruhe", []),
  makeCity("germany", "Саарбрюккен", "Саарбрюккен", "Saarbrucken", [
    "Saarbrücken",
  ]),
  makeCity("germany", "Цвайбрюккен", "Цвайбрюккен", "Zweibrucken", [
    "Zweibrücken",
  ]),
  makeCity(
    "germany",
    "Франкфурт-на-Майні",
    "Франкфурт-на-Майне",
    "Frankfurt am Main",
    ["FrankfurtamMain", "Frankfurt-am-Main"]
  ),
  makeCity("germany", "Бонн", "Бонн", "Bonn", []),
  makeCity("germany", "Аахен", "Аахен", "Aachen", []),
];

// Бельгия
const BE_CITIES: City[] = [
  makeCity("belgium", "Брюссель", "Брюссель", "Bruxelles", ["Brussels"]),
  makeCity("belgium", "Антверпен", "Антверпен", "Antwerpen", ["Antwerp"]),
  makeCity("belgium", "Гент", "Гент", "Gent", ["Ghent"]),
  makeCity("belgium", "Льєж", "Льеж", "Liege", ["Liège"]),
  makeCity("belgium", "Мол", "Мол", "Mol", []),
  makeCity("belgium", "Генк", "Генк", "Genk", []),
  makeCity("belgium", "Левен", "Лёвен", "Leuven", []),
  makeCity("belgium", "Хасселт", "Хасселт", "Hasselt", []),
  makeCity("belgium", "Намур", "Намюр", "Namur", []),
  makeCity("belgium", "Шарлеруа", "Шарлеруа", "Charleroi", []),
  makeCity("belgium", "Монс", "Монс", "Mons", []),
  makeCity("belgium", "Кортрейк", "Кортрейк", "Kortrijk", []),
  makeCity("belgium", "Остенде", "Остенде", "Oostende", ["Ostend"]),
  makeCity("belgium", "Брюгге", "Брюгге", "Brugge", ["Bruges"]),
  makeCity("belgium", "Дендермонде", "Дендермонде", "Dendermonde", []),
  makeCity("belgium", "Аалст", "Аалст", "Aalst", []),
  makeCity("belgium", "Ауденарде", "Ауденарде", "Oudenaarde", []),
  makeCity("belgium", "Ґераардсберґен", "Гераардсберген", "Geraardsbergen", []),
  makeCity("belgium", "Мехелен", "Мехелен", "Mechelen", []),
  makeCity("belgium", "Завентем", "Завентем", "Zaventem", []),
];

// Нидерланды
const NL_CITIES: City[] = [
  makeCity("netherlands", "Алмело", "Алмело", "Almelo", []),
  makeCity("netherlands", "Енсхеде", "Энсхеде", "Enschede", []),
  makeCity("netherlands", "Зволле", "Зволле", "Zwolle", []),
  makeCity("netherlands", "Гронінген", "Гронинген", "Groningen", []),
  makeCity("netherlands", "Еммелорд", "Эммелорд", "Emmeloord", []),
  makeCity("netherlands", "Аммерсфоорт", "Амерсфорт", "Amersfoort", []),
  makeCity("netherlands", "Алміре", "Алмере", "Almere", []),
  makeCity("netherlands", "Апелдорн", "Апелдорн", "Apeldoorn", []),
  makeCity("netherlands", "Утрехт", "Утрехт", "Utrecht", []),
  makeCity("netherlands", "Гарлем", "Харлем", "Haarlem", []),
  makeCity("netherlands", "Енкхейзен", "Энкхёйзен", "Enkhuizen", []),
  makeCity("netherlands", "Алкмар", "Алкмар", "Alkmaar", []),
  makeCity("netherlands", "Ден-Гелдер", "Ден-Хелдер", "Den Helder", [
    "DenHelder",
  ]),
  makeCity("netherlands", "Леуварден", "Леуварден", "Leeuwarden", []),
  makeCity("netherlands", "Амстердам", "Амстердам", "Amsterdam", []),
  makeCity("netherlands", "Алсмер", "Аалсмир", "Aalsmeer", []),
  makeCity("netherlands", "Зандворт", "Зандворт", "Zandvoort", []),
  makeCity("netherlands", "Ліссе", "Лиссе", "Lisse", []),
  makeCity("netherlands", "Нордвейк", "Нордвейк", "Noordwijk", []),
  makeCity("netherlands", "Гаага", "Гаага", "Den Haag", [
    "The Hague",
    "sGravenhage",
    "s-Gravenhage",
    "Hague",
    "denhaag",
  ]),
  makeCity("netherlands", "Роттердам", "Роттердам", "Rotterdam", []),
  makeCity("netherlands", "Дордрехт", "Дордрехт", "Dordrecht", []),
  makeCity("netherlands", "Гертогенбос", "С-Хертогенбос", "s-Hertogenbosch", [
    "'s-Hertogenbosch",
    "sHertogenbosch",
    "Den Bosch",
    "DenBosch",
  ]),
  makeCity("netherlands", "Неймеген", "Неймеген", "Nijmegen", []),
  makeCity("netherlands", "Бреда", "Бреда", "Breda", []),
  makeCity("netherlands", "Берген-оп-Зом", "Берген-оп-Зом", "Bergen op Zoom", [
    "BergenopZoom",
  ]),
  makeCity("netherlands", "Тільбург", "Тилбург", "Tilburg", []),
  makeCity("netherlands", "Ейндховен", "Эйндховен", "Eindhoven", []),
  makeCity("netherlands", "Маастрихт", "Маастрихт", "Maastricht", []),
  makeCity("netherlands", "Венло", "Венло", "Venlo", []),
  makeCity("netherlands", "Арнем", "Арнем", "Arnhem", []),
  makeCity("netherlands", "Мідделбург", "Мидделбург", "Middelburg", []),
];

export const ALL_CITIES: City[] = [
  ...UA_CITIES,
  ...PL_CITIES,
  ...DE_CITIES,
  ...BE_CITIES,
  ...NL_CITIES,
];

export const citiesBySlug: Record<string, City> = ALL_CITIES.reduce(
  (acc, city) => {
    acc[city.slug] = city;
    return acc;
  },
  {} as Record<string, City>
);

export const synonymsIndex: Record<string, City> = ALL_CITIES.reduce(
  (acc, city) => {
    for (const name of city.synonyms) {
      acc[normalizeToken(name)] = city;
    }
    acc[normalizeToken(city.names.en)] = city;
    return acc;
  },
  {} as Record<string, City>
);

export function findCityByName(input: string): City | undefined {
  return synonymsIndex[normalizeToken(input)];
}

export function isUkraineCity(city: City): boolean {
  return city.country === "ukraine";
}

export function getDirectionByCountryId(
  country: CountryId
): DirectionId | undefined {
  if (
    country === "poland" ||
    country === "germany" ||
    country === "belgium" ||
    country === "netherlands"
  )
    return country;
  return undefined;
}

export function getDirectionByCity(city: City): DirectionId | undefined {
  return getDirectionByCountryId(city.country);
}

export const EU_COUNTRIES: DirectionId[] = [
  "poland",
  "germany",
  "belgium",
  "netherlands",
];

export const UA_CITIES_LIST = UA_CITIES;
export const EU_CITIES_LIST = [
  ...PL_CITIES,
  ...DE_CITIES,
  ...BE_CITIES,
  ...NL_CITIES,
];
