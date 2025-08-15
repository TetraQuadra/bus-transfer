'use client'

import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from '@/hooks/useTranslations';

const Autopark = () => {
    const t = useTranslations('autopark');
    const [activeTab, setActiveTab] = useState<'comfort' | 'lux'>('comfort');
    const currentTexts = [1, 2, 3, 4].map((i) => ({
        title: t(`features.${activeTab}.${i}.title`),
        description: t(`features.${activeTab}.${i}.description`)
    }));

    return (
        <section className="w-full py-16">
            <h2 className="text-[40px] font-regular text-center text-foreground mb-12">{t('title')}</h2>
            <div className="lg:w-[80%] bg-white rounded-[10px] mx-auto px-[50px] py-[40px] relative lg:min-h-[950px]">
                <div className="flex flex-row gap-15 mb-12">
                    <div className="flex flex-col gap-5 lg:w-[290px]">
                        <Button
                            onClick={() => setActiveTab('comfort')}
                            variant={activeTab === 'comfort' ? 'primary' : 'secondary'}
                            className={activeTab === 'comfort' ? '' : 'border-1'}
                        >
                            {t('tabs.comfort')}
                        </Button>
                        <Button
                            onClick={() => setActiveTab('lux')}
                            variant={activeTab === 'lux' ? 'primary' : 'secondary'}
                            className={activeTab === 'lux' ? '' : 'border-1'}
                        >
                            {t('tabs.lux')}
                        </Button>
                    </div>
                    <div>
                        <div className="flex flex-col gap-5 bg-gray-400 h-full lg:w-[500px]">{t('videoPlaceholder')}</div>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-2 gap-x-[60px] gap-y-[30px]">
                    {currentTexts.map((text, index) => (
                        <div key={index} className="flex flex-row gap-[14px] items-start">
                            <Image src="/icons/shield.svg" alt={t('alt.icon')} width={70} height={70} />
                            <div>
                                <h3 className="text-[24px] font-regular text-foreground mb-1 pt-[16px]">{text.title}</h3>
                                <p className="text-[16px] font-regular text-foreground">{text.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center absolute bottom-[40px] right-[50%] translate-x-[50%]">
                    <Button className="mx-auto mt-8 max-w-[286px]">
                        {t('cta')}
                    </Button>
                </div>

                <Image src="/autopark/armchair.png" alt={t('alt.armchair')} width={450} height={450} className="absolute bottom-[-110px] left-[-310px] max-lg:hidden" />
                <Image src="/autopark/armchair.png" alt={t('alt.armchair')} width={450} height={450} className="absolute bottom-[-110px] right-[-350px] scale-x-[-1] max-lg:hidden" />

            </div>
        </section>
    );
};

export default Autopark;