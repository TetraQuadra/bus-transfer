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
import RoutesSection from "@/sections/RoutesSection";

export default function HomePage() {
    return (
        <main>
            <Hero />
            <BookingSection />
            <WeOfferSection />
            <RoutesSection />
            <BenefitsSection />
            <PopularRoutesSection />
            <BookingSection />
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
