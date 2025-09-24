import { useTranslations } from '@/hooks/useTranslations';

const PetsSecurity = () => {
    const t = useTranslations('petsSecurity');
    console.log(t('title'));
    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="w-full mx-auto">
                <h2 className="text-[40px] max-md:text-[26px] font-regular text-foreground mb-4 uppercase text-center">{t('title')}</h2>
                <p className="text-[22px] max-md:text-[17px] text-foreground/80">{t('text')}</p>
            </div>
        </section>
    );
};

export default PetsSecurity;


