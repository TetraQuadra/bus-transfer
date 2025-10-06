import { getTranslations } from 'next-intl/server';
import RouteDropdown from '@/components/RouteDropdown';

const PopularRoutesSection = async () => {
    const t = await getTranslations('popularRoutes');
    const countries = t.raw('countries') as string[];
    const cities = t.raw('cities') as string[];

    // Маппинг названий стран на их слаги для всех языков
    const countryMapping: Record<string, 'poland' | 'germany' | 'netherlands' | 'belgium'> = {
        // Украинский
        'Польща': 'poland',
        'Німеччина': 'germany',
        'Нідерланди': 'netherlands',
        'Бельгія': 'belgium',
        // Русский
        'Польша': 'poland',
        'Германия': 'germany',
        'Нидерланды': 'netherlands',
        'Бельгия': 'belgium',
        // Английский
        'Poland': 'poland',
        'Germany': 'germany',
        'Netherlands': 'netherlands',
        'Belgium': 'belgium'
    };
    return (
        <section id="popular" className="w-full mb-15 md:mb-16 max-sm:px-1">
            <div className="">
                <div className="w-full">
                    <h2 className="text-[40px] font-regular text-center text-foreground mb-12">
                        {t('title')}
                    </h2>

                    <div className="grid max-sm:grid-cols-2 max-lg:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {countries.map((country) => (
                            <div key={country} className="flex flex-col">
                                <h3 className="text-[24px] font-medium text-foreground mb-4 max-md:text-[30px]">
                                    {country}
                                </h3>

                                <div className="space-y-[20px]">
                                    {cities.map((city, index) => (
                                        <RouteDropdown
                                            key={index}
                                            city={city}
                                            country={country}
                                            countrySlug={countryMapping[country as keyof typeof countryMapping]}
                                        />
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
