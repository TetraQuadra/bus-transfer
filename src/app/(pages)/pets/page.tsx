import HowWeWorkSection from "@/sections/HowWeWorkSection";
import PetsComfort from "@/sections/PetsComfort";
import PetsRules from "@/sections/PetsRules";
import PetsSecurity from "@/sections/PetsSecurity";
import PetsServiceAdvantages from "@/sections/PetsServiceAdvantages";
import PetsTitle from "@/sections/PetsTitle";
import { getTranslations } from "next-intl/server";


export default async function PetsPage() {
    const t = await getTranslations('pets');
    return (
        <main className="w-full">
            <div className="w-full">
                <PetsTitle title={t('title')} subtitle={t('subtitle')} />
                <PetsServiceAdvantages />
                <PetsSecurity />
                <PetsComfort />
                <PetsRules />
                <HowWeWorkSection />
            </div>
        </main>
    );
}


