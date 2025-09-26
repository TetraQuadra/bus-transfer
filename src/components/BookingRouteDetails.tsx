'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { getPriceByRoute } from '@/lib/priceClient';
import { PriceResult } from '@/lib/prices';
import { findCityByName } from '@/const/cities';
import CompactGallery from './CompactGallery';
import { SwiperSlide } from 'swiper/react';
import { useOptionalBookingContext } from '@/contexts/BookingContext';

interface BookingRouteDetailsProps {
    routeSlug: string;
}

type ServiceClass = 'comfort' | 'luxury';

export default function BookingRouteDetails({ routeSlug }: BookingRouteDetailsProps) {
    const t = useTranslations('booking.bookingRoute');
    const locale = useLocale();
    const context = useOptionalBookingContext();
    const selectedRoute = context?.selectedRoute;
    const lastValidRoute = context?.lastValidRoute;
    const [serviceClass, setServiceClass] = useState<ServiceClass>('comfort');
    const [priceData, setPriceData] = useState<PriceResult | null>(null);
    const [loading, setLoading] = useState(true);

    // Стабилизируем routeToUse чтобы избежать бесконечных циклов
    const routeToUse = useMemo(() => {
        return selectedRoute || lastValidRoute;
    }, [selectedRoute, lastValidRoute]);

    // Создаем стабильный targetRouteSlug
    const targetRouteSlug = useMemo(() => {
        if (routeToUse && (!routeSlug.includes('-') || routeSlug.split('-').length !== 2)) {
            return `${routeToUse.fromCity.slug}-${routeToUse.toCity.slug}`;
        }
        return routeSlug;
    }, [routeSlug, routeToUse]);

    useEffect(() => {
        async function fetchPrice() {
            try {
                const price = await getPriceByRoute(targetRouteSlug);
                setPriceData(price);
            } catch (error) {
                console.error('Error fetching price:', error);
                // Если не удалось загрузить цены, сбрасываем данные
                setPriceData(null);
            } finally {
                setLoading(false);
            }
        }

        fetchPrice();
    }, [targetRouteSlug, routeToUse]);

    // Парсим маршрут из слага
    if (!routeSlug || typeof routeSlug !== 'string') {
        return (
            <div className="p-8">
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

    // Если нет городов в слаге, но есть данные в контексте - продолжаем
    // Если нет ни того, ни другого - показываем заглушку
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

    // Используем данные из контекста, если доступны, иначе из routeSlug
    // Если текущий маршрут не валиден, показываем последний валидный
    const displayFromCity = routeToUse?.fromCity || fromCity;
    const displayToCity = routeToUse?.toCity || toCity;
    const currentPrice = serviceClass === 'comfort' ? priceData?.comfort : priceData?.luxury;
    const images = Array.from({ length: 5 }, (_, i) => `/booking/${serviceClass}/${i + 1}.png`);

    // Показываем заглушку только если нет данных ни в контексте, ни в слаге
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
        <div className="p-8 gap-4 flex flex-col lg:flex-row">
            <div className="flex flex-col gap-8 min-w-1/5">
                <div className="">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {t('route')}
                    </h2>
                    <div className="text-3xl font-bold text-gray-900 uppercase ">
                        {getCityName(displayFromCity)} - {getCityName(displayToCity)}
                    </div>
                </div>

                <div className="space-y-3 max-lg:flex max-lg:space-y-0 max-lg:gap-8">
                    <button
                        onClick={() => setServiceClass('luxury')}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${serviceClass === 'luxury'
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                            }`}
                    >
                        <div className="text-lg font-semibold">{t('luxury')}</div>
                    </button>
                    <button
                        onClick={() => setServiceClass('comfort')}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${serviceClass === 'comfort'
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                            }`}
                    >
                        <div className="text-lg font-semibold">{t('comfort')}</div>
                    </button>
                </div>
            </div>

            <div className="w-full lg:w-3/6 bg-white rounded-2xl p-4 pt-8 shadow-lg">
                <CompactGallery slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }} showPagination loop autoplay spaceBetween={12} className='max-lg:h-[400px]'>
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full flex justify-center">
                                <img src={image} alt="about" width={150} height={200} className="object-cover rounded-xl max-lg:h-[300px] max-lg:w-auto" />
                            </div>
                        </SwiperSlide>
                    ))}
                </CompactGallery>
            </div>

            <div className="w-full lg:w-80 lg:flex-shrink-0 bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    {t('information')}
                </h3>

                <div className='lg:flex lg:flex-col gap-3 max-lg:grid max-lg:grid-cols-2 max-sm:gap-1 max-sm:grid-cols-1'>
                    {[
                        {
                            icon: "/icons/money.png",
                            alt: "Цена",
                            width: 36,
                            height: 36,
                            label: t('cost'),
                            value: loading ? '...' : `${currentPrice}€`
                        },
                        {
                            icon: "/icons/clock.png",
                            alt: "Время",
                            width: 42,
                            height: 42,
                            label: t('travelTime'),
                            value: t('travelTimeValue')
                        },
                        {
                            icon: "/icons/bus.png",
                            alt: "Частота",
                            width: 22,
                            height: 40,
                            label: t('stops'),
                            value: t('stopsValue')
                        },
                        {
                            icon: "/icons/people.png",
                            alt: "Пассажиры",
                            width: 40,
                            height: 28,
                            label: t('passengers'),
                            value: t('passengersValue')
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
                            <div className="">
                                <span className="text-[16px] max-sm:text-[16px]">
                                    {item.label}: &nbsp;
                                </span>
                                <span className="text-foreground text-[16px] max-sm:text-[16px] max-sm:w-[110px]">
                                    {item.value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
