import { getTranslations, getLocale } from 'next-intl/server';
import { ALL_CITIES, UA_CITIES_LIST, DirectionId } from '@/const/cities';
import Image from 'next/image';

type Props = {
    direction: DirectionId;
};

const AboutRoute = async ({ direction }: Props) => {
    const t = await getTranslations('aboutRoute');
    const locale = await getLocale();
    const lang = (['uk', 'ru', 'en'] as const).includes(locale as 'uk' | 'ru' | 'en') ? (locale as 'uk' | 'ru' | 'en') : 'uk';

    const euCities = ALL_CITIES.filter((c) => c.country === direction);
    const countryCase = t(`cases.${direction}`);

    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="w-full mx-auto">
                <h2 className="text-[40px] max-md:text-[26px] font-regular text-foreground mb-4 uppercase">
                    {t('title')}
                </h2>
                <p className="text-[26px] max-md:text-[16px] text-foreground/80 mb-4">{t('question', { country: countryCase })}</p>
                <p className="text-[26px] max-md:text-[16px] text-foreground/80 mb-0">{t('intro1')}</p>
                <p className="text-[26px] max-md:text-[16px] text-foreground/80 mb-8">{t('intro2')}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-[26px] max-md:text-[16px] font-regular text-foreground mb-3">
                            {t('left.title', { country: countryCase })}
                        </h3>
                        <ul className="space-y-2 text-[26px] max-md:text-[16px] text-foreground">
                            {euCities.map((city) => (
                                <li key={`${city.slug}`} className="flex items-center gap-2">
                                    <Image
                                        src="/icons/triangleRight.svg"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="object-contain max-sm:w-[16px] max-sm:h-[16px]"
                                    />
                                    <span>
                                        {city.names[lang]} ({city.names.en})
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[26px] max-md:text-[16px] font-regular text-foreground mb-3">
                            {t('right.title')}
                        </h3>
                        <ul className="space-y-2 text-[26px] max-md:text-[16px] text-foreground">
                            {UA_CITIES_LIST.map((city) => (
                                <li key={`${city.slug}`} className="flex items-center gap-2">
                                    <Image
                                        src="/icons/triangleRight.svg"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="object-contain max-sm:w-[16px] max-sm:h-[16px]"
                                    />
                                    <span>{city.names[lang]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutRoute;


