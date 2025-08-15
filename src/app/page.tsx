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

export default function HomePage() {
    return (
        <main>
            <Hero />
            <PopularRoutesSection />
            <WeOfferSection />
            <HowWeWorkSection />
            <Autopark />
            <AdvantagesSection />
            <BenefitsSection />
            <TrustSection />
            <ReviewsSection />
            <FAQSection />
            <UsefulSection />
            <BookingSection />
        </main>
    );
}
