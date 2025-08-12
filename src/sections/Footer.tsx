import Image from 'next/image';

//TODO: Добавить ссылки на страницы

const Footer = () => {
    return (
        <footer className="bg-white py-16 flex justify-center items-center">
            <div className="container-custom mx-auto px-4">
                <div className="flex gap-8 justify-between">

                    {/* Про компанію */}
                    <div className="lg:col-span-2 flex-1 max-w-[340px]">
                        <h3 className="text-[26px] font-medium text-foreground mb-6 text-center">
                            Про компанію
                        </h3>
                        <div className="space-y-4">
                            <p className="text-[18px] font-regular text-foreground">
                                Ми спеціалізуємося на пасажирських перевезеннях до Польщі, Німеччини, Нідерландів та Бельгії. Наші маршрути розроблені так, щоб забезпечити вам максимальний комфорт і безпеку під час подорожі.
                            </p>
                            <p className="text-[18px] font-regular text-foreground">
                                Ми прагнемо зробити кожну вашу поїздку легкою та безтурботною.
                            </p>
                        </div>
                    </div>

                    {/* Інформація */}
                    <div>
                        <h3 className="text-[26px] font-medium text-foreground mb-6 text-center">
                            Інформація
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    Автопарк
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    Відгуки
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    Про нас
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    Корисне
                                </a>
                            </div>
                            <div className="space-y-3">
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    Головна
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    Маршрути
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    Посилки
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    Ціни
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Контакти */}
                    <div>
                        <h3 className="text-[26px] font-medium text-foreground mb-6 text-center">
                            Контакти
                        </h3>
                        <a
                            href="tel:+380982275197"
                            className="text-[18px] font-regular text-foreground underline hover:text-[var(--color-primary)] transition-colors"
                        >
                            +38 (098) 227 51 97
                        </a>
                    </div>

                    {/* Соц. мережі */}
                    <div>
                        <h3 className="text-[26px] font-medium text-foreground mb-6 text-center">
                            Соц. мережі
                        </h3>
                        <div className="grid grid-cols-3 grid-rows-2 border border-white overflow-hidden ">
                            <a href="#" className="flex items-center justify-center p-3 border-r border-b border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/Viber.png"
                                    alt="Viber"
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 border-r border-b border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/Telegram.png"
                                    alt="Telegram"
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 border-b border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/Facebook.png"
                                    alt="Facebook"
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 border-r border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/WhatsApp.png"
                                    alt="WhatsApp"
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 border-r border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/inst.png"
                                    alt="Instagram"
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/TikTok.png"
                                    alt="TikTok"
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
