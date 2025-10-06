'use client'

import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
    title: string;
    image: string;
    href?: string;
}



const ServiceCard = ({ title, image, href }: ServiceCardProps) => {
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

    if (href) {
        return (
            <Link href={href} className="block">
                {content}
            </Link>
        );
    }

    return content;
};

export default ServiceCard;
