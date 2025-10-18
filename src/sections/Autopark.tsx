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

    const icons = [
        '/icons/shield.svg',
        '/icons/play.svg',
        '/icons/5star.svg',
        '/icons/wifi.svg'
    ];

    return (
        <section id="fleet" className="w-full mb-15 md:mb-[140px]">
            <h2 className="text-[30px] lg:text-[40px] font-regular text-center text-foreground mb-8 sm:mb-10 lg:mb-12 uppercase">{t('title')}</h2>
            <div className="w-full lg:w-[80%] bg-white rounded-[10px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[50px] py-6 sm:py-8 md:py-10 lg:py-[40px] relative lg:min-h-[950px] flex flex-col">
                <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-12 mb-8 md:mb-12">
                    <div className="flex flex-col gap-5 w-full lg:w-[290px]">
                        <Button
                            onClick={() => setActiveTab('comfort')}
                            variant={activeTab === 'comfort' ? 'primary' : 'secondary'}
                            className={`max-lg:h-[65px] ${activeTab === 'comfort' ? '' : 'border-1'}`}
                        >
                            {t('tabs.comfort')}
                        </Button>
                        <Button
                            onClick={() => setActiveTab('lux')}
                            variant={activeTab === 'lux' ? 'primary' : 'secondary'}
                            className={`max-lg:h-[65px] ${activeTab === 'lux' ? '' : 'border-1'}`}
                        >
                            {t('tabs.lux')}
                        </Button>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col items-center justify-center gap-5 bg-gray-200 rounded-[10px] min-h-[220px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[200px] lg:w-full">
                            {t('videoPlaceholder')}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[30px]">
                    {currentTexts.map((text, index) => (
                        <div key={index} className="flex flex-row gap-[14px] items-start">
                            <Image src={icons[index]} alt={t('alt.icon')} width={70} height={70} quality={100} className="w-10 h-10 md:w-[70px] md:h-[70px]" />
                            <div>
                                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium text-foreground mb-1 pt-[16px] max-md:pt-0 uppercase">{text.title}</h3>
                                <p className="text-[14px] sm:text-[15px] md:text-[16px] font-regular text-foreground" dangerouslySetInnerHTML={{ __html: text.description.replace(/<br\/>/g, '<br/>') }}></p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center pt-8 lg:mt-auto max-md:hidden">
                    <Button as="link" href="/#booking" className="mx-auto max-w-[286px] max-md:max-w-full">
                        {t('cta')}
                    </Button>
                </div>

                {/* <Image src="/autopark/armchair.png" alt={t('alt.armchair')} width={450} height={450} className="absolute bottom-[-110px] left-[-310px] max-lg:hidden" />
                <Image src="/autopark/armchair.png" alt={t('alt.armchair')} width={450} height={450} className="absolute bottom-[-110px] right-[-350px] scale-x-[-1] max-lg:hidden" /> */}

            </div>
        </section>
    );
};

export default Autopark;