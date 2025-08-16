import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

//TODO: Добавить ссылки на страницы

const Footer = async () => {
    const t = await getTranslations('footer');
    return (
        <footer className="bg-white py-16 flex justify-center items-center">
            <div className="container-custom mx-auto px-4">
                <div className="lg:flex lg:gap-8 lg:justify-between max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1 gap-8 max-lg:text-center">

                    {/* About */}
                    <div className="w-full lg:flex-1 lg:max-w-[340px] max-lg:flex max-lg:flex-col max-lg:items-center">
                        <h3 className="text-[26px] font-medium text-foreground mb-6 text-center">
                            {t('about.title')}
                        </h3>
                        <div className="space-y-4">
                            <p className="text-[18px] font-regular text-foreground">
                                {t('about.p1')}
                            </p>
                            <p className="text-[18px] font-regular text-foreground">
                                {t('about.p2')}
                            </p>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="w-full max-lg:flex max-lg:flex-col max-lg:items-center">
                        <h3 className="text-[26px] font-medium text-foreground mb-6 text-center">
                            {t('info.title')}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 max-lg:justify-items-center">
                            <div className="space-y-3">
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.autopark')}
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.reviews')}
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.about')}
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.useful')}
                                </a>
                            </div>
                            <div className="space-y-3">
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.home')}
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.routes')}
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.parcels')}
                                </a>
                                <a href="#" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.prices')}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contacts */}
                    <div className="w-full max-lg:flex max-lg:flex-col max-lg:items-center">
                        <h3 className="text-[26px] font-medium text-foreground mb-6 text-center">
                            {t('contacts.title')}
                        </h3>
                        <a
                            href="tel:+380982275197"
                            className="text-[18px] font-regular text-foreground underline hover:text-[var(--color-primary)] transition-colors"
                        >
                            +38 (098) 227 51 97
                        </a>
                    </div>

                    {/* Social */}
                    <div className="w-full max-lg:flex max-lg:flex-col max-lg:items-center">
                        <h3 className="text-[26px] font-medium text-foreground mb-6 text-center">
                            {t('social.title')}
                        </h3>
                        <div className="grid grid-cols-3 grid-rows-2 border border-white overflow-hidden max-lg:w-fit max-lg:mx-auto ">
                            <a href="#" className="flex items-center justify-center p-3 border-r border-b border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/Viber.png"
                                    alt={t('social.alt.viber')}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 border-r border-b border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/Telegram.png"
                                    alt={t('social.alt.telegram')}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 border-b border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/Facebook.png"
                                    alt={t('social.alt.facebook')}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 border-r border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/WhatsApp.png"
                                    alt={t('social.alt.whatsapp')}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 border-r border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/inst.png"
                                    alt={t('social.alt.instagram')}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/TikTok.png"
                                    alt={t('social.alt.tiktok')}
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
