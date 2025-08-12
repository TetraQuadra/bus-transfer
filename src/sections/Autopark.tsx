'use client'

import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";

const comfortTexts = [
    {
        title: "Комфорт та безпека",
        description: "Мікроавтобуси класу Комфорт оснащені зручними сидіннями із електрорегулюванням, кондиціонером і ременями безпеки для максимальної зручності під час поїздки. Перед кожним рейсом проводиться техогляд, що гарантує повну безпеку в дорозі.",
    },
    {
        title: "Мультимедіа",
        description: "У наших мікроавтобусах встановлено телевізор з сучасною мультимедійною системою, що дозволяє переглядати фільми або слухати музику під час поїздки. Це створює приємну атмосферу в салоні та робить дорогу менш виснажливою.",
    },
    {
        title: "Досвідчені водії",
        description: "Наші водії мають багаторічний досвід міжнародних перевезень, добре знають маршрути та завжди дотримуються правил дорожнього руху. Вони проходять регулярні перевірки та забезпечують спокій і безпеку пасажирів у кожній поїздці.",
    }, {
        title: "Wi-Fi та зарядки в дорозі",
        description: "У мікроавтобусах класу Комфорт передбачено безкоштовний Wi-Fi та USB/Type-C зарядки біля кожного сидіння, щоб ви могли залишатися онлайн і користуватись гаджетами без обмежень у дорозі.",
    }
];

const luxTexts = [
    {
        title: "Комфорт та безпека",
        description: "Мікроавтобуси класу Люкс обладнані просторими сидіннями з електрорегулюванням та підтримкою для ніг, що забезпечує максимальний комфорт навіть у довгих поїздках. Для зручності пасажирів надаються пледи, а в салоні передбаченомісткий холодильник. Перед кожною поїздкою проводиться повна технічна перевірка, що гарантує високий рівень безпеки та надійності в дорозі.",
    },
    {
        title: "Мультимедіа",
        description: "У салоні встановлено великий LED-телевізор з сучасною мультимедійною системою та якісним звуком. Під час поїздки доступні фільми, музика або спокійний фоновий супровід — для комфортного настрою протягом усього маршруту.",
    },
    {
        title: "Досвідчені водії",
        description: "Водії мікроавтобусів класу Люкс мають досвід перевезень більше 10-ти років. Вони дбають не лише про безпечний рух, а й про те, щоб ваша поїздка була приємною з першої хвилини.",
    }, {
        title: "Wi-Fi та зарядки в дорозі",
        description: "У мікроавтобусах класу Люкс доступний швидкісний Wi-Fi, а біля кожного місця — USB, Type-C та розетка 220В для зарядки ноутбуків, планшетів чи смартфонів. Ви залишаєтесь на зв’язку та продуктивними навіть у дорозі.",
    }
];

const Autopark = () => {
    const [activeTab, setActiveTab] = useState<'comfort' | 'lux'>('comfort');

    const currentTexts = activeTab === 'comfort' ? comfortTexts : luxTexts;

    return (
        <section className="w-full py-16">
            <h2 className="text-[40px] font-regular text-center text-foreground mb-12">НАШ АВТОПАРК</h2>
            <div className="lg:w-[80%] bg-white rounded-[10px] mx-auto px-[50px] py-[40px] relative lg:min-h-[950px]">
                <div className="flex flex-row gap-15 mb-12">
                    <div className="flex flex-col gap-5 lg:w-[290px]">
                        <Button
                            onClick={() => setActiveTab('comfort')}
                            variant={activeTab === 'comfort' ? 'primary' : 'secondary'}
                            className={activeTab === 'comfort' ? '' : 'border-1'}
                        >
                            Комфорт
                        </Button>
                        <Button
                            onClick={() => setActiveTab('lux')}
                            variant={activeTab === 'lux' ? 'primary' : 'secondary'}
                            className={activeTab === 'lux' ? '' : 'border-1'}
                        >
                            Люкс
                        </Button>
                    </div>
                    <div>
                        <div className="flex flex-col gap-5 bg-gray-400 h-full lg:w-[500px]">Video placeholder</div>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-2 gap-x-[60px] gap-y-[30px]">
                    {currentTexts.map((text, index) => (
                        <div key={index} className="flex flex-row gap-[14px] items-start">
                            <Image src="/icons/shield.svg" alt="car" width={70} height={70} />
                            <div>
                                <h3 className="text-[24px] font-regular text-foreground mb-1 pt-[16px]">{text.title}</h3>
                                <p className="text-[16px] font-regular text-foreground">{text.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center absolute bottom-[40px] right-[50%] translate-x-[50%]">
                    <Button className="mx-auto mt-8 max-w-[286px]">
                        Забронювати
                    </Button>
                </div>

                <Image src="/autopark/armchair.png" alt="car" width={450} height={450} className="absolute bottom-[-110px] left-[-310px] max-lg:hidden" />
                <Image src="/autopark/armchair.png" alt="car" width={450} height={450} className="absolute bottom-[-110px] right-[-350px] scale-x-[-1] max-lg:hidden" />

            </div>
        </section>
    );
};

export default Autopark;