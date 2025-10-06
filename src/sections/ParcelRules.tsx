'use client'

import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';

type ParcelRulesProps = {
    country: string;
};

const ParcelRules = ({ country }: ParcelRulesProps) => {
    const t = useTranslations('parcelRules');

    const allowedItems = [
        t('allowed.items.0'),
        t('allowed.items.1'),
        t('allowed.items.2'),
        t('allowed.items.3'),
        t('allowed.items.4'),
        t('allowed.items.5'),
        t('allowed.items.6'),
        t('allowed.items.7'),
        t('allowed.items.8')
    ];

    const forbiddenItems = [
        t('forbidden.items.0'),
        t('forbidden.items.1'),
        t('forbidden.items.2'),
        t('forbidden.items.3'),
        t('forbidden.items.4'),
        t('forbidden.items.5'),
        t('forbidden.items.6'),
        t('forbidden.items.7')
    ];

    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-[32px] md:text-[48px] font-bold text-foreground mb-4 uppercase">
                        {t('title', { country })}
                    </h2>
                    <p className="text-[16px] md:text-[18px] text-gray-600">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="relative">
                    <div className="flex max-md:flex-col gap-6 lg:gap-8 justify-center">
                        <div className="bg-[var(--color-secondary)] rounded-[10px] p-6 text-white">
                            <h3 className="text-[24px] md:text-[28px] font-bold mb-6">
                                {t('allowed.title')}
                            </h3>
                            <ul className="space-y-3">
                                {allowedItems.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-[16px] md:text-[18px]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="hidden lg:block">
                            <Image
                                src="/parcels/1.png"
                                alt="Parcel rules illustration"
                                width={300}
                                height={200}
                                quality={100}
                                className="max-w-full h-auto"
                            />
                        </div>

                        <div className="bg-red-500 rounded-[10px] p-6 text-white">
                            <h3 className="text-[24px] md:text-[28px] font-bold mb-6">
                                {t('forbidden.title')}
                            </h3>
                            <ul className="space-y-3">
                                {forbiddenItems.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-[16px] md:text-[18px]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                </div>

                <div className="text-center mt-8 mb-6">
                    <p className="text-[14px] md:text-[16px] text-gray-600 mb-2">
                        {t('disclaimer')}
                    </p>
                    <p className="text-[14px] md:text-[16px] text-gray-600">
                        {t('coordination')}
                    </p>
                </div>

                <div className="text-center">
                    <a
                        href={`tel:${t('phone')}`}
                        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-[10px] text-[16px] md:text-[18px] transition-colors duration-200"
                    >
                        {t('phone')}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ParcelRules;
