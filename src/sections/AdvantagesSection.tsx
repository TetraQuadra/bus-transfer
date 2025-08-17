'use client'

import { useTranslations } from '@/hooks/useTranslations';


const AdvantagesSection = () => {
    const t = useTranslations('advantages');
    const items = [1, 2, 3, 4].map((i) => ({
        id: i,
        title: t(`items.${i}.title`),
        description: t(`items.${i}.description`)
    }));
    return (
        <section id="advantages" className="py-6 w-full">
            <div className="">
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto justify-items-center">
                        {items.map((item: { id: number; title: string; description: string }) => (
                            <div
                                key={item.id}
                                className="w-full md:max-w-[275px] mx-auto"
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

export default AdvantagesSection;
