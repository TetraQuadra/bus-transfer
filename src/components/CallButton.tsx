'use client'

import Image from 'next/image';
import React from 'react';

interface CallButtonProps {
    phone: string;
    className?: string;
}

const CallButton: React.FC<CallButtonProps> = ({ phone, className }) => {
    return (
        <a
            href={`tel:${phone}`}
            className={`
        inline-flex items-center justify-center
        w-14 h-14 rounded-full bg-[var(--color-secondary)] text-white
        overflow-hidden transition-transform duration-200
        hover:scale-110 hover:bg-[var(--color-primary)] z-1 ${className || ''}
      `}
        >
            <PhoneIcon className="w-8 h-8 relative z-10" strokeWidth={2.5} />
        </a>
    );
};

export default CallButton;


const PhoneIcon = ({ className, strokeWidth }: { className?: string, strokeWidth?: number }) => {
    return (
        <Image src="/icons/phone.svg" alt="Phone" width={24} height={24} className={className} />
    );
};