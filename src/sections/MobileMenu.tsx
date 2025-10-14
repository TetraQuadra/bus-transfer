'use client'

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ParcelDropdown from '@/components/ParcelDropdown';
import ServicesDropdown from '@/components/ServicesDropdown';
import Button from '@/components/Button';

type NavItem = { label: string; href: string; isDropdown?: boolean; dropdownType?: string };

type Props = {
    items: NavItem[];
    bookLabel?: string;
};

const MobileMenu = ({ items, bookLabel }: Props) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent | TouchEvent) => {
            if (!rootRef.current) return;
            const target = e.target as Node | null;
            if (target && !rootRef.current.contains(target)) {
                setOpen(false);
            }
        };
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [open]);

    return (
        <div ref={rootRef} className="relative">
            <button
                aria-label="Open menu"
                onClick={() => setOpen(!open)}
                className="w-10 h-10 flex items-center justify-center rounded-md"
            >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7L4 7" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M20 12L4 12" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M20 17L4 17" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-3">
                    <nav className="flex flex-col gap-2">
                        {items.map((item, index) => {
                            if (item.isDropdown && item.dropdownType === 'parcels') {
                                return <ParcelDropdown key={index} isMobile={true} showArrow={true} onMobileMenuClose={() => setOpen(false)} />;
                            }
                            if (item.isDropdown && item.dropdownType === 'services') {
                                return <ServicesDropdown key={index} isMobile={true} onMobileMenuClose={() => setOpen(false)} />;
                            }
                            return (
                                <Link key={item.href} href={item.href} className="px-3 py-2 rounded-md hover:bg-gray-50" onClick={() => setOpen(false)}>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                    {bookLabel && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <Button
                                as="link"
                                href="/#booking"
                                className="w-full mb-3"
                                variant="primary"
                                size="sm"
                                onClick={() => setOpen(false)}
                            >
                                {bookLabel}
                            </Button>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <LanguageSwitcher size="lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;


