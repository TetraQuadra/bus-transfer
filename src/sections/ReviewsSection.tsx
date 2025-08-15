'use client'

import { SwiperSlide } from 'swiper/react';
import Button from '@/components/Button';
import GallerySlider from '@/components/GallerySlider';
import ReviewCard from '@/components/ReviewCard';
import { useTranslations } from '@/hooks/useTranslations';

const ReviewsSection = () => {
    const t = useTranslations('reviews');
    const items = t.raw('items') as Array<{ id: number; name: string; date: string; text: string; avatar: string }>;
    return (
        <>
            <GallerySlider title={t('title')}>
                {items.map((review) => (
                    <SwiperSlide key={review.id}>
                        <ReviewCard
                            id={review.id}
                            name={review.name}
                            date={review.date}
                            text={review.text}
                            avatar={review.avatar}
                        />
                    </SwiperSlide>
                ))}
            </GallerySlider>

            <div className="flex justify-center mt-12 lg:max-w-[280px] mx-auto">
                <Button
                    as="link"
                    href="https://www.google.com/maps/place/%D0%A1%D0%B2%D1%96%D1%82+%D0%A1%D1%83%D1%87%D0%B0%D1%81%D0%BD%D0%B8%D1%85+%D0%9F%D0%B5%D1%80%D0%B5%D0%B2%D0%B5%D0%B7%D0%B5%D0%BD%D1%8C/@49.7984121,30.1141283,17z/data=!3m1!4b1!4m6!3m5!1s0x40d343a17d2bf6a7:0xfcbecfcf462be5c0!8m2!3d49.7984122!4d30.1189992!16s%2Fg%2F11xmc9hf2k?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('more')}
                </Button>
            </div>
        </>
    );
};

export default ReviewsSection;
