import HowWeWorkSection from "@/sections/HowWeWorkSection";
import PetsComfort from "@/sections/PetsComfort";
import PetsRules from "@/sections/PetsRules";
import PetsSecurity from "@/sections/PetsSecurity";
import PetsServiceAdvantages from "@/sections/PetsServiceAdvantages";
import PetsTitle from "../../../sections/PetsTitle";
import { getTranslations } from "next-intl/server";
import BookingSection from "@/sections/BookingSection";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('pets.meta');

    const title = t('title');
    const description = t('description');

    // Генерируем keywords массив из отдельных объектов
    const keywords = [
        t('keywords.0'),
        t('keywords.1'),
        t('keywords.2'),
        t('keywords.3'),
        t('keywords.4'),
        t('keywords.5'),
        t('keywords.6'),
        t('keywords.7')
    ];

    return {
        title,
        description,
        keywords,
        robots: {
            index: true,
            follow: true
        },
        openGraph: {
            title,
            description,
            type: 'website',
            images: ['/logo.png']
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/logo.png']
        }
    };
}

export default async function PetsPage() {
    const t = await getTranslations('pets');
    const tBooking = await getTranslations('booking');
    return (
        <main className="w-full">
            <div className="w-full">
                <PetsTitle title={t('title')} subtitle={t('subtitle')} />
                <PetsServiceAdvantages />
                <PetsSecurity />
                <PetsComfort />
                <PetsRules />
                <BookingSection title={tBooking('bookSeatTitle')} dateInputType="text" mode="pets" />
                <HowWeWorkSection />
            </div>
        </main>
    );
}


