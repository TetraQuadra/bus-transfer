import Image from "next/image";

const Hero = () => {
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

    const destinations = [
        "Нідерланди",
        "Бельгія",
        "Польща"
    ];

    return (
        <section className="bg-background">
            <div className="">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col h-full">
                        <div>
                            <h1 className="text-[66px] leading-[1.01] text-foreground mb-4 lg:max-w-[580px] lg:w-full">
                                ПАСАЖИРСЬКІ<br />
                                ПЕРЕВЕЗЕННЯ <br /> <span className="whitespace-nowrap">ДО КРАЇН ЄВРОПИ</span>
                            </h1>

                            <p className="text-lg text-foreground mb-6 text-[26px]">
                                швидко, легко та безпечно
                            </p>
                        </div>

                        <div className="bg-white border border-gray-300 rounded-lg p-5 w-fit">
                            <p className="text-foreground font-medium mb-2 text-[20px]">Україна:</p>
                            <div className="flex items-center gap-4">
                                {destinations.map((destination, index) => (
                                    <div key={index} className="flex items-center justify-center gap-3">
                                        {(
                                            <Image
                                                src="/icons/arrowRight.svg"
                                                alt="arrow"
                                                width={45}
                                                height={16}
                                                className="w-[45px] h-4"
                                            />
                                        )}
                                        <span className="text-foreground font-regular text-[20px]">
                                            {destination}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Image Grid */}
                    <div className="lg:col-span-2">
                        <div className="flex flex-col gap-[14px] relative">
                            {/* Top row - 3 images */}
                            <div className="flex gap-3">
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={heroImages[0]}
                                        alt="Hero image 1"
                                        width={207}
                                        height={123}
                                        className="object-cover"
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
                            <div className="flex gap-3 relative">
                                <div className="flex flex-row gap-3 pl-[120px]">
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
                            <div className="flex gap-3">
                                <div className="relative overflow-hidden rounded-lg">
                                    <Image
                                        src={heroImages[5]}
                                        alt="Hero image 6"
                                        width={207}
                                        height={123}
                                        className="object-cover"
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
