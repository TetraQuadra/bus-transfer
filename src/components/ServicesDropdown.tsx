'use client'

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';

type ServicesDropdownProps = {
    className?: string;
    isMobile?: boolean;
};

const ServicesDropdown = ({ className = "", isMobile = false }: ServicesDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('header.navigation');
    const tServices = useTranslations('weOffer.services');

    const services = [
        { id: 'passengers', href: '/#routes' },
        { id: 'packages', href: '/parcels/poland' },
        { id: 'pets', href: '/pets' }
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

    if (isMobile) {
        return (
            <div ref={dropdownRef} className={`relative ${className}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-3 py-2 rounded-md hover:bg-gray-50 text-left flex items-center justify-between"
                >
                    <span>{t('services')}</span>
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
                    <div className="mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                        {services.map((service) => (
                            <Link
                                key={service.id}
                                href={service.href}
                                className="block px-3 py-2 hover:bg-gray-50 text-sm"
                                onClick={handleItemClick}
                            >
                                {tServices(service.id)}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 transition-colors duration-200 hover:text-[var(--color-primary)] flex items-center gap-1"
            >
                <span>{t('services')}</span>
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
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            href={service.href}
                            className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                            onClick={handleItemClick}
                        >
                            {tServices(service.id)}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServicesDropdown;
