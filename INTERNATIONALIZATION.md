# Интернационализация (i18n)

Проект настроен для поддержки трех языков:

- **Украинский (uk)** - язык по умолчанию
- **Русский (ru)**
- **Английский (en)**

## Структура файлов

```
src/
├── i18n.ts                    # Конфигурация интернационализации
├── middleware.ts              # Middleware для обработки локализации
├── locales/                   # Файлы переводов
│   ├── uk.json               # Украинские переводы
│   ├── ru.json               # Русские переводы
│   └── en.json               # Английские переводы
├── app/
│   ├── [locale]/             # Динамические маршруты с локалью
│   │   ├── layout.tsx        # Layout с поддержкой локализации
│   │   └── page.tsx          # Главная страница
│   ├── layout.tsx            # Корневой layout (перенаправление)
│   └── page.tsx              # Корневая страница (перенаправление)
└── components/
    └── LanguageSwitcher.tsx  # Компонент переключения языков
```

## Использование

### В компонентах

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("common");

  return (
    <div>
      <p>{t("loading")}</p>
      <button>{t("save")}</button>
    </div>
  );
}
```

### В серверных компонентах

```tsx
import { getTranslations } from "next-intl/server";

export default async function ServerComponent() {
  const t = await getTranslations("common");

  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
}
```

### Переключение языков

```tsx
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

## URL структура

- `/uk` - украинская версия (по умолчанию)
- `/ru` - русская версия
- `/en` - английская версия

При переходе на корневой URL `/` происходит автоматическое перенаправление на `/uk`.

## Добавление новых переводов

1. Добавьте новые ключи в файлы переводов (`src/locales/*.json`)
2. Обновите типы в `src/types/i18n.d.ts`
3. Используйте новые ключи в компонентах

## Пример добавления нового раздела переводов

```json
// src/locales/uk.json
{
  "common": { ... },
  "hero": {
    "title": "Заголовок",
    "subtitle": "Подзаголовок",
    "cta": "Кнопка действия"
  }
}
```

```tsx
// В компоненте
const t = useTranslations("hero");
return <h1>{t("title")}</h1>;
```
