'use client'

import Image from 'next/image';

// TODO: ВОЗМОЖНО КЛИКАБЕЛЬНЫЕ ССЫЛКИ НА МАРШРУТЫ

export const POPULAR_ROUTES = {
    title: "ПОПУЛЯРНІ НАПРЯМКИ",
    countries: [
        "Польща",
        "Німеччина",
        "Нідерланди",
        "Бельгія",
    ],
    cities: ["Умань", "Біла Церква", "Київ", "Житомир", "Вінниця", "Хмельницький", "Тернопіль", "Львів", "Рівне", "Луцьк", "Звигель"
    ]
};


const PopularRoutesSection = () => {
    return (
        <section className="py-16 w-full">
            <div className="">
                <div className="w-full">
                    <h2 className="text-[40px] font-regular text-center text-foreground mb-12">
                        {POPULAR_ROUTES.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {POPULAR_ROUTES.countries.map((country) => (
                            <div key={country} className="flex flex-col">
                                <h3 className="text-[24px] font-medium text-foreground mb-4">
                                    {country}
                                </h3>

                                <div className="space-y-[20px]">
                                    {POPULAR_ROUTES.cities.map((city, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Image
                                                src="/icons/triangleRight.svg"
                                                alt=""
                                                width={20}
                                                height={20}
                                                className="object-contain"
                                            />
                                            <span className="text-[16px] font-regular text-foreground">
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
