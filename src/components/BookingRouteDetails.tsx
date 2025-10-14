'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { getPriceByRoute } from '@/lib/priceClient';
import { PriceResult } from '@/lib/prices';
import { findCityByName, DirectionId, citiesBySlug, getDirectionByCity } from '@/const/cities';
import CompactGallery from './CompactGallery';
import { SwiperSlide } from 'swiper/react';
import { useOptionalBookingContext } from '@/contexts/BookingContext';

interface BookingRouteDetailsProps {
    routeSlug: string;
}

type ServiceClass = 'comfort' | 'luxury';

function isDirectionSlug(slug: string): slug is DirectionId {
    const EU_COUNTRIES = ['poland', 'germany', 'netherlands', 'belgium'] as const;
    return (EU_COUNTRIES as readonly string[]).includes(slug);
}

function parsePair(slug: string): { from: string; to: string } | null {
    const parts = slug.split('-');
    const [a, b] = parts;
    if (!a || !b) return null;
    return { from: a, to: b };
}

function resolveDirectionFromSlug(slug: string): DirectionId | null {
    if (isDirectionSlug(slug)) return slug;
    const pair = parsePair(slug);
    if (!pair) return null;
    const fromCity = citiesBySlug[pair.from];
    const toCity = citiesBySlug[pair.to];
    if (!fromCity || !toCity) return null;
    // определить направление как неукраинская сторона
    const nonUaCity = fromCity.country === 'ukraine' ? toCity : fromCity;
    const dir = getDirectionByCity(nonUaCity);
    return dir ?? null;
}

