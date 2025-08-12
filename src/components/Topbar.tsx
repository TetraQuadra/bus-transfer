import Image from "next/image";

const Topbar = () => {
    //TODO: add links
    return (
        <div className="flex gap-1 items-center justify-center py-2 bg-[var(--color-secondary)] w-full">
            <span className="text-white">
                Микола
            </span>
            <Image className="mx-2" quality={100} alt="kyivstar logo" src="/icons/kyivstar.png" width={32} height={32} />
            <Image className="mx-2 " quality={100} alt="viber logo" src="/icons/viber.png" width={32} height={32} />
            <a href="tel:+380982275197" className="text-white mr-[36px]">+38 (098) 227 51 97</a>
            <Image className="mx-2" quality={100} alt="instagram logo" src="/icons/inst.png" width={32} height={32} />
            <Image className="mx-2" quality={100} alt="telegram logo" src="/icons/tg.png" width={32} height={32} />
            <Image className="mx-2" quality={100} alt="whatsapp logo" src="/icons/whatsapp.png" width={32} height={32} />
        </div>
    );
};

export default Topbar;