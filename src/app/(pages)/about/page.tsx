import AboutCompany from '@/sections/AboutCompany';
import BookingSection from '@/sections/BookingSection';
import { getTranslations } from 'next-intl/server';
import UsefulSection from '@/sections/UsefulSection';
import AboutGallery from '@/sections/AboutGallery';

export default async function AboutPage() {
    const tBooking = await getTranslations('booking');
    return (
        <main className="container-custom">
            <AboutCompany />
            <AboutGallery />
            <BookingSection title={tBooking('title')} dateInputType="date" />
            <UsefulSection />
        </main>
    );
}


