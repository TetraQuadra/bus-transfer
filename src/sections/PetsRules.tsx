import { useTranslations } from '@/hooks/useTranslations';
import InfoCardGrid, { InfoCardItem } from '@/components/InfoCardGrid';

const PetsRules = () => {
    const t = useTranslations('petsRules');
    const items: InfoCardItem[] = [1, 2, 3, 4].map((i) => ({
        id: i,
        imageSrc: `/pets/rules/${i}.png`,
        title: t(`items.${i}.title`),
        description: t(`items.${i}.description`)
    }));
    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="w-full mx-auto">
                <h2 className="text-[32px] md:text-[36px] font-regular text-foreground mb-6 text-center uppercase">{t('title')}</h2>
                <p className="text-center text-[16px] md:text-[18px] text-foreground/70 mb-6">{t('subtitle')}</p>
                <InfoCardGrid items={items} />
            </div>
        </section>
    );
};

export default PetsRules;


