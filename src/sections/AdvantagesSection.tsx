'use client'

const BENEFITS = {
    items: [
        {
            id: 1,
            title: "Європейський рівень сервісу",
            description: "Як в європейських транспортних компаніях"
        },
        {
            id: 2,
            title: "Комфорт у кожній деталі",
            description: "Усе продумано для вашої зручності під час подорожі"
        },
        {
            id: 3,
            title: "Швидка підтримка",
            description: "Наші менеджери на зв'язку у Viber/WhatsApp/Instagram з понеділка по п'ятницю"
        },
        {
            id: 4,
            title: "Зручні місця посадки",
            description: "Наші маршрути продумані так, щоб вам було завжди легко дістатися"
        }
    ]
};


const AdvantagesSection = () => {
    return (
        <section className="py-24 w-full">
            <div className="">
                <div className="w-full">
                    <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
                        {BENEFITS.items.map((item: { id: number; title: string; description: string }) => (
                            <div
                                key={item.id}
                                className="flex-1 max-w-[275px] mx-auto lg:mx-0"
                            >
                                <div className="flex items-start">
                                    <div className="w-[2px] h-[140px] bg-black mr-6"></div>
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
