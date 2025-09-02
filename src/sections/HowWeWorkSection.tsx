import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

const STEPS_META = [
    { id: '1', number: '1', icon: '/how-we-work/1.png' },
    { id: '2', number: '2', icon: '/how-we-work/2.png' },
    { id: '3', number: '3', icon: '/how-we-work/3.png' },
    { id: '4', number: '4', icon: '/how-we-work/4.png' },
    { id: '5', number: '5', icon: '/how-we-work/5.png' },
    { id: '6', number: '6', icon: '/how-we-work/6.png' }
];

const HowWeWorkSection = async () => {
    const t = await getTranslations('howWeWork');
    return (
        <section id="how-we-work" className="w-full mb-15 md:mb-16">
            <h2 className="text-[40px] font-regular text-center text-foreground mb-12">
                {t('title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                {STEPS_META.map((item) => (
                    <div key={item.id} className="bg-white rounded-[20px] p-5 shadow-lg relative">
                        <div className="absolute top-5 right-5">
                            <span className="text-[58px] font-medium text-[#757575] opacity-30 leading-none">
                                {item.number}
                            </span>
                        </div>

                        <div className="w-[75px] h-[75px] mb-4">
                            <Image
                                src={item.icon}
                                alt={t(`steps.${item.id}.title`)}
                                width={75}
                                height={75}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="pr-16">
                            <h3 className="text-[26px] font-medium text-foreground mb-3">
                                {t(`steps.${item.id}.title`)}
                            </h3>
                            <p className="text-[18px] font-normal text-foreground">
                                {t(`steps.${item.id}.description`)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowWeWorkSection;
