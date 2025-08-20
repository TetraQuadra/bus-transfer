import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

// TODO: ВОЗМОЖНО КЛИКАБЕЛЬНЫЕ ССЫЛКИ НА МАРШРУТЫ

const PopularRoutesSection = async () => {
    const t = await getTranslations('popularRoutes');
    const countries = t.raw('countries') as string[];
    const cities = t.raw('cities') as string[];
    return (
        <section id="popular" className="w-full mb-8 md:mb-16 max-sm:px-1">
            <div className="">
                <div className="w-full">
                    <h2 className="text-[40px] font-regular text-center text-foreground mb-12">
                        {t('title')}
                    </h2>

                    <div className="grid max-sm:grid-cols-2 max-lg:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {countries.map((country) => (
                            <div key={country} className="flex flex-col">
                                <h3 className="text-[24px] font-medium text-foreground mb-4">
                                    {country}
                                </h3>

                                <div className="space-y-[20px]">
                                    {cities.map((city, index) => (
                                        <div key={index} className="flex items-center gap-2 max-sm:gap-1">
                                            <Image
                                                src="/icons/triangleRight.svg"
                                                alt=""
                                                width={20}
                                                height={20}
                                                className="object-contain max-sm:w-[16px] max-sm:h-[16px]"
                                            />
                                            <span className="text-[16px] font-regular text-foreground max-sm:text-[12px]">
                                                {city} - {country}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularRoutesSection;
