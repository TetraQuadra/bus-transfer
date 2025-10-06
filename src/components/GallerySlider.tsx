'use client'

import { useRef, ReactNode } from 'react';
import Image from 'next/image';
import { Swiper } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GallerySliderProps {
    children: ReactNode;
    title?: string;
    slidesPerView?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
    spaceBetween?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    showNavigation?: boolean;
    showPagination?: boolean;
    loop?: boolean;
    className?: string;
}

const GallerySlider = ({
    children,
    title,
    slidesPerView = { mobile: 1, tablet: 2, desktop: 3 },
    spaceBetween = 12,
    autoplay = true,
    autoplayDelay = 5000,
    showNavigation = true,
    showPagination = true,
    loop = true,
    className = ""
}: GallerySliderProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>(null);

    const handlePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    return (
        <section className={`w-full ${className}`}>
            <div className="">
                <div className="w-full">
                    {title && (
                        <h2 className="text-[40px] font-regular text-center text-foreground mb-12">
                            {title}
                        </h2>
                    )}

                    <div className="max-w-7xl mx-auto px-4">
                        <div className="relative">
                            {showNavigation && (
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[70px] h-[70px] bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-200 z-20 hidden lg:flex"
                                >
                                    <Image
                                        src="/icons/ArrowButtonRight.svg"
                                        alt="Попередні"
                                        width={24}
                                        height={24}
                                        quality={100}
                                        className="rotate-180"
                                    />
                                </button>
                            )}

                            <div className="px-4 lg:px-20">
                                <Swiper
                                    ref={swiperRef}
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={spaceBetween}
                                    slidesPerView={slidesPerView.mobile}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: slidesPerView.tablet,
                                            spaceBetween: spaceBetween,
                                        },
                                        1024: {
                                            slidesPerView: slidesPerView.desktop,
                                            spaceBetween: spaceBetween,
                                        },
                                    }}
                                    navigation={false}
                                    pagination={showPagination ? {
                                        clickable: true,
                                        el: '.swiper-pagination',
                                    } : false}
                                    autoplay={autoplay ? {
                                        delay: autoplayDelay,
                                        disableOnInteraction: false,
                                    } : false}
                                    loop={loop}
                                    className="gallery-swiper"
                                >
                                    {children}
                                </Swiper>
                            </div>

                            {showNavigation && (
                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[70px] h-[70px] bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-200 z-20 hidden lg:flex"
                                >
                                    <Image
                                        src="/icons/ArrowButtonRight.svg"
                                        alt="Наступні"
                                        width={24}
                                        height={24}
                                        quality={100}
                                    />
                                </button>
                            )}
                        </div>

                        {showNavigation && (
                            <div className="flex justify-center gap-12 mt-4 lg:hidden">
                                <button
                                    onClick={handlePrev}
                                    className="w-[80px] h-[80px] bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-200 lg:flex max-lg:w-[50px] max-lg:h-[50px]"
                                >
                                    <Image
                                        src="/icons/ArrowButtonRight.svg"
                                        alt="Попередні"
                                        width={20}
                                        height={20}
                                        quality={100}
                                        className="rotate-180"
                                    />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-[80px] h-[80px] bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-200 lg:flex max-lg:w-[50px] max-lg:h-[50px]"
                                >
                                    <Image
                                        src="/icons/ArrowButtonRight.svg"
                                        alt="Наступні"
                                        width={20}
                                        height={20}
                                        quality={100}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GallerySlider;
