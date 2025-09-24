import { getTranslations } from 'next-intl/server';

const TransportationRules = async () => {
    const t = await getTranslations('transportRules');

    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="w-full mx-auto">
                <h2 className="text-[40px] max-md:text-[26px] font-regular text-foreground mb-4 uppercase">
                    {t('allowed.title')}
                </h2>

                <div className="flex flex-col gap-8">
                    <div>
                        <h3 className="text-[26px] max-md:text-[16px] font-medium text-foreground mb-3">
                            {t('allowed.food.title')}
                        </h3>
                        <ul className="list-disc pl-6 text-[26px] max-md:text-[16px] text-foreground/80 space-y-1">
                            {t.raw('allowed.food.items').map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[26px] max-md:text-[16px] font-medium text-foreground mb-3">
                            {t('allowed.personal.title')}
                        </h3>
                        <ul className="list-disc pl-6 text-[26px] max-md:text-[16px] text-foreground/80 space-y-1">
                            {t.raw('allowed.personal.items').map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[26px] max-md:text-[16px] font-medium text-foreground mb-3">
                            {t('allowed.medicines.title')}
                        </h3>
                        <ul className="list-disc pl-6 text-[26px] max-md:text-[16px] text-foreground/80 space-y-1">
                            {t.raw('allowed.medicines.items').map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[26px] max-md:text-[16px] font-medium text-foreground mb-3">
                            {t('allowed.pets.title')}
                        </h3>
                        <p className="text-[26px] max-md:text-[16px] text-foreground/80">
                            {t('allowed.pets.text.beforeLink')}{' '}
                            <a className="underline text-blue-500" href={t('allowed.pets.text.linkHref')}>{t('allowed.pets.text.linkText')}</a>
                        </p>
                    </div>
                </div>

                <h2 className="text-[40px] max-md:text-[26px] font-regular text-foreground mt-12 mb-4 uppercase">
                    {t('restricted.title')}
                </h2>

                <div className="flex flex-col gap-8">
                    <div>
                        <h3 className="text-[26px] max-md:text-[16px] font-medium text-foreground mb-3">
                            {t('restricted.food.title')}
                        </h3>
                        <ul className="list-disc pl-6 text-[26px] max-md:text-[16px] text-foreground/80 space-y-1">
                            {t.raw('restricted.food.items').map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[26px] max-md:text-[16px] font-medium text-foreground mb-3">
                            {t('restricted.other.title')}
                        </h3>
                        <ul className="list-disc pl-6 text-[26px] max-md:text-[16px] text-foreground/80 space-y-1">
                            {t.raw('restricted.other.items').map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <h2 className="text-[40px] max-md:text-[26px] font-regular text-foreground mt-12 mb-4 uppercase">
                    {t('limits.title')}
                </h2>

                <div className="flex flex-col gap-8">
                    <div>
                        <ul className="list-disc pl-6 text-[26px] max-md:text-[16px] text-foreground/80 space-y-1">
                            {t.raw('limits.items').map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TransportationRules;


