'use client'

import { useTranslations } from '@/hooks/useTranslations';

const BenefitsSection = () => {
    const t = useTranslations('benefits');
    const benefits = [
        { id: 1, text: t('items.1') },
        { id: 2, text: t('items.2') },
        { id: 3, text: t('items.3') },
    ];
    return (
        <section id="benefits" className="w-full bg-[var(--color-secondary)] rounded-[10px] shadow-lg mb-15 md:mb-16 py-8 sm:py-10 md:py-12 lg:py-14">
            <div className="w-full">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[30px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-regular text-white text-left mb-6 sm:mb-8">
                        {t('title')}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-16 justify-items-start md:justify-items-center">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.id}
                                className="flex items-center max-w-[295px]"
                            >
                                <div className="min-w-[2px] h-10 sm:h-12 md:h-16 bg-white mr-4 sm:mr-5 md:mr-6"></div>
                                <p className="text-white text-[24px] sm:text-[24px] md:text-[24px] lg:text-[26px] font-regular">
                                    {benefit.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
