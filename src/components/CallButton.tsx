'use client'

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
            <PhoneIcon className="w-6 h-6 relative z-10" strokeWidth={2.5} />
        </a>
    );
};

export default CallButton;


const PhoneIcon = ({ className, strokeWidth }: { className?: string, strokeWidth?: number }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={` ${className || ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={strokeWidth || 2.5}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 5.5C2 4.12 3.12 3 4.5 3h2A2.5 2.5 0 0 1 9 5.5v2A2.5 2.5 0 0 1 6.5 10h-.55a11.03 11.03 0 0 0 8.05 8.05V17.5A2.5 2.5 0 0 1 16.5 15h2A2.5 2.5 0 0 1 21 17.5v2A2.5 2.5 0 0 1 18.5 22C10.94 22 2 13.06 2 5.5Z"
            />
        </svg>
    );
};