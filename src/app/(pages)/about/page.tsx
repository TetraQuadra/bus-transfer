import AboutCompany from '@/sections/AboutCompany';
import BookingSection from '@/sections/BookingSection';
import UsefulSection from '@/sections/UsefulSection';
import AboutGallery from '@/sections/AboutGallery';

export default function AboutPage() {
    return (
        <main className="container-custom">
            <AboutCompany />
            <AboutGallery />
            <BookingSection />
            <UsefulSection />
        </main>
    );
}


