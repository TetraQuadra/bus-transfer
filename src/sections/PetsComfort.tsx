import { useTranslations } from '@/hooks/useTranslations';
import InfoCardGrid, { InfoCardItem } from '@/components/InfoCardGrid';

const PetsComfort = () => {
    const t = useTranslations('petsComfort');
    const items: InfoCardItem[] = [1, 2, 3, 4].map((i) => ({
        id: i,
        imageSrc: `/pets/comfort/${i}.png`,
        title: t(`items.${i}.title`),
        description: t(`items.${i}.description`)
    }));
    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="w-full mx-auto">
                <h2 className="text-[32px] md:text-[36px] font-regular text-foreground mb-6 text-center uppercase">{t('title')}</h2>
                <InfoCardGrid items={items} />
            </div>
        </section>
    );
};

export default PetsComfort;


