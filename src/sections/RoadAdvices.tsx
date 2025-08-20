import { getTranslations } from 'next-intl/server';
import { DirectionId } from '@/const/cities';

type Props = { direction: DirectionId };

const RoadAdvices = async ({ direction }: Props) => {
    const t = await getTranslations('roadAdvices');
    const aboutT = await getTranslations('aboutRoute');
    const countryCase = aboutT(`cases.${direction}`);
    return (
        <section className="w-full mb-8 md:mb-16">
            <div className="w-full mx-auto">
                <h2 className="text-[40px] max-md:text-[26px] font-regular text-foreground mb-4 uppercase">
                    {t('title', { country: countryCase })}
                </h2>
                <p className="text-[26px] max-md:text-[16px] text-foreground/80 mb-6">
                    {t('intro', { country: countryCase })}
                </p>

                <div className="flex flex-col gap-12">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i}>
                            <h3 className="text-[26px] max-md:text-[16px] font-medium text-foreground mb-4">{t(`items.${i}.title`)}</h3>
                            <p className="text-[26px] max-md:text-[16px] text-foreground/80">{t(`items.${i}.text`)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoadAdvices;


