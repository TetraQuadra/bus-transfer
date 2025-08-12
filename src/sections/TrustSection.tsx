'use client'

import Image from 'next/image';

const TrustSection = () => {
    return (
        <section className="py-12 w-full">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-[40px] font-regular text-center text-foreground mb-12">
                    ЧОМУ НАМ ДОВІРЯЮТЬ
                </h2>

                <div className="flex flex-row gap-[30px] mb-[30px]">
                    {/* Первая карточка - 500px */}
                    <div className="bg-white rounded-[10px] p-6 shadow-lg" style={{ width: '500px' }}>
                        <Image
                            src="/trust/1.png"
                            alt="Автопарк"
                            width={460}
                            height={120}
                            className="w-full h-auto mb-4 rounded-[8px]"
                        />
                        <h3 className="text-[26px] font-normal text-foreground mb-3">
                            7 років на ринку
                        </h3>
                        <p className="text-[18px] font-normal text-foreground">
                            Маємо великий досвід і тисячі успішних поїздок Україною та Європою.
                        </p>
                    </div>

                    {/* Вторая карточка - 250px */}
                    <div className="bg-[var(--color-secondary)] rounded-[10px] p-6 shadow-lg" style={{ width: '250px' }}>
                        <h3 className="text-[26px] font-normal text-white mb-3">
                            Сучасні мікроавтобуси
                        </h3>
                        <p className="text-[18px] font-normal text-white">
                            Комфортні салони, мультимедіа, кондиціонер, Wi-Fi та зарядки — усе для вашої зручності.
                        </p>
                    </div>

                    {/* Третья карточка - 388px */}
                    <div className="bg-white rounded-[10px] p-6 shadow-lg" style={{ width: '388px' }}>
                        <h3 className="text-[26px] font-normal text-foreground mb-3">
                            Безпека на першому місці
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/icons/check.png"
                                    alt="Check"
                                    width={50}
                                    height={50}
                                    className="flex-shrink-0 max-lg:w-[20px] max-lg:h-[20px]"
                                />
                                <p className="text-[18px] font-normal text-foreground">
                                    Регулярний техогляд
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/icons/check.png"
                                    alt="Check"
                                    width={50}
                                    height={50}
                                    className="flex-shrink-0 max-lg:w-[20px] max-lg:h-[20px]"
                                />
                                <p className="text-[18px] font-normal text-foreground">
                                    Професійні водії
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/icons/check.png"
                                    alt="Check"
                                    width={50}
                                    height={50}
                                    className="flex-shrink-0 max-lg:w-[20px] max-lg:h-[20px]"
                                />
                                <p className="text-[18px] font-normal text-foreground">
                                    Страхування пасажирів
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Второй ряд - две карточки пополам */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] mb-[30px]">
                    <div className="bg-[var(--color-secondary)] rounded-[10px] p-6 shadow-lg">
                        <h3 className="text-[26px] font-normal text-white mb-3">
                            Прозора комунікація
                        </h3>
                        <p className="text-[18px] font-normal text-white">
                            Жодних прихованих платежів. Чітко пояснюємо умови поїздки та ціни
                        </p>
                    </div>

                    <div className="bg-white rounded-[10px] p-6 shadow-lg">
                        <h3 className="text-[26px] font-normal text-foreground mb-3">
                            Легке бронювання
                        </h3>
                        <p className="text-[18px] font-normal text-foreground">
                            Заявка займає до 3 хвилин, а всі деталі ви отримуєте у зручному месенджер
                        </p>
                    </div>
                </div>

                {/* Третий ряд - одна карточка на всю ширину */}
                <div className="bg-white rounded-[10px] p-6 shadow-lg flex gap-6">
                    <div className="flex-1">
                        <h3 className="text-[26px] font-normal text-foreground mb-3">
                            Живе спілкування — без ботів
                        </h3>
                        <p className="text-[18px] font-normal text-foreground">
                            Усі заявки обробляють живі менеджери, які реально розуміють ваші потреби та оперативно дають відповіді.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <Image
                            src="/trust/2.png"
                            alt="Автопарк 2"
                            width={270}
                            height={210}
                            className="rounded-[10px] max-[1200px]:hidden"
                        />
                        <Image
                            src="/trust/3.png"
                            alt="Автопарк 3"
                            width={460}
                            height={210}
                            className="rounded-[10px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
