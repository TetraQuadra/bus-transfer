'use client';

import GallerySlider from '@/components/GallerySlider';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useTranslations } from '@/hooks/useTranslations';

const IMAGES = Array.from({ length: 9 }, (_, i) => `/about/${i + 1}.jpg`);

const AboutGallery = () => {
    const t = useTranslations('about');
    return (
        <section className="w-full mb-15 md:mb-16">
            <GallerySlider title={t('gallery')} slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }} showPagination loop autoplay className="">
                {IMAGES.map((src, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="w-full h-full flex items-center justify-center">
                            <Image src={src} alt="about" width={800} height={500} className="w-full h-auto object-cover rounded-xl" />
                        </div>
                    </SwiperSlide>
                ))}
            </GallerySlider>
        </section>
    );
};

export default AboutGallery;


