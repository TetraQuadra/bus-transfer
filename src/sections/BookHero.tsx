type BookHeroProps = {
    title: string;
    subtitle: string;
};

const BookHero = ({ title, subtitle }: BookHeroProps) => {
    return (
        <section className="w-full mb-8 md:mb-16">
            <div className="w-full bg-[var(--color-secondary)] rounded-[10px] px-4 py-6 md:py-10 text-center text-white">
                <h1 className="font-regular text-[26px] md:text-[66px] leading-tight mb-2">
                    {title}
                </h1>
                <p className="font-regular text-[16px] md:text-[26px]">
                    {subtitle}
                </p>
            </div>
        </section>
    );
};

export default BookHero;


