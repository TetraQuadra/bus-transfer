'use client'

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';

// TODO: КНОПКА ДЕТАЛЬНІШЕ БУДЕТ ВЕСТИ НА СТРАНИЦУ МАРШРУТА

const routes = [
    {
        id: 'poland',
        name: 'Україна - Польща',
        map: '/main_routes/poland.png',
        info: {
            duration: 'Час поїздки: 12-20 годин',
            price: 'Вартість: 140-190€',
            passengers: 'К-сть пасажирів: 8',
            frequency: 'Зупинки: кожні 3-4 години'
        }
    },
    {
        id: 'germany',
        name: 'Україна - Німеччина',
        map: '/main_routes/germany.png',
        info: {
            duration: 'Час поїздки: 24-30 годин',
            price: 'Вартість: 150-200€',
            passengers: 'К-сть пасажирів: 8',
            frequency: 'Зупинки: кожні 3-4 години'
        }
    },
    {
        id: 'netherlands',
        name: 'Україна - Нідерланди',
        map: '/main_routes/netherlands.png',
        info: {
            duration: 'Час поїздки: 28-36 годин',
            price: 'Вартість: 150-200€',
            passengers: 'К-сть пасажирів: 8',
            frequency: 'Зупинки: кожні 3-4 години'
        }
    },
    {
        id: 'belgium',
        name: 'Україна - Бельгія',
        map: '/main_routes/belgium.png',
        info: {
            duration: 'Час поїздки: 28-36 годин',
            price: 'Вартість: 140-190€',
            passengers: 'К-сть пасажирів: 8',
            frequency: 'Зупинки: кожні 3-4 години'
        }
    }
];

const RoutesSection = () => {
    const [selectedRoute, setSelectedRoute] = useState(routes[0]);

    return (
        <section className="py-16 w-full">
            <div className="">
                <div className="w-full">
                    <div className="flex lg:flex-nowrap gap-8 max-w-7xl mx-auto max-lg:flex-col max-sm:items-center">
                        <div className="flex flex-col lg:max-w-[290px] gap-6 max-lg:w-full max-lg:order-1">
                            <h3 className="text-[34px] font-regular text-foreground mb-4 max-sm:text-[30px] max-sm:mb-2 max-sm:text-center">
                                НАШI МАРШРУТИ
                            </h3>
                            <div className='flex flex-col lg:gap-6 max-sm:mx-auto max-lg:flex-row max-lg:justify-between max-lg:w-full max-lg:gap-3 max-[900px]:grid max-[900px]:grid-cols-2'>
                                {routes.map((route) => (
                                    <Button
                                        key={route.id}
                                        variant={selectedRoute.id === route.id ? 'primary' : 'secondary'}
                                        onClick={() => setSelectedRoute(route)}
                                        className='text-nowrap max-lg:text-[18px] max-lg:flex-1 max-lg:h-[50px] max-sm:text-[14px]'
                                    >
                                        {route.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center justify-center bg-white rounded-[10px] lg:w-[560px] max-lg:w-full max-lg:order-3">
                            <h3 className="text-[26px] font-regular text-foreground mb-4">
                                {selectedRoute.name}
                            </h3>
                            <div className="relative">
                                <Image
                                    src={selectedRoute.map}
                                    alt={`Карта маршруту до ${selectedRoute.name}`}
                                    width={393}
                                    height={291}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <Button className="w-full lg:hidden mt-2 max-lg:order-4">
                            Детальніше
                        </Button>


                        <div className="flex flex-col gap-6 lg:w-[290px] max-lg:w-full max-lg:order-2">
                            <div className='flex flex-col gap-4 bg-white rounded-[10px] px-[16px] py-[30px] max-lg:w-full max-sm:px-2 max-sm:py-2'>
                                <h3 className="text-[24px] font-regular text-foreground mb-1 text-center">
                                    Інформація
                                </h3>

                                <div className='lg:flex lg:flex-col gap-3 max-lg:grid max-lg:grid-cols-2 max-sm:gap-1'>
                                    {[
                                        {
                                            icon: "/icons/money.png",
                                            alt: "Ціна",
                                            width: 36,
                                            height: 36,
                                            value: selectedRoute.info.price
                                        },
                                        {
                                            icon: "/icons/clock.png",
                                            alt: "Час",
                                            width: 42,
                                            height: 42,
                                            value: selectedRoute.info.duration
                                        },
                                        {
                                            icon: "/icons/bus.png",
                                            alt: "Частота",
                                            width: 22,
                                            height: 40,
                                            value: selectedRoute.info.frequency
                                        },
                                        {
                                            icon: "/icons/people.png",
                                            alt: "Пасажири",
                                            width: 40,
                                            height: 28,
                                            value: selectedRoute.info.passengers
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 max-sm:gap-1">
                                            <div className='w-[42px] h-[42px] flex items-center justify-center max-sm:w-[36px] max-sm:h-[36px]'>
                                                <Image
                                                    src={item.icon}
                                                    alt={item.alt}
                                                    width={item.width}
                                                    height={item.height}
                                                    className="object-contain max-sm:scale-75"
                                                />
                                            </div>
                                            <span className="text-foreground max-sm:text-[12px] max-sm:w-[110px]">
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 max-lg:hidden">
                                <Button className="w-full">
                                    Детальніше
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoutesSection;
