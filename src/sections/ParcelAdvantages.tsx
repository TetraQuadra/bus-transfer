'use client'

import { useTranslations } from '@/hooks/useTranslations';

const ParcelAdvantages = () => {
    const t = useTranslations('parcelAdvantages');
    const items = [1, 2, 3].map((i) => ({
        id: i,
        title: t(`items.${i}.title`),
        description: t(`items.${i}.description`)
    }));
    return (
        <section id="advantages" className="w-full mb-15 md:mb-16">
            <div className="">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto justify-items-center">
                        {items.map((item: { id: number; title: string; description: string }) => (
                            <div
                                key={item.id}
                                className="w-full md:max-w-[350px] max-md:max-w-[400px] mx-auto"
                            >
                                <div className="flex items-start">
                                    <div className="w-[2px] h-[140px] bg-black mr-6 max-md:h-[90px]"></div>
                                    <div className="flex-1">
                                        <h3 className="text-[26px] font-medium text-foreground mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-[16px] font-regular ">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ParcelAdvantages;
