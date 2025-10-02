import { getTranslations } from 'next-intl/server';

const ParcelsAdditionalInfo = async () => {
    const t = await getTranslations('parcelsAdditionalInfo');

    return (
        <section className="w-full mb-15 md:mb-16">
            <div className=" mx-auto px-4">
                <div className="space-y-4">
                    <p className="text-[18px] text-foreground leading-relaxed font-semibold">
                        {t('minimumCost')}
                    </p>
                    <p className="text-[18px] font-normal text-foreground leading-relaxed">
                        {t('rules')}
                    </p>
                    <p className="text-[18px] font-normal text-foreground leading-relaxed">
                        {t('deliveryTime')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ParcelsAdditionalInfo;
