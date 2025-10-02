import { getTranslations } from 'next-intl/server';

const PetsPricing = async () => {
    const t = await getTranslations('petsPricing');

    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="mx-auto px-4">
                <h2 className="text-[40px] hidden font-regular text-center text-foreground mb-8 max-sm:text-[30px]">
                    {t('title')}
                </h2>
                <div className="">
                    <div className="">
                        <p className="text-[24px] font-normal text-center leading-relaxed">
                            {t('smallAnimal')}
                        </p>
                        <p className="text-[24px] font-normal text-center leading-relaxed">
                            {t('largeAnimal')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PetsPricing;
