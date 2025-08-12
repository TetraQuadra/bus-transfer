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
                    <div className="flex lg:flex-nowrap gap-8 max-w-7xl mx-auto">
                        <div className="flex flex-col max-w-[290px] gap-6">
                            <h3 className="text-[34px] font-regular text-foreground mb-4">
                                НАШI МАРШРУТИ
                            </h3>
                            {routes.map((route) => (
                                <Button
                                    key={route.id}
                                    variant={selectedRoute.id === route.id ? 'primary' : 'secondary'}
                                    onClick={() => setSelectedRoute(route)}
                                    className='text-nowrap'
                                >
                                    {route.name}
                                </Button>
                            ))}
                        </div>

                        <div className="flex flex-col gap-4 items-center justify-center bg-white rounded-[10px] lg:w-[560px]">
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

                        <div className="flex flex-col gap-6 lg:w-[290px]">
                            <div className='flex flex-col gap-4 bg-white rounded-[10px] px-[16px] py-[30px]'>
                                <h3 className="text-[24px] font-regular text-foreground mb-1 text-center">
                                    Інформація
                                </h3>

                                <div className="flex items-center gap-3">
                                    <div className='w-[42px] h-[42px] flex items-center justify-center'>
                                        <Image
                                            src="/icons/money.png"
                                            alt="Ціна"
                                            width={36}
                                            height={36}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-foreground">
                                        {selectedRoute.info.price}
                                    </span>
                                </div>


                                <div className="flex items-center gap-3">
                                    <div className='w-[42px] h-[42px] flex items-center justify-center'>
                                        <Image
                                            src="/icons/clock.png"
                                            alt="Час"
                                            width={42}
                                            height={42}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-foreground">
                                        {selectedRoute.info.duration}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className='w-[42px] h-[42px] flex items-center justify-center'>
                                        <Image
                                            src="/icons/bus.png"
                                            alt="Частота"
                                            width={22}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-foreground">
                                        {selectedRoute.info.frequency}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className='w-[42px] h-[42px] flex items-center justify-center'>
                                        <Image
                                            src="/icons/people.png"
                                            alt="Пасажири"
                                            width={40}
                                            height={28}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-foreground">
                                        {selectedRoute.info.passengers}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
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
