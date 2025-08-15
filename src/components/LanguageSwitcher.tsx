'use client';

import { useLocale } from 'next-intl';

const languageNames: Record<string, string> = {
    uk: 'Українська',
    ru: 'Русский',
    en: 'English'
};

const supported = ['uk', 'ru', 'en'];

export default function LanguageSwitcher() {
    const locale = useLocale();

    const handleLanguageChange = (newLocale: string) => {
        if (!supported.includes(newLocale)) return;
        document.cookie = `locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
        // Полная перезагрузка страницы, чтобы пересобрать страницу на сервере
        window.location.href = window.location.pathname;
    };

    return (
        <div className="relative">
            <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-transparent border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
            >
                {supported.map((loc) => (
                    <option key={loc} value={loc}>
                        {languageNames[loc]}
                    </option>
                ))}
            </select>
        </div>
    );
}

