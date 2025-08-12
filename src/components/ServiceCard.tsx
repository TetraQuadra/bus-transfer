'use client'

import Image from 'next/image';

interface ServiceCardProps {
    title: string;
    image: string;
}



const ServiceCard = ({ title, image }: ServiceCardProps) => {
    return (
        <div className="flex flex-col items-center text-center lg:w-[200px]">
            <div className="rounded-full flex items-center justify-center mb-4">
                <Image
                    src={image}
                    alt={title}
                    width={116}
                    height={116}
                    className="object-contain max-md:w-[80px] max-md:h-[80px] max-sm:w-[70px] max-sm:h-[70px]"
                    quality={100}
                />
            </div>
            <h3 className="text-foreground font-regular text-[24px] mb-2 max-md:text-[16px]">
                {title}
            </h3>
        </div>
    );
};

export default ServiceCard;
