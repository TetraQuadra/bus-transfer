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
        <section className="w-full bg-[var(--color-secondary)] h-[270px] flex items-center rounded-[10px] shadow-lg my-12">
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-[36px] font-medium text-white text-center mb-8">
                        {t('title')}
                    </h2>

                    <div className="flex flex-row gap-16 justify-center">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.id}
                                className="flex items-center max-w-[280px]"
                            >
                                <div className="w-1 h-16 bg-white mr-6"></div>
                                <p className="text-white text-[26px] font-regular">
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
