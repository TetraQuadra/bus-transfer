

import Hero from "@/sections/Hero";
import BookingSection from "@/sections/BookingSection";
import WeOfferSection from "@/sections/WeOfferSection";
import RoutesSection from "@/sections/RoutesSection";
import BenefitsSection from "@/sections/BenefitsSection";
import PopularRoutesSection from "@/sections/PopularRoutesSection";
import Autopark from "@/sections/Autopark";
import AdvantagesSection from "@/sections/AdvantagesSection";
import TrustSection from "@/sections/TrustSection";
import HowWeWorkSection from "@/sections/HowWeWorkSection";
import ReviewsSection from "@/sections/ReviewsSection";

export default function Home() {
    return (
        <main className="min-h-[500vh] bg-background">
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
        </main>
    );
}
