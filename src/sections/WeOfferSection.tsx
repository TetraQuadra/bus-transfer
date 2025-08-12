'use client'

import ServiceCard from '@/components/ServiceCard';

const texts = {
    title: "МИ ПРОПОНУЄМО",
    services: [
        {
            id: "passengers",
            title: "Пасажирські перевезення",
            image: "/we_offer/passengers.png",
        },
        {
            id: "packages",
            title: "Доставка посилок",
            image: "/we_offer/packages.png",
        },
        {
            id: "pets",
            title: "Перевезення домашніх тварин",
            image: "/we_offer/pets.png",
        }
    ]
};


const WeOfferSection = () => {
    return (
        <section className="py-8 w-full">
            <div className="">
                <div className="w-full">
                    <h2 className="text-[40px] font-regular text-center text-foreground mb-12 max-sm:text-[30px]">
                        {texts.title}
                    </h2>

                    <div className="flex flex-row justify-between max-w-4xl mx-auto  max-lg:w-[85%] max-sm:w-full">
                        {texts.services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                title={service.title}
                                image={service.image}

                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeOfferSection;
