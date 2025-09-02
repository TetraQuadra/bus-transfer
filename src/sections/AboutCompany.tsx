import { getTranslations } from 'next-intl/server';

const AboutCompany = async () => {
    const t = await getTranslations('aboutCompany');
    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="w-full mx-auto">
                <h2 className="text-[40px] max-md:text-[26px] font-regular text-foreground mb-4 uppercase text-center">
                    {t('title')}
                </h2>
                <p className="text-[26px] font-medium max-md:text-[16px] text-foreground/80 mb-4">{t('greeting')}</p>
                <p className="text-[26px] max-md:text-[16px] text-foreground/80 mb-4">{t('intro')}</p>

                <h3 className="text-[26px] max-md:text-[16px] font-regular text-foreground mb-3">{t('directionsTitle')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-[26px] max-md:text-[16px] text-foreground/80 mb-6">
                    <li>{t('directions.poland')}</li>
                    <li>{t('directions.germany')}</li>
                    <li>{t('directions.netherlands')}</li>
                    <li>{t('directions.belgium')}</li>
                </ul>

                <h3 className="text-[26px]  max-md:text-[16px] font-medium text-foreground mb-3">{t('comfortTitle')}</h3>
                <p className="text-[26px] max-md:text-[16px] text-foreground/80 mb-4">{t('comfortIntro')}</p>
                <ul className="list-disc pl-5 space-y-1 text-[26px] max-md:text-[16px] text-foreground/80 mb-6">
                    <li>{t('comfort.ac')}</li>
                    <li>{t('comfort.seats')}</li>
                    <li>{t('comfort.usb')}</li>
                    <li>{t('comfort.wifi')}</li>
                    <li>{t('comfort.media')}</li>
                </ul>

                <p className="text-[26px] max-md:text-[16px] text-foreground/80">{t('drivers')}</p>
            </div>
        </section>
    );
};

export default AboutCompany;


