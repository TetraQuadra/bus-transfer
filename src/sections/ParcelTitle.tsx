type ParcelTitleProps = {
    title: string;
    subtitle: string;
};

const ParcelTitle = ({ title, subtitle }: ParcelTitleProps) => {
    return (
        <section className="w-full mb-15 md:mb-16">
            <div className="w-full bg-[var(--color-secondary)] rounded-[10px] px-4 py-6 md:py-10 text-center text-white relative ">
                <h1 className="font-regular text-[26px] md:text-[66px] leading-tight max-lg:max-w-[500px] mx-auto max-sm:max-w-[200px] ">
                    {title}
                </h1>
                <p className="font-regular text-[26px] md:text-[66px] leading-tight">
                    {subtitle}
                </p>
            </div>
        </section>
    );
};

export default ParcelTitle;
