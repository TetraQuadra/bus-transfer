import Image from "next/image";
import LanguageSwitcher from './LanguageSwitcher';

const Topbar = () => {
    return (
        <div className="flex items-center justify-center bg-[var(--color-secondary)] w-full py-2 sm:py-2 gap-1 sm:gap-3 ">
            <div className="flex items-center gap-1 sm:gap-3">
                <span className="text-white text-sm md:text-base">
                    Микола
                </span>
                <Image className="mx-1 sm:mx-2 max-sm:w-4 max-sm:h-4" quality={100} alt="kyivstar logo" src="/icons/kyivstar.svg" width={32} height={32} />
                <a href="tel:+380982275197" className="text-white text-sm md:text-base mr-2 sm:mr-9 whitespace-nowrap">+38 (098) 227 51 97</a>
            </div>
            <div className="flex items-center gap-1 sm:gap-3">
                <a href="viber://chat?number=%2B380982275197" aria-label="Viber">
                    <Image className="mx-1 sm:mx-2 max-sm:w-4 max-sm:h-4" quality={100} alt="viber logo" src="/icons/viber.svg" width={32} height={32} />
                </a>
                <a href="https://www.instagram.com/svit_perevezen?igsh=M3p1cHJ6Nm9sb2cz" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Image className="mx-1 sm:mx-2 max-sm:w-4 max-sm:h-4" quality={100} alt="instagram logo" src="/icons/Instagram.svg" width={32} height={32} />
                </a>
                <a href="https://t.me/svit_perevezen" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                    <Image className="mx-1 sm:mx-2 max-sm:w-4 max-sm:h-4" quality={100} alt="telegram logo" src="/icons/telegram.svg" width={32} height={32} />
                </a>
                <a href="https://api.whatsapp.com/send?phone=380982275197" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <Image className="mx-1 sm:mx-2 max-sm:w-4 max-sm:h-4" quality={100} alt="whatsapp logo" src="/icons/whatsapp.svg" width={32} height={32} />
                </a>
            </div>
            <div className="pr-2 max-[1000px]:hidden">
                <LanguageSwitcher size="sm" variant="white" />
            </div>
        </div>
    );
};

export default Topbar;