import { notFound } from 'next/navigation';
import BookingSection from '@/sections/BookingSection';
import RoutesSection from '@/sections/RoutesSection';
import TrustSection from '@/sections/TrustSection';
import FAQSection from '@/sections/FAQSection';
import AboutRoute from '@/sections/AboutRoute';
import BookHero from '@/sections/BookHero';
import { DirectionId, EU_COUNTRIES, UA_CITIES_LIST, EU_CITIES_LIST, citiesBySlug, getDirectionByCity } from '@/const/cities';
import { getTranslations, getLocale } from 'next-intl/server';
import RoadAdvices from '@/sections/RoadAdvices';
import WeOfferSection from '@/sections/WeOfferSection';

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

export async function generateMetadata({ params }: Props) {
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

    if (isDirectionSlug(slug)) {
        const directionName = nameByCode(slug);
        title = `${t('meta.directionTitlePrefix', { direction: directionName })}`;
        description = `${t('meta.directionDescription', { direction: directionName })}`;
    } else {
        const pair = parsePair(slug);
        if (pair && citiesBySlug[pair.from] && citiesBySlug[pair.to]) {
            const supported = ['uk', 'ru', 'en'] as const;
            const lang = (supported as readonly string[]).includes(locale) ? (locale as 'uk' | 'ru' | 'en') : 'uk';
            const fromName = citiesBySlug[pair.from].names[lang];
            const toName = citiesBySlug[pair.to].names[lang];
            title = `${t('meta.pairTitlePrefix', { from: fromName, to: toName })}`;
            description = `${t('meta.pairDescription', { from: fromName, to: toName })}`;
        }
    }
    return { title, description };
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
    return (
        <div className="space-y-12">
            <BookHero title={tHero('title', { from: countries[0], to: nameByCode(direction) })} subtitle={tHero('subtitle')} />
            <BookingSection
                initialDepartureCountry={initialDepartureCountry}
                initialArrivalCountry={initialArrivalCountry}
                initialDepartureCity={initialDepartureCityName}
                initialArrivalCity={initialArrivalCityName}
            />
            <RoutesSection initialRouteId={direction} />
            <WeOfferSection />
            <AboutRoute direction={direction} />
            <RoadAdvices direction={direction} />
            <TrustSection />
            <BookingSection
                initialDepartureCountry={initialDepartureCountry}
                initialArrivalCountry={initialArrivalCountry}
                initialDepartureCity={initialDepartureCityName}
                initialArrivalCity={initialArrivalCityName}
            />
            <FAQSection />
        </div>
    );
}


