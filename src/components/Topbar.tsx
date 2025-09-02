import Image from "next/image";
import LanguageSwitcher from './LanguageSwitcher';

const Topbar = () => {
    //TODO: add links
    return (
        <div className="flex items-center justify-center bg-[var(--color-secondary)] w-full py-2 sm:py-2 gap-1 sm:gap-3  max-[450px]:flex-col">
            <div className="flex items-center gap-1 sm:gap-3">
                <span className="text-white text-sm md:text-base">
                    Микола
                </span>
                <Image className="mx-1 sm:mx-2 max-sm:w-8 max-sm:h-8" quality={100} alt="kyivstar logo" src="/icons/kyivstar.png" width={32} height={32} />
                <a href="viber://chat?number=%2B380982275197" aria-label="Viber">
                    <Image className="mx-1 sm:mx-2 max-sm:w-8 max-sm:h-8" quality={100} alt="viber logo" src="/icons/viber.png" width={32} height={32} />
                </a>
                <a href="tel:+380982275197" className="text-white text-sm md:text-base mr-2 sm:mr-9 whitespace-nowrap">+38 (098) 227 51 97</a>
            </div>
            <div className="flex items-center gap-1 sm:gap-3">
                <a href="https://www.instagram.com/svit_perevezen?igsh=M3p1cHJ6Nm9sb2cz" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Image className="mx-1 sm:mx-2 max-sm:w-8 max-sm:h-8" quality={100} alt="instagram logo" src="/icons/inst.png" width={32} height={32} />
                </a>
                <a href="https://t.me/svit_perevezen" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                    <Image className="mx-1 sm:mx-2 max-sm:w-8 max-sm:h-8" quality={100} alt="telegram logo" src="/icons/tg.png" width={32} height={32} />
                </a>
                <a href="https://api.whatsapp.com/send?phone=380982275197" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <Image className="mx-1 sm:mx-2 max-sm:w-8 max-sm:h-8" quality={100} alt="whatsapp logo" src="/icons/whatsapp.png" width={32} height={32} />
                </a>
                <a href="https://www.tiktok.com/@svitsuchasnykhperevezen?_t=8rPqANCQSsZ" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <Image className="mx-1 sm:mx-2 max-sm:w-8 max-sm:h-8" quality={100} alt="tiktok logo" src="/icons/TikTok.png" width={32} height={32} />
                </a>
            </div>
            <div className="pr-2 max-[1000px]:hidden">
                <LanguageSwitcher size="sm" variant="white" />
            </div>
        </div>
    );
};

export default Topbar;