"use client";

import { useState } from "react";
import Image from "next/image";

// FAQ ВЗЯТЬ ВОПРОСЫ
const faqData = [
    {
        title: "Скільки часу займає перевезення до Європи?",
        description: "Залежить від країни призначення. Наприклад, до Польщі – 1-2 дні, до Німеччини – 2-3 дні, до Італії чи Франції – до 5 днів."
    },
    {
        title: "Які документи потрібні для поїздки?",
        description: "Для поїздки потрібен закордонний паспорт, віза (якщо потрібна), страховка та інші документи залежно від країни призначення."
    },
    {
        title: "Чи можна перевозити домашніх тварин?",
        description: "Так, ми надаємо послуги перевезення домашніх тварин. Потрібні відповідні документи та ветеринарні сертифікати."
    },
    {
        title: "Які автомобілі використовуються для перевезень?",
        description: "Ми використовуємо автомобілі комфорт та люкс класу для забезпечення максимального комфорту пасажирів."
    },
    {
        title: "Чи можна замовити індивідуальний трансфер?",
        description: "Так, ми надаємо послуги індивідуального трансферу за попереднім замовленням."
    },
    {
        title: "Як забронювати поїздку?",
        description: "Бронювання можна здійснити через наш сайт, зателефонувавши нам або написавши в месенджерах."
    },
    {
        title: "Чи надаєте ви послуги доставки посилок?",
        description: "Так, ми також надаємо послуги доставки посилок між Україною та країнами Європи."
    },
    {
        title: "Які країни ви обслуговуєте?",
        description: "Ми обслуговуємо маршрути Україна - Польща - Німеччина - Нідерланди - Бельгія та інші країни Європи."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-background py-16">
            <div className="px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* FAQ Section */}
                    <div className="flex-3">
                        <h2 className="text-[40px] font-regular text-foreground mb-8">
                            НАЙЧАСТІШІ ПИТАННЯ ВІД НАШИХ КЛІЄНТІВ
                        </h2>

                        <div className="">
                            {faqData.map((item, index) => (
                                <div key={index} className="overflow-hidden border-b border-[#e0e0e0c4]">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex items-center justify-between text-left"
                                    >
                                        <span className="text-[26px] font-regular text-foreground p-4">
                                            {item.title}
                                        </span>
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
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
                                                <p className="text-[20px] font-regular text-foreground">
                                                    {item.description}
                                                </p>
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
                                alt="Instagram profile"
                                width={380}
                                height={675} className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
