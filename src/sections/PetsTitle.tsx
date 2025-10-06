import Image from "next/image";

type PetsTitleProps = {
    title: string;
    subtitle: string;
};

const PetsTitle = ({ title, subtitle }: PetsTitleProps) => {
    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="w-full bg-[var(--color-secondary)] rounded-[10px] px-4 py-6 md:py-10 text-center text-white relative ">
                <h1 className="font-regular text-[26px] md:text-[66px] leading-tight max-lg:max-w-[500px] mx-auto max-sm:max-w-[200px] ">
                    {title}
                </h1>
                <p className="font-regular text-[26px] md:text-[66px] leading-tight">
                    {subtitle}
                </p>
                <Image src="/pets/paws.png" alt="Pets Title" width={175} height={122} quality={100} className="absolute bottom-0 left-[40px] max-lg:bottom-0 max-lg:left-[6px] max-md:w-[102px] max-md:h-[71px]" />
                <Image src="/pets/paws.png" alt="Pets Title" width={175} height={122} quality={100} className="absolute bottom-[60px] right-[-26px] rotate-270 max-lg:top-0 max-lg:right-[-20px] max-lg:rotate-180 max-md:top-0 max-md:right-[-8px] max-md:rotate-180 max-md:w-[102px] max-md:h-[71px]" />
            </div>
        </section>
    );
};

export default PetsTitle;


