'use client'

import Image from 'next/image';
import { useTranslations } from '@/hooks/useTranslations';

const TrustSection = () => {
    const t = useTranslations('trust');
    return (
        <section id="trust" className="mb-15 md:mb-16 w-full">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-[30px] lg:text-[40px] font-regular text-center text-foreground mb-12 uppercase">
                    {t('title')}
                </h2>

                <div className="lg:flex lg:flex-row max-lg:flex max-lg:flex-col gap-[30px] mb-[30px]">
                    <div className="bg-white rounded-[10px] p-6 shadow-lg w-full lg:w-[500px]">
                        <Image
                            src="/trust/1.png"
                            alt={t('alt.trust1')}
                            width={460}
                            height={120}
                            quality={100}
                            className="w-full h-auto mb-4 rounded-[8px]"
                        />
                        <h3 className="text-[26px] font-normal text-foreground mb-3">
                            {t('cards.first.title')}
                        </h3>
                        <p className="text-[18px] font-normal text-foreground">
                            {t('cards.first.description')}
                        </p>
                    </div>

                    {/* Вторая карточка - 250px */}
                    <div className="bg-[var(--color-secondary)] rounded-[10px] p-6 shadow-lg w-full lg:w-[250px]">
                        <h3 className="text-[26px] font-normal text-white mb-3">
                            {t('cards.second.title')}
                        </h3>
                        <p className="text-[18px] font-normal text-white">
                            {t('cards.second.description')}
                        </p>
                    </div>

                    {/* Третья карточка - 388px */}
                    <div className="bg-white rounded-[10px] p-6 shadow-lg w-full lg:w-[388px]">
                        <h3 className="text-[26px] font-normal text-foreground mb-3">
                            {t('cards.third.title')}
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/icons/check.png"
                                    alt={t('alt.check')}
                                    width={50}
                                    height={50}
                                    quality={100}
                                    className="flex-shrink-0 max-lg:w-[20px] max-lg:h-[20px]"
                                />
                                <p className="text-[18px] font-normal text-foreground">
                                    {t('cards.third.items.1')}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/icons/check.png"
                                    alt={t('alt.check')}
                                    width={50}
                                    height={50}
                                    quality={100}
                                    className="flex-shrink-0 max-lg:w-[20px] max-lg:h-[20px]"
                                />
                                <p className="text-[18px] font-normal text-foreground">
                                    {t('cards.third.items.2')}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/icons/check.png"
                                    alt={t('alt.check')}
                                    width={50}
                                    height={50}
                                    quality={100}
                                    className="flex-shrink-0 max-lg:w-[20px] max-lg:h-[20px]"
                                />
                                <p className="text-[18px] font-normal text-foreground">
                                    {t('cards.third.items.3')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Второй ряд - две карточки пополам */}
                <div className="lg:grid lg:grid-cols-2 max-lg:flex max-lg:flex-col gap-[30px] mb-[30px]">
                    <div className="bg-[var(--color-secondary)] rounded-[10px] p-6 shadow-lg">
                        <h3 className="text-[26px] font-normal text-white mb-3">
                            {t('cards.fourth.title')}
                        </h3>
                        <p className="text-[18px] font-normal text-white">
                            {t('cards.fourth.description')}
                        </p>
                    </div>

                    <div className="bg-white rounded-[10px] p-6 shadow-lg">
                        <h3 className="text-[26px] font-normal text-foreground mb-3">
                            {t('cards.fifth.title')}
                        </h3>
                        <p className="text-[18px] font-normal text-foreground">
                            {t('cards.fifth.description')}
                        </p>
                    </div>
                </div>

                {/* Третий ряд - одна карточка на всю ширину */}
                <div className="bg-white rounded-[10px] p-6 shadow-lg flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <h3 className="text-[26px] font-normal text-foreground mb-3">
                            {t('cards.sixth.title')}
                        </h3>
                        <p className="text-[18px] font-normal text-foreground">
                            {t('cards.sixth.description')}
                        </p>
                    </div>
                    <div className="flex gap-6 justify-center md:justify-end">
                        <Image
                            src="/trust/2.png"
                            alt={t('alt.trust2')}
                            width={270}
                            height={210}
                            quality={100}
                            className="rounded-[10px] max-md:hidden max-lg:block max-[1200px]:hidden"
                        />
                        <Image
                            src="/trust/3.png"
                            alt={t('alt.trust3')}
                            width={460}
                            height={210}
                            quality={100}
                            className="rounded-[10px] max-lg:hidden max-md:block"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
