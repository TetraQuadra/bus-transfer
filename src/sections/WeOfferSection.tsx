import ServiceCard from '@/components/ServiceCard';
import Button from '@/components/Button';
import { getTranslations } from 'next-intl/server';

const services = [
    {
        id: 'passengers',
        image: '/we_offer/passengers.png',
    },
    {
        id: 'packages',
        image: '/we_offer/packages.png',
    },
    {
        id: 'pets',
        image: '/we_offer/pets.png',
    }
];

const WeOfferSection = async () => {
    const t = await getTranslations('weOffer');
    return (
        <section id="services" className="py-8 w-full">
            <div className="">
                <div className="w-full">
                    <h2 className="text-[40px] font-regular text-center text-foreground mb-12 max-sm:text-[30px]">
                        {t('title')}
                    </h2>

                    <div className="flex flex-row justify-between max-w-4xl mx-auto  max-lg:w-[85%] max-sm:w-full">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                title={t(`services.${service.id}`)}
                                image={service.image}

                            />
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <Button as="link" href="/#booking" className="max-w-[286px]">
                            {t('title')}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeOfferSection;
