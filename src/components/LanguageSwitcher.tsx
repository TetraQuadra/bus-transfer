'use client';

import { useLocale } from 'next-intl';

const supported = ['uk', 'ru', 'en'];

type Props = {
    size?: 'sm' | 'lg';
    variant?: 'default' | 'white';
    className?: string;
};

export default function LanguageSwitcher({ size = 'sm', variant = 'default', className = '' }: Props) {
    const locale = useLocale();

    const handleLanguageChange = (newLocale: string) => {
        if (!supported.includes(newLocale)) return;
        document.cookie = `locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
        // Полная перезагрузка страницы, чтобы пересобрать страницу на сервере
        window.location.href = window.location.pathname;
    };

    const containerGap = size === 'lg' ? 'gap-4' : 'gap-3';
    const textSize = size === 'lg' ? 'text-xl' : 'text-md';
    const baseColor = variant === 'white' ? 'text-white' : 'text-foreground';
    const hoverColor = variant === 'white' ? 'hover:text-white/80' : 'hover:text-[var(--color-primary)]';
    const activeStyle = 'underline decoration-current';

    return (
        <div className={`flex items-center ${containerGap} ${className}`}>
            {supported.map((loc) => (
                <button
                    key={loc}
                    onClick={() => handleLanguageChange(loc)}
                    className={`${textSize} lowercase p-2 cursor-pointer transition-colors ${baseColor} ${locale === loc ? activeStyle : hoverColor
                        }`}
                    aria-current={locale === loc ? 'true' : undefined}
                >
                    {loc === 'uk' ? 'ua' : loc === 'en' ? 'eng' : 'ru'}
                </button>
            ))}
        </div>
    );
}

