import Image from "next/image";
import { getTranslations } from 'next-intl/server';

//TODO: 900-1000px говняк пофиксить

const Hero = async () => {
    const t = await getTranslations('hero');
    const heroImages = [
        "/hero/1.png",
        "/hero/2.png",
        "/hero/3.png",
        "/hero/4.png",
        "/hero/5.png",
        "/hero/6.png",
        "/hero/7.png",
        "/hero/8.png"
    ];

    const titleLine1 = t('title.line1');
    const titleLine2 = t('title.line2');
    const titleLine3 = t('title.line3');
    const subtitle = t('subtitle');
    const label = t('label');
    const destinations = t.raw('destinations') as string[];

    return (
        <section className="bg-background">
            <div className="">
                <div className="flex justify-between items-start max-[900px]:flex-col">
                    <div className="flex flex-col h-full max-[900px]:w-full max-[900px]:items-start max-[900px]:flex-row max-[900px]:gap-4 max-md:flex-col">
                        <div className="max-[900px]:text-center max-[900px]:w-[80%]">
                            <h1 className="text-[62px] leading-[1.01] text-foreground mb-4 lg:max-w-[580px] lg:w-full max-[1200px]:text-[40px] max-[900px]:text-start max-[900px]:text-[50px] max-[900px]:font-medium max-sm:text-[45px]">
                                {titleLine1}<br />
                                {titleLine2} <br /> <span className=" max-sm:whitespace-normal">{titleLine3}</span>
                            </h1>

                            <p className="text-lg text-foreground mb-6 text-[26px] max-[900px]:text-start max-md:mb-1 max-sm:text-[20px]">
                                {subtitle}
                            </p>
                        </div>

                        <div className="bg-white border border-gray-300 rounded-lg p-5 w-fit max-[900px]:w-full max-[900px]:items-start max-[900px]:p-3 max-md:w-auto max-md:mx-auto max-md:mb-4">
                            <p className="text-foreground font-medium mb-2 text-[20px]">{label}</p>
                            <div className="flex items-center gap-3 max-[1200px]:grid max-[1200px]:grid-cols-2 max-md:flex max-sm:grid max-sm:grid-cols-2">
                                {destinations.map((destination, index) => (
                                    <div key={index} className="flex items-center justify-start gap-3 max-[900px]:gap-1">
                                        {(
                                            <Image
                                                src="/icons/arrowRight.svg"
                                                alt="arrow"
                                                width={35}
                                                height={8}
                                                className="max-[900px]:w-[20px] max-[900px]:h-[8px] max-md:w-[35px] max-md:h-[8px]"
                                            />
                                        )}
                                        <span className="text-foreground font-regular text-[16px]">
                                            {destination}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Image Grid */}
                    <div className="lg:col-span-2 max-[900px]:w-full max-[900px]:justify-center max-[900px]:items-center">
                        <div className="flex flex-col gap-[14px] relative ">
                            {/* Top row - 3 images */}
                            <div className="flex gap-3 max-[900px]:justify-center">
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={heroImages[0]}
                                        alt="Hero image 1"
                                        width={207}
                                        height={123}
                                        className="object-cover max-sm:hidden"
                                        priority
                                    />
                                </div>
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={heroImages[1]}
                                        alt="Hero image 2"
                                        width={207}
                                        height={123}
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={heroImages[2]}
                                        alt="Hero image 3"
                                        width={207}
                                        height={123}
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Middle row - 2 images with left padding */}
                            <div className="flex gap-3 relative max-[900px]:justify-center">
                                <div className="flex flex-row gap-3 pl-[120px] max-sm:pl-0">
                                    <div className="relative overflow-hidden rounded-lg ">
                                        <Image
                                            src={heroImages[3]}
                                            alt="Hero image 4"
                                            width={180}
                                            height={123}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="relative overflow-hidden rounded-lg">
                                        <Image
                                            src={heroImages[4]}
                                            alt="Hero image 4"
                                            width={281}
                                            height={123}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom row - 3 images */}
                            <div className="flex gap-3 max-[900px]:justify-center">
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={heroImages[5]}
                                        alt="Hero image 6"
                                        width={207}
                                        height={123}
                                        className="object-cover max-sm:hidden"
                                    />
                                </div>
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={heroImages[6]}
                                        alt="Hero image 7"
                                        width={207}
                                        height={123}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={heroImages[7]}
                                        alt="Hero image 8"
                                        width={207}
                                        height={123}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
