'use client'

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';

const FooterParcelDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('parcels');

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

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors text-left flex items-center justify-between w-full"
            >
                <span>{t('title')}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[200px]">
                    {countries.map((country) => (
                        <Link
                            key={country.slug}
                            href={`/parcels/${country.slug}`}
                            className="block px-4 py-2 hover:bg-gray-50 transition-colors text-[16px]"
                            onClick={handleItemClick}
                        >
                            {country.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FooterParcelDropdown;
