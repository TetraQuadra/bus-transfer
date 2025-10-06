'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import { useTranslations } from '@/hooks/useTranslations';


const ROUTES = [
    { id: 'poland', map: '/main_routes/poland.png' },
    { id: 'germany', map: '/main_routes/germany.png' },
    { id: 'netherlands', map: '/main_routes/netherlands.png' },
    { id: 'belgium', map: '/main_routes/belgium.png' },
] as const;

type RoutesSectionProps = {
    initialRouteId?: (typeof ROUTES)[number]['id'];
};

const RoutesSection = ({ initialRouteId }: RoutesSectionProps) => {
    const t = useTranslations('routesSection');
    const [selectedRouteId, setSelectedRouteId] = useState<(typeof ROUTES)[number]['id']>(initialRouteId ?? ROUTES[0].id);

    useEffect(() => {
        if (initialRouteId) {
            setSelectedRouteId(initialRouteId);
        }
    }, [initialRouteId]);

    return (
        <section id="routes" className="w-full mb-15 md:mb-16">
            <div className="">
                <div className="w-full">
                    <div className="flex lg:flex-nowrap gap-8 max-w-7xl mx-auto max-lg:flex-col max-sm:items-center">
                        <div className="flex flex-col lg:max-w-[290px] gap-6 max-lg:w-full max-lg:order-1">
                            <h3 className="text-[34px] font-regular text-foreground mb-4 max-sm:text-[30px] max-sm:mb-2 max-lg:text-center">
                                {t('title')}
                            </h3>
                            <div className='flex flex-col lg:gap-6 max-sm:mx-auto max-lg:flex-row max-lg:justify-between max-lg:w-full max-lg:gap-3 max-[900px]:grid max-[900px]:grid-cols-2'>
                                {ROUTES.map((route) => (
                                    <Button
                                        key={route.id}
                                        variant={selectedRouteId === route.id ? 'primary' : 'secondary'}
                                        onClick={() => setSelectedRouteId(route.id)}
                                        className='text-nowrap max-lg:text-[18px] max-lg:flex-1 max-lg:h-[50px] max-sm:text-[14px]'
                                    >
                                        {t(`routes.${route.id}.name`)}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center justify-center bg-white rounded-[10px] lg:w-[560px] max-lg:w-full max-lg:order-3">
                            <h3 className="text-[26px] font-regular text-foreground mb-4">
                                {t(`routes.${selectedRouteId}.name`)}
                            </h3>
                            <div className="relative">
                                <Image
                                    src={ROUTES.find(r => r.id === selectedRouteId)!.map}
                                    alt={t('mapAlt', { name: t(`routes.${selectedRouteId}.name`) })}
                                    width={393}
                                    height={291}
                                    quality={100}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <Button as="link" href={`/book/${selectedRouteId}`} className="w-full lg:hidden mt-2 max-lg:order-4">
                            {t('more')}
                        </Button>


                        <div className="flex flex-col gap-6 lg:w-[290px] max-lg:w-full max-lg:order-2">
                            <div className='flex flex-col gap-4 bg-white rounded-[10px] px-[16px] py-[30px] max-lg:w-full max-sm:px-2 max-sm:py-2'>
                                <h3 className="text-[24px] font-regular text-foreground mb-1 text-center">
                                    {t('infoTitle')}
                                </h3>

                                <div className='lg:flex lg:flex-col gap-3 max-lg:grid max-lg:grid-cols-2 max-sm:gap-1'>
                                    {[
                                        {
                                            icon: "/icons/money.png",
                                            alt: t('alt.price'),
                                            width: 36,
                                            height: 36,
                                            value: t(`routes.${selectedRouteId}.info.price`),
                                            note: t('bookingNote')
                                        },
                                        {
                                            icon: "/icons/clock.png",
                                            alt: t('alt.time'),
                                            width: 42,
                                            height: 42,
                                            value: t(`routes.${selectedRouteId}.info.duration`)
                                        },
                                        {
                                            icon: "/icons/bus.png",
                                            alt: t('alt.frequency'),
                                            width: 22,
                                            height: 40,
                                            value: t(`routes.${selectedRouteId}.info.frequency`)
                                        },
                                        {
                                            icon: "/icons/people.png",
                                            alt: t('alt.passengers'),
                                            width: 40,
                                            height: 28,
                                            value: t(`routes.${selectedRouteId}.info.passengers`)
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 max-sm:gap-1">
                                            <div className='w-[42px] h-[42px] flex items-center justify-center max-sm:w-[36px] max-sm:h-[36px] flex-shrink-0'>
                                                <Image
                                                    src={item.icon}
                                                    alt={item.alt}
                                                    width={item.width}
                                                    height={item.height}
                                                    quality={100}
                                                    className="object-contain max-sm:scale-75 w-full h-full"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-foreground max-sm:text-[12px] max-sm:w-[110px]">
                                                    {item.value}
                                                </span>
                                                {item.note && (
                                                    <span className="text-gray-500 text-sm max-sm:text-[10px]">
                                                        {item.note}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 max-lg:hidden">
                                <Button as="link" href={`/book/${selectedRouteId}`} className="w-full">
                                    {t('more')}
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
