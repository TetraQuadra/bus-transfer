'use client'

import { useRef } from 'react';
import Image from 'next/image';
import { REVIEWS } from '@/const/reviews';
import Button from '@/components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewsSection = () => {
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
        <section className="pb-16 w-full">
            <div className="">
                <div className="w-full">
                    <h2 className="text-[40px] font-regular text-center text-foreground mb-12">
                        {REVIEWS.title}
                    </h2>

                    <div className="max-w-7xl mx-auto px-4">
                        <div className="relative">
                            <button
                                onClick={handlePrev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-[70px] h-[70px] bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-200 z-20 hidden lg:flex"
                            >
                                <Image
                                    src="/icons/ArrowButtonRight.svg"
                                    alt="Попередні"
                                    width={24}
                                    height={24}
                                    className="rotate-180"
                                />
                            </button>

                            <div className="px-4 lg:px-20">
                                <Swiper
                                    ref={swiperRef}
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={12}
                                    slidesPerView={1}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 12,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 12,
                                        },
                                    }}
                                    navigation={false}
                                    pagination={{
                                        clickable: true,
                                        el: '.swiper-pagination',
                                    }}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    loop={true}
                                    className="reviews-swiper"
                                >
                                    {REVIEWS.items.map((review) => (
                                        <SwiperSlide key={review.id}>
                                            <div className="bg-white rounded-[10px] p-5 shadow-lg h-[290px] flex flex-col max-w-[300px] mx-auto">
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={review.avatar}
                                                            alt={review.name}
                                                            width={48}
                                                            height={48}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-[18px] font-medium text-foreground mb-1">
                                                            {review.name}
                                                        </h3>
                                                        <p className="text-[14px] text-gray-500">
                                                            {review.date}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="text-[16px] text-foreground leading-relaxed line-clamp-7">
                                                        {review.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <button
                                onClick={handleNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-[70px] h-[70px] bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-200 z-20 hidden lg:flex"
                            >
                                <Image
                                    src="/icons/ArrowButtonRight.svg"
                                    alt="Наступні"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>

                        <div className="flex justify-center gap-12 mt-8 lg:hidden">
                            <button
                                onClick={handlePrev}
                                className="w-[80px] h-[80px] bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-200"
                            >
                                <Image
                                    src="/icons/ArrowButtonRight.svg"
                                    alt="Попередні"
                                    width={20}
                                    height={20}
                                    className="rotate-180"
                                />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-[80px] h-[80px] bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] transition-colors duration-200"
                            >
                                <Image
                                    src="/icons/ArrowButtonRight.svg"
                                    alt="Наступні"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>

                        <div className="flex justify-center mt-12 lg:max-w-[280px] mx-auto">
                            <Button
                                as="link"
                                href="https://www.google.com/maps/place/%D0%A1%D0%B2%D1%96%D1%82+%D0%A1%D1%83%D1%87%D0%B0%D1%81%D0%BD%D0%B8%D1%85+%D0%9F%D0%B5%D1%80%D0%B5%D0%B2%D0%B5%D0%B7%D0%B5%D0%BD%D1%8C/@49.7984121,30.1141283,17z/data=!3m1!4b1!4m6!3m5!1s0x40d343a17d2bf6a7:0xfcbecfcf462be5c0!8m2!3d49.7984122!4d30.1189992!16s%2Fg%2F11xmc9hf2k?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Більше відгуків
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
