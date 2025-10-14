'use client'

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
interface ServiceCardWithDropdownProps {
    title: string;
    image: string;
    isDropdown?: boolean;
}

const ServiceCardWithDropdown = ({ title, image, isDropdown = false }: ServiceCardWithDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const tDirections = useTranslations('aboutCompany.directions');

    const countries = [
        { slug: 'poland', name: tDirections('poland') },
        { slug: 'germany', name: tDirections('germany') },
        { slug: 'belgium', name: tDirections('belgium') },
        { slug: 'netherlands', name: tDirections('netherlands') }
    ];

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

    const content = (
        <div className="flex flex-col items-center text-center lg:w-[200px] group cursor-pointer">
            <div className="rounded-full flex items-center justify-center mb-4 relative">
                <Image
                    src={image}
                    alt={title}
                    width={116}
                    height={116}
                    quality={100}
                    className="object-contain max-md:w-[80px] max-md:h-[80px] max-sm:w-[70px] max-sm:h-[70px] group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                        className="w-6 h-6 text-[var(--color-primary)] bg-white rounded-full p-1 shadow-md"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </div>
            </div>
            <h3 className="text-foreground font-regular text-[24px] mb-2 max-md:text-[16px] group-hover:text-[var(--color-primary)] transition-colors">
                {title}
            </h3>
        </div>
    );

    if (isDropdown) {
        return (
            <div ref={dropdownRef} className="relative">
                <div onClick={() => setIsOpen(!isOpen)}>
                    {content}
                </div>
                {isOpen && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px]">
                        {countries.map((country) => (
                            <Link
                                key={country.slug}
                                href={`/parcels/${country.slug}`}
                                className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                                onClick={handleItemClick}
                            >
                                {country.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return content;
};

export default ServiceCardWithDropdown;