export default function BookingRouteDetails({ routeSlug }: BookingRouteDetailsProps) {
    const t = useTranslations('booking.bookingRoute');
    const tRoutes = useTranslations('routesSection');
    const locale = useLocale();
    const context = useOptionalBookingContext();
    const selectedRoute = context?.selectedRoute;
    const lastValidRoute = context?.lastValidRoute;
    const [serviceClass, setServiceClass] = useState<ServiceClass>('comfort');
    const [priceData, setPriceData] = useState<PriceResult | null>(null);
    const [loading, setLoading] = useState(true);

    const routeToUse = useMemo(() => {
        return selectedRoute || lastValidRoute;
    }, [selectedRoute, lastValidRoute]);

    const targetRouteSlug = useMemo(() => {
        if (routeToUse && (!routeSlug.includes('-') || routeSlug.split('-').length !== 2)) {
            return `${routeToUse.fromCity.slug}-${routeToUse.toCity.slug}`;
        }
        return routeSlug;
    }, [routeSlug, routeToUse]);

    const direction = useMemo(() => {
        return resolveDirectionFromSlug(targetRouteSlug);
    }, [targetRouteSlug]);

    useEffect(() => {
        async function fetchPrice() {
            try {
                const price = await getPriceByRoute(targetRouteSlug);
                setPriceData(price);
            } catch (error) {
                console.error('Error fetching price:', error);
                setPriceData(null);
            } finally {
                setLoading(false);
            }
        }

        fetchPrice();
    }, [targetRouteSlug, routeToUse]);

    if (!routeSlug || typeof routeSlug !== 'string') {
        return (
            <div className="p-8 mb-15 md:mb-16">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 shadow-lg">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-red-800 mb-2">
                            {t('routeNotFound')}
                        </h3>
                        <p className="text-red-600">Invalid route slug</p>
                    </div>
                </div>
            </div>
        );
    }

    const [fromSlug, toSlug] = routeSlug.split('-');
    const fromCity = findCityByName(fromSlug);
    const toCity = findCityByName(toSlug);

    if ((!fromCity || !toCity) && !selectedRoute) {
        return (
            <div className="p-8">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            {t('selectRoute')}
                        </h3>
                        <p className="text-gray-500">
                            {t('selectRouteDescription')}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const getCityName = (city: typeof fromCity) => {
        if (!city) return '';
        switch (locale) {
            case 'uk': return city.names.uk;
            case 'ru': return city.names.ru;
            case 'en': return city.names.en;
            default: return city.names.uk;
        }
    };

    const displayFromCity = routeToUse?.fromCity || fromCity;
    const displayToCity = routeToUse?.toCity || toCity;
    const currentPrice = serviceClass === 'comfort' ? priceData?.comfort : priceData?.luxury;
    const images = Array.from({ length: 5 }, (_, i) => `/booking/${serviceClass}/${i + 1}.png`);

    if (!displayFromCity || !displayToCity) {
        return (
            <div className="p-8">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            {t('selectRoute')}
                        </h3>
                        <p className="text-gray-500">
                            {t('selectRouteDescription')}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="gap-4 flex flex-col xl:flex-row max-md:p-0 xl:h-[405px] mb-15 md:mb-16">
            <div className="flex flex-col gap-8 xl:min-w-[290px] xl:justify-between">
                <div className="">
                    <h2 className="text-[48px] font-regular text-gray-800 mb-4">
                        {t('route')}
                    </h2>
                    <div className="text-[48px] font-bold text-gray-900 uppercase leading-[48px] xl:leading-[30px] xl:text-[30px]">
                        {getCityName(displayFromCity)} - {getCityName(displayToCity)}
                    </div>
                </div>

                <div className="space-y-3 max-xl:flex max-xl:space-y-0 max-xl:gap-1">
                    <button
                        onClick={() => setServiceClass('luxury')}
                        className={`w-full text-[25px] p-4 rounded-lg  transition-all ${serviceClass === 'luxury'
                            ? ' bg-[var(--color-primary)] text-white'
                            : ' bg-white text-foreground'
                            }`}
                    >
                        <div className="text-[25px]">{t('luxury')}</div>
                    </button>
                    <button
                        onClick={() => setServiceClass('comfort')}
                        className={`w-full  p-4 rounded-lg transition-all ${serviceClass === 'comfort'
                            ? 'bg-[var(--color-primary)] text-white'
                            : ' bg-white text-foreground'
                            }`}
                    >
                        <div className="text-[25px]">{t('comfort')}</div>
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-4 max-xl:justify-center lg:flex-row'>
                <div className="w-full lg:w-6/10 xl:w-[577px] bg-white rounded-2xl p-0 pt-4 shadow-lg">
                    <CompactGallery slidesPerView={{ mobile: 2, tablet: 3, desktop: 3 }} showPagination loop autoplay spaceBetween={12} className='max-xl:h-[306px]'>
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-full flex justify-center">
                                    <img src={image} alt="about" width={150} height={200} className="object-cover rounded-xl h-[207px] w-[155px] xl:h-[240px] xl:w-[180px]" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </CompactGallery>
                </div>

                <div className="w-full lg:w-80 xl:w-[290px] lg:flex-shrink-0 bg-white rounded-2xl p-4 shadow-lg">
                    <h3 className="text-[26px] font-regular mb-6 text-center">
                        {t('information')}
                    </h3>

                    <div className='lg:flex lg:flex-col gap-4 max-lg:grid max-lg:grid-cols-2 max-sm:gap-4 max-sm:grid-cols-1'>
                        {[
                            {
                                icon: "/icons/money.png",
                                alt: "Цена",
                                width: 36,
                                height: 36,
                                value: loading ? '...' : t('cost', { price: currentPrice }),
                                note: t('bookingNote')
                            },
                            {
                                icon: "/icons/clock.png",
                                alt: "Время",
                                width: 42,
                                height: 42,
                                value: direction ? tRoutes(`routes.${direction}.info.duration`) : t('travelTime'),
                                note: t('durationNote')
                            },
                            {
                                icon: "/icons/bus.png",
                                alt: "Частота",
                                width: 22,
                                height: 40,
                                value: t('stops'),
                                note: t('frequencyNote')
                            },
                            {
                                icon: "/icons/people.png",
                                alt: "Пассажиры",
                                width: 40,
                                height: 28,
                                value: t('passengers')
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 max-sm:gap-1">
                                <div className='w-[42px] h-[42px] flex items-center justify-center max-sm:w-[42px] max-sm:h-[42px] flex-shrink-0'>
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
                                    <div className="">
                                        <span className="text-foreground text-[16px] max-sm:text-[16px] max-sm:w-[110px]">
                                            {item.value}
                                        </span>
                                    </div>
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
            </div>
        </div>
    );
}
