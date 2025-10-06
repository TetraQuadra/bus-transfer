'use client'

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ALL_CITIES, type DirectionId } from '@/const/cities';
import { useLocale } from 'next-intl';

type RouteDropdownProps = {
    city: string;
    country: string;
    countrySlug: DirectionId;
    className?: string;
};

const RouteDropdown = ({ city, country, countrySlug, className = "" }: RouteDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();

    const sourceCity = ALL_CITIES.find(cityData =>
        cityData.names.uk === city || cityData.names.ru === city || cityData.names.en === city
    );

    const countryCities = ALL_CITIES.filter(cityData =>
        cityData.country === countrySlug && cityData.names.uk !== city
    );

    const getCityName = (cityData: typeof countryCities[0]) => {
        const lang = locale as 'uk' | 'ru' | 'en';
        return cityData.names[lang] || cityData.names.uk;
    };

    const createRouteSlug = (sourceCitySlug: string, destinationCitySlug: string) => {
        return `${sourceCitySlug}-${destinationCitySlug}`;
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleItemClick = () => {
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 max-sm:gap-1 hover:text-[var(--color-primary)] transition-colors w-full text-left"
            >
                <Image
                    src="/icons/triangleRight.svg"
                    alt=""
                    width={20}
                    height={20}
                    quality={100}
                    className="object-contain max-sm:w-[16px] max-sm:h-[16px]"
                />
                <span className="text-[16px] font-regular text-foreground max-sm:text-[12px] underline">
                    {city} - {country}
                </span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ml-auto`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-full max-w-[250px] max-h-[300px] overflow-y-auto left-0 sm:max-w-[250px]">
                    {countryCities.map((cityData) => (
                        <Link
                            key={cityData.slug}
                            href={`/book/${sourceCity ? createRouteSlug(sourceCity.slug, cityData.slug) : cityData.slug}`}
                            className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                            onClick={handleItemClick}
                        >
                            <div className="flex items-center gap-2"></div>
                            <span className="text-[16px] font-regular text-foreground group-hover:text-[var(--color-primary)] transition-colors">
                                {city} - {getCityName(cityData)}
                            </span>
                        </Link>
                    ))}
                </div>
            )
            }
        </div >
    );
};

export default RouteDropdown;
