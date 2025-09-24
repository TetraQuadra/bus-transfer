import { notFound } from 'next/navigation';
import BookingSection from '@/sections/BookingSection';
import RoutesSection from '@/sections/RoutesSection';
import TrustSection from '@/sections/TrustSection';
import FAQSection from '@/sections/FAQSection';
import AboutRoute from '@/sections/AboutRoute';
import BookHero from '@/sections/BookHero';
import { DirectionId, EU_COUNTRIES, UA_CITIES_LIST, EU_CITIES_LIST, citiesBySlug, getDirectionByCity } from '@/const/cities';
import { getTranslations, getLocale } from 'next-intl/server';
import WeOfferSection from '@/sections/WeOfferSection';
import TransportationRules from '@/sections/TransportationRules';
import type { Metadata } from 'next';
import Script from 'next/script';

type Props = { params: Promise<{ slug: string }> };

function isDirectionSlug(slug: string): slug is DirectionId {
    return (EU_COUNTRIES as readonly string[]).includes(slug);
}

function parsePair(slug: string): { from: string; to: string } | null {
    const parts = slug.split('-');
    if (parts.length !== 2) return null;
    const [a, b] = parts;
    if (!a || !b) return null;
    return { from: a, to: b };
}

function resolveDirectionFromSlug(slug: string): DirectionId | null {
    if (isDirectionSlug(slug)) return slug;
    const pair = parsePair(slug);
    if (!pair) return null;
    const fromCity = citiesBySlug[pair.from];
    const toCity = citiesBySlug[pair.to];
    if (!fromCity || !toCity) return null;
    // определить направление как неукраинская сторона
    const nonUaCity = fromCity.country === 'ukraine' ? toCity : fromCity;
    const dir = getDirectionByCity(nonUaCity);
    return dir ?? null;
}

