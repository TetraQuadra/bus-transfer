import HowWeWorkSection from "@/sections/HowWeWorkSection";
import PetsComfort from "@/sections/PetsComfort";
import PetsRules from "@/sections/PetsRules";
import PetsSecurity from "@/sections/PetsSecurity";
import PetsServiceAdvantages from "@/sections/PetsServiceAdvantages";
import PetsTitle from "../../../sections/PetsTitle";
import { getTranslations } from "next-intl/server";
import BookingSection from "@/sections/BookingSection";


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


