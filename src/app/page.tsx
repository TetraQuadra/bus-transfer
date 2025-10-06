import Hero from "@/sections/Hero";
import PopularRoutesSection from "@/sections/PopularRoutesSection";
import WeOfferSection from "@/sections/WeOfferSection";
import HowWeWorkSection from "@/sections/HowWeWorkSection";
import Autopark from "@/sections/Autopark";
import AdvantagesSection from "@/sections/AdvantagesSection";
import BenefitsSection from "@/sections/BenefitsSection";
import TrustSection from "@/sections/TrustSection";
import ReviewsSection from "@/sections/ReviewsSection";
import FAQSection from "@/sections/FAQSection";
import UsefulSection from "@/sections/UsefulSection";
import BookingSection from "@/sections/BookingSection";
import { getTranslations } from 'next-intl/server';
import RoutesSection from "@/sections/RoutesSection";
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();

    const titles: Record<string, string> = {
        uk: 'Світ Сучасних Перевезень',
        ru: 'Світ Сучасних Перевезень',
        en: 'World of Modern Transportation'
    };

    const descriptions: Record<string, string> = {
        uk: 'Міжнародні пасажирські перевезення Україна — Європа (Польща, Німеччина, Нідерланди, Бельгія). Перевезення пасажирів, посилок і домашніх тварин. Комфортні мікроавтобуси, безпечно та вчасно. Бронювання онлайн.',
        ru: 'Международные пассажирские перевозки Украина — Европа (Польша, Германия, Нидерланды, Бельгия). Перевозка пассажиров, посылок и домашних животных. Комфортные микроавтобусы, безопасно и вовремя. Бронирование онлайн.',
        en: 'International passenger transfers Ukraine — Europe (Poland, Germany, Netherlands, Belgium). Passenger, parcel and pet transportation. Comfortable minibuses, safe and on time. Book online.'
    };

    const currentTitle = titles[locale] ?? titles.uk;
    const currentDescription = descriptions[locale] ?? descriptions.uk;

    return {
        title: currentTitle,
        description: currentDescription,
        robots: {
            index: true,
            follow: true
        },
        alternates: {
            canonical: '/'
        },
        openGraph: {
            title: currentTitle,
            description: currentDescription,
            type: 'website',
            images: ['/logo.png'],
            locale: locale === 'uk' ? 'uk_UA' : locale === 'ru' ? 'ru_RU' : 'en_US'
        },
        twitter: {
            card: 'summary_large_image',
            title: currentTitle,
            description: currentDescription,
            images: ['/logo.png']
        }
    };
}

export default async function HomePage() {
    const tBooking = await getTranslations('booking');
    return (
        <main>
            <Hero />
            <BookingSection title={tBooking('title')} dateInputType="date" />
            <WeOfferSection />
            <RoutesSection />
            <BenefitsSection />
            <PopularRoutesSection />
            <BookingSection title={tBooking('title')} dateInputType="date" />
            <Autopark />
            <AdvantagesSection />
            <ReviewsSection />
            <TrustSection />
            <HowWeWorkSection />
            <FAQSection />
            <UsefulSection />
        </main>
    );
}
