import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ParcelTitle from '@/sections/ParcelTitle';
import ParcelAdvantages from '@/sections/ParcelAdvantages';
import ParcelRules from '@/sections/ParcelRules';
import ParcelInfo from '@/sections/ParcelInfo';
import BookingSection from '@/sections/BookingSection';
import HowWeWorkSection from '@/sections/HowWeWorkSection';
import ParcelsAdditionalInfo from '@/sections/ParcelsAdditionalInfo';

type DirectionId = 'poland' | 'germany' | 'belgium' | 'netherlands';

const validCountries: DirectionId[] = ['poland', 'germany', 'belgium', 'netherlands'];

function isValidCountrySlug(slug: string): slug is DirectionId {
    return validCountries.includes(slug as DirectionId);
}

export async function generateStaticParams() {
    return validCountries.map((slug) => ({
        slug
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    if (!isValidCountrySlug(slug)) {
        return {};
    }

    const t = await getTranslations('parcels.meta');
    const tCountry = await getTranslations(`parcels.countries.${slug}`);

    const title = t('title', { country: tCountry('name') });
    const description = t('description', { country: tCountry('name') });

    const countryName = tCountry('name');
    const keywords = [
        t('keywords.0'),
        t('keywords.1', { country: countryName }),
        t('keywords.2'),
        t('keywords.3'),
        t('keywords.4'),
        t('keywords.5')
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
            images: ['/logo.png'],
            url: `/parcels/${slug}`
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/logo.png']
        },
        alternates: {
            canonical: `/parcels/${slug}`
        }
    };
}

export default async function ParcelsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (!isValidCountrySlug(slug)) {
        notFound();
    }

    const t = await getTranslations('parcels');
    const tCountry = await getTranslations(`parcels.countries.${slug}`);
    const tBooking = await getTranslations('booking');

    console.log(tCountry('s'));

    return (
        <main className="w-full">
            <div className="w-full">
                <ParcelTitle
                    title={t('title')}
                    subtitle={t('subtitle', { country: tCountry('accusative') })}
                />
                <ParcelAdvantages />
                <ParcelRules country={tCountry('name')} />
                <HowWeWorkSection translationKey="howWeWorkParcels" />
                <ParcelsAdditionalInfo />
                <BookingSection
                    title={tBooking('bookSeatTitle')}
                    dateInputType="text"
                    mode="parcel"
                />
                <ParcelInfo country={tCountry('name')} countryNominative={tCountry('nominative')} countryVerb={tCountry('verb')} />
            </div>
        </main>
    );
}