export async function generateStaticParams() {
    const params: { slug: string }[] = [];
    // общие направления
    for (const country of EU_COUNTRIES) {
        params.push({ slug: country });
    }
    // пары UA <-> EU
    for (const ua of UA_CITIES_LIST) {
        for (const eu of EU_CITIES_LIST) {
            params.push({ slug: `${ua.slug}-${eu.slug}` });
            params.push({ slug: `${eu.slug}-${ua.slug}` });
        }
    }
    /*
    // Logging disabled
    try {
        const total = params.length;
        const directions = EU_COUNTRIES.length;
        const pairs = total - directions;
        const paths = params.map((p) => `/book/${p.slug}`);
        console.log(`[SSG][book] total: ${total} pages (${directions} directions + ${pairs} pairs)`);
        const mode = process.env.LOG_SSG_BOOK || 'summary';
        if (mode === 'full') {
            const chunkSize = 200;
            for (let i = 0; i < paths.length; i += chunkSize) {
                console.log(`[SSG][book] paths ${i + 1}-${Math.min(i + chunkSize, paths.length)}:`);
                console.log(paths.slice(i, i + chunkSize).join('\n'));
            }
        } else {
            const head = paths.slice(0, 30);
            const tail = paths.slice(-30);
            console.log('[SSG][book] sample (first 30):');
            console.log(head.join('\n'));
            console.log('[SSG][book] sample (last 30):');
            console.log(tail.join('\n'));
            console.log('[SSG][book] set env LOG_SSG_BOOK=full to print the full list');
        }

        // Write full list to JSON
        try {
            const fs = await import('node:fs/promises');
            const pathMod = await import('node:path');
            const outPath = pathMod.join(process.cwd(), 'ssg-book-paths.json');
            const payload = { total, directions, pairs, paths };
            await fs.writeFile(outPath, JSON.stringify(payload, null, 2), 'utf-8');
            console.log(`[SSG][book] full list written to: ${outPath}`);
        } catch (fileErr) {
            console.log('[SSG][book] failed to write ssg-book-paths.json:', fileErr);
        }
    } catch (e) {
        console.log('[SSG][book] logging failed:', e);
    }
    */
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations('booking');
    const locale = await getLocale();
    const { slug } = await params;
    let title = '';
    let description = '';

    const countries = t.raw('suggestions.countries') as string[];
    const nameByCode = (code: 'ukraine' | DirectionId) => {
        const indexMap: Record<'ukraine' | DirectionId, number> = {
            ukraine: 0,
            poland: 1,
            germany: 2,
            netherlands: 3,
            belgium: 4
        };
        return countries[indexMap[code]] ?? '';
    };

    const canonical = `/book/${slug}`;
    const siteName = locale === 'en' ? 'World of Modern Transportation' : 'Світ Сучасних Перевезень';
    const ogLocale = locale === 'uk' ? 'uk_UA' : locale === 'ru' ? 'ru_UA' : 'en';

    const dirMap: Record<string, string> = {
        uk: 'Україна — {direction}',
        ru: 'Украина — {direction}',
        en: 'Ukraine — {direction}'
    };
    const keywordsBase: Record<string, string[]> = {
        uk: ['пасажирські перевезення', 'доставка посилок', 'перевезення тварин', 'мікроавтобус', 'квитки автобус'],
        ru: ['пассажирские перевозки', 'доставка посылок', 'перевозка животных', 'микроавтобус', 'билеты автобус'],
        en: ['passenger transfers', 'parcel delivery', 'pet transportation', 'minibus', 'bus tickets']
    };
    let keywords: string[] = [];

    if (isDirectionSlug(slug)) {
        const directionName = nameByCode(slug);
        title = `${t('meta.directionTitlePrefix', { direction: directionName })}`;
        description = `${t('meta.directionDescription', { direction: directionName })}`;
        const dirPhrase = (dirMap[locale] ?? dirMap.uk).replace('{direction}', directionName);
        keywords = [...(keywordsBase[locale] ?? keywordsBase.uk), dirPhrase];
    } else {
        const pair = parsePair(slug);
        if (pair && citiesBySlug[pair.from] && citiesBySlug[pair.to]) {
            const supported = ['uk', 'ru', 'en'] as const;
            const lang = (supported as readonly string[]).includes(locale) ? (locale as 'uk' | 'ru' | 'en') : 'uk';
            const fromName = citiesBySlug[pair.from].names[lang];
            const toName = citiesBySlug[pair.to].names[lang];
            title = `${t('meta.pairTitlePrefix', { from: fromName, to: toName })}`;
            description = `${t('meta.pairDescription', { from: fromName, to: toName })}`;
            const pairPhrase = `${fromName} — ${toName}`;
            keywords = [...(keywordsBase[locale] ?? keywordsBase.uk), pairPhrase];
        }
    }
    const ogImage = '/logo.png';
    return {
        title,
        description,
        alternates: { canonical },
        keywords,
        robots: { index: true, follow: true },
        openGraph: {
            title,
            description,
            type: 'article',
            siteName,
            locale: ogLocale,
            url: canonical,
            images: [ogImage]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage]
        }
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const direction = resolveDirectionFromSlug(slug);
    if (!direction) {
        return notFound();
    }
    const t = await getTranslations('booking');
    const tHero = await getTranslations('bookHero');
    const locale = await getLocale();
    const countries = t.raw('suggestions.countries') as string[];
    const nameByCode = (code: 'ukraine' | DirectionId) => {
        const indexMap: Record<'ukraine' | DirectionId, number> = {
            ukraine: 0,
            poland: 1,
            germany: 2,
            netherlands: 3,
            belgium: 4
        };
        return countries[indexMap[code]] ?? '';
    };

    let initialDepartureCountry = nameByCode('ukraine');
    let initialArrivalCountry = nameByCode(direction);
    let initialDepartureCityName = '';
    let initialArrivalCityName = '';

    const pair = parsePair(slug);
    if (pair) {
        const fromCity = citiesBySlug[pair.from];
        const toCity = citiesBySlug[pair.to];
        if (fromCity && toCity) {
            initialDepartureCountry = nameByCode(fromCity.country === 'ukraine' ? 'ukraine' : fromCity.country);
            initialArrivalCountry = nameByCode(toCity.country === 'ukraine' ? 'ukraine' : toCity.country);
            const supported = ['uk', 'ru', 'en'] as const;
            const lang = (supported as readonly string[]).includes(locale) ? (locale as 'uk' | 'ru' | 'en') : 'uk';
            initialDepartureCityName = fromCity.names[lang];
            initialArrivalCityName = toCity.names[lang];
        }
    }
    const siteUrl = 'https://svitsuchasnykhperevezen.com';
    const canonicalUrl = `${siteUrl}/book/${slug}`;
    const serviceName = `${locale === 'en' ? 'Passenger transfers' : locale === 'ru' ? 'Пассажирские перевозки' : 'Пасажирські перевезення'} ${nameByCode('ukraine')} — ${nameByCode(direction)}`;
    // Заголовок: если slug содержит пару городов — показываем города; иначе — страна-направление
    const supported = ['uk', 'ru', 'en'] as const;
    const lang = (supported as readonly string[]).includes(locale) ? (locale as 'uk' | 'ru' | 'en') : 'uk';
    let heroTitle = tHero('title', { from: countries[0], to: nameByCode(direction) });
    if (pair && citiesBySlug[pair.from] && citiesBySlug[pair.to]) {
        const fromName = citiesBySlug[pair.from].names[lang];
        const toName = citiesBySlug[pair.to].names[lang];
        heroTitle = `${fromName} — ${toName}`;
    }

    return (
        <div className="container-custom space-y-12">
            <Script id="book-breadcrumbs-jsonld" type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: locale === 'en' ? 'Home' : locale === 'ru' ? 'Главная' : 'Головна',
                                item: siteUrl
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: heroTitle,
                                item: canonicalUrl
                            }
                        ]
                    })
                }}
            />
            <Script id="book-service-jsonld" type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: serviceName,
                        provider: {
                            '@type': 'Organization',
                            name: 'Світ Сучасних Перевезень',
                            url: siteUrl,
                            logo: `${siteUrl}/logo.png`,
                            telephone: '+380982275197'
                        },
                        areaServed: [nameByCode('ukraine'), nameByCode(direction)],
                        availableChannel: {
                            '@type': 'ServiceChannel',
                            serviceUrl: canonicalUrl
                        }
                    })
                }}
            />
            <BookHero title={heroTitle} subtitle={tHero('subtitle')} />
            <BookingSection
                initialDepartureCountry={initialDepartureCountry}
                initialArrivalCountry={initialArrivalCountry}
                initialDepartureCity={initialDepartureCityName}
                initialArrivalCity={initialArrivalCityName}
            />
            <RoutesSection initialRouteId={direction} />
            <WeOfferSection />
            <AboutRoute direction={direction} />
            {/* <RoadAdvices direction={direction} /> commented out for now */}
            <TransportationRules />
            <TrustSection />
            <BookingSection
                initialDepartureCountry={initialDepartureCountry}
                initialArrivalCountry={initialArrivalCountry}
                initialDepartureCity={initialDepartureCityName}
                initialArrivalCity={initialArrivalCityName}
            />
            <FAQSection direction={direction} />
        </div>
    );
}


