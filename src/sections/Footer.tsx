import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import FooterParcelDropdown from '@/components/FooterParcelDropdown';

//TODO: Добавить ссылки на страницы

const Footer = async () => {
    const t = await getTranslations('footer');
    return (
        <footer id="footer" className="bg-white py-16 flex justify-center items-center">
            <div className="container-custom mx-auto px-4">
                <div className="lg:flex lg:gap-8 lg:justify-between max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1 gap-8 max-lg:text-center">

                    {/* About */}
                    <div className="w-full lg:flex-1 lg:min-w-[340px] max-lg:flex max-lg:flex-col max-lg:items-center">
                        <h3 className="text-[26px] font-medium text-foreground mb-6 max-lg:text-center">
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
                        <h3 className="text-[26px] font-medium text-foreground mb-6  max-lg:text-center">
                            {t('info.title')}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 max-lg:justify-items-center">
                            <div className="space-y-3">
                                <Link href="/#fleet" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.autopark')}
                                </Link>
                                <Link href="/#reviews" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.reviews')}
                                </Link>
                                <Link href="/about" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.about')}
                                </Link>
                                <Link href="/#useful" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.useful')}
                                </Link>
                            </div>
                            <div className="space-y-3">
                                <Link href="/" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.home')}
                                </Link>
                                <Link href="/#routes" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.routes')}
                                </Link>
                                <FooterParcelDropdown />
                                <Link href="/#routes" className="block text-[18px] font-regular text-foreground hover:text-[var(--color-primary)] transition-colors">
                                    {t('info.links.prices')}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Contacts */}
                    <div className="w-full max-lg:flex max-lg:flex-col max-lg:items-center">
                        <h3 className="text-[26px] font-medium text-foreground mb-6  max-lg:text-center ">
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
                        <h3 className="text-[26px] font-medium text-foreground mb-6  max-lg:text-center">
                            {t('social.title')}
                        </h3>
                        <div className="grid grid-cols-3 grid-rows-2 border border-white overflow-hidden max-lg:w-fit max-lg:mx-auto ">
                            <a href="viber://chat?number=%2B380982275197" className="flex items-center justify-center p-3 border-r border-b border-gray-300 hover:bg-gray-50 transition-colors" aria-label="Viber">
                                <Image
                                    src="/icons/viber.png"
                                    alt={t('social.alt.viber')}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="https://t.me/svit_perevezen" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 border-r border-b border-gray-300 hover:bg-gray-50 transition-colors" aria-label="Telegram">
                                <Image
                                    src="/icons/Telegram.png"
                                    alt={t('social.alt.telegram')}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="https://www.facebook.com/svitperevezen/?locale=uk_UA" className="flex items-center justify-center p-3 border-b border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/Facebook.png"
                                    alt={t('social.alt.facebook')}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=380982275197" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 border-r border-gray-300 hover:bg-gray-50 transition-colors" aria-label="WhatsApp">
                                <Image
                                    src="/icons/whatsapp.png"
                                    alt={t('social.alt.whatsapp')}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="https://www.instagram.com/svit_perevezen?igsh=M3p1cHJ6Nm9sb2cz" className="flex items-center justify-center p-3 border-r border-gray-300 hover:bg-gray-50 transition-colors">
                                <Image
                                    src="/icons/inst.png"
                                    alt={t('social.alt.instagram')}
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                />
                            </a>
                            <a href="https://www.tiktok.com/@svitsuchasnykhperevezen?_t=8rPqANCQSsZ" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 hover:bg-gray-50 transition-colors" aria-label="TikTok">
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
