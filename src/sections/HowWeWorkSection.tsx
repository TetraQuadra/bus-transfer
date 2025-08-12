'use client'

import Image from 'next/image';

const HOW_WE_WORK_DATA = [
    {
        id: 1,
        number: "1",
        icon: "/how-we-work/1.png",
        title: "Ви залишаєте заявку",
        description: "Заповніть коротку форму на сайті або напишіть нам у Viber / WhatsApp / Instagram"
    },
    {
        id: 2,
        number: "2",
        icon: "/how-we-work/2.png",
        title: "Ми зв'язуємось з вами",
        description: "Менеджер уточнює деталі поїздки, відповідає на всі питання та бронює місце"
    },
    {
        id: 3,
        number: "3",
        icon: "/how-we-work/3.png",
        title: "Оплата послуг",
        description: "Оплачуєте зручним для вас способом"
    },
    {
        id: 4,
        number: "4",
        icon: "/how-we-work/4.png",
        title: "Виконуємо перевезення",
        description: "Приходьте у зазначене місце й час — поїздка пройде комфортно, безпечно та вчасно"
    },
    {
        id: 5,
        number: "5",
        icon: "/how-we-work/5.png",
        title: "Клієнтська підтримка",
        description: "Підтримка 24/7 із Пн-Пт до, під час і після поїздки — ми з вами на зв'язку"
    },
    {
        id: 6,
        number: "6",
        icon: "/how-we-work/6.png",
        title: "Програма лояльності",
        description: "Повертайтесь знову та отримуйте знижки, бонуси або пріоритетне бронювання."
    }
];

const HowWeWorkSection = () => {
    return (
        <section className="py-12 w-full">
            <h2 className="text-[40px] font-regular text-center text-foreground mb-12">
                ЯК МИ ПРАЦЮЄМО
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                {HOW_WE_WORK_DATA.map((item) => (
                    <div key={item.id} className="bg-white rounded-[20px] p-5 shadow-lg relative">
                        <div className="absolute top-5 right-5">
                            <span className="text-[58px] font-medium text-[#757575] opacity-30 leading-none">
                                {item.number}
                            </span>
                        </div>

                        <div className="w-[75px] h-[75px] mb-4">
                            <Image
                                src={item.icon}
                                alt={item.title}
                                width={75}
                                height={75}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="pr-16">
                            <h3 className="text-[26px] font-medium text-foreground mb-3">
                                {item.title}
                            </h3>
                            <p className="text-[18px] font-normal text-foreground">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowWeWorkSection;
