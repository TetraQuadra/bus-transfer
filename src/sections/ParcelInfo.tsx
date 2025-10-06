'use client'

import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';

type ParcelInfoProps = {
    country: string;
};

const ParcelInfo = ({ country }: ParcelInfoProps) => {
    const t = useTranslations('parcelInfo');

    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className=" mb-8">
                    <h2 className="text-[24px] max-md:text-[22px] font-regular text-foreground mb-6">
                        {t('title', { country })}
                    </h2>
                    <p className="text-[18px] max-md:text-[16px] text-foreground/80 mb-4">
                        {t('intro', { country })}
                    </p>
                </div>

                <div className="flex justify-center mb-8">
                    <Image
                        src="/parcels/2.png"
                        alt={t('imageAlt')}
                        width={600}
                        height={300}
                        quality={100}
                        className="max-w-full h-auto rounded-[10px]"
                    />
                </div>

                <div className="">
                    <p className="text-[18px] max-md:text-[16px] text-foreground/80 mb-4">
                        {t('description', { country })}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ParcelInfo;
