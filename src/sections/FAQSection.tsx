"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from '@/hooks/useTranslations';
import type { DirectionId } from '@/const/cities';

// TODO: ТУТ ХЕРНЯ НАПИСАНА НАДО ВСТАВИТЬ НОРМАЛЬНЫЕ ТЕКСТА

type Props = { direction?: DirectionId };

const FAQSection = ({ direction }: Props) => {
    const t = useTranslations('faq');
    const faqData = t.raw('items') as Array<{ title: string; description: string }>;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toWhereMap = t.raw('toWhere') as Record<'europe' | DirectionId, string>;
    const toWhere = direction ? toWhereMap[direction] : toWhereMap.europe;

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-background w-full mb-15 md:mb-16">
            <div className="px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* FAQ Section */}
                    <div className="flex-3">
                        <h2 className="text-[30px] lg:text-[40px] font-regular text-foreground mb-4 leading-[30px] uppercase lg:leading-[40px]">
                            {t('title')}
                        </h2>

                        <div className="">
                            {faqData.map((item, index) => (
                                <div key={index} className="overflow-hidden border-b border-[#e0e0e0c4]">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex items-center justify-between text-left min-h-[70px]"
                                    >
                                        <span className="text-[26px] font-regular text-foreground p-4 max-sm:p-1 max-md:text-[20px]">
                                            {item.title.replaceAll('{toWhere}', toWhere)}
                                        </span>
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center min-w-[32px]"
                                            style={{ backgroundColor: 'var(--color-primary)' }}
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 36 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`transition-transform duration-300 ${openIndex === index ? 'rotate-90' : '-rotate-90'
                                                    }`}
                                            >
                                                <path
                                                    d="M35.4142 16.4142C36.1953 15.6332 36.1953 14.3668 35.4142 13.5858L22.6863 0.857864C21.9052 0.0768156 20.6389 0.0768156 19.8579 0.857864C19.0768 1.63891 19.0768 2.90524 19.8579 3.68629L31.1716 15L19.8579 26.3137C19.0768 27.0948 19.0768 28.3611 19.8579 29.1421C20.6389 29.9232 21.9052 29.9232 22.6863 29.1421L35.4142 16.4142ZM0 15L0 17L34 17V15V13L0 13L0 15Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="">
                                            <div className="bg-white p-4">
                                                <div
                                                    className="text-[20px] font-regular text-foreground max-md:text-[20px]"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.description
                                                            .replaceAll('{toWhere}', toWhere)
                                                            .replaceAll('{telNumber}', '<br/><a href="tel:+380982275197" class="text-blue-600 underline hover:text-blue-800">+38 (098) 227 51 97</a>')
                                                            .replaceAll(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline hover:text-blue-800">$1</a>')
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Phone Image */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="relative">
                            <Image
                                src="/faq/1.png"
                                alt={t('alt.phone')}
                                width={380}
                                height={675}
                                quality={100}
                                className="object-contain max-lg:hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
