'use client'

import { SwiperSlide } from 'swiper/react';
import GallerySlider from '@/components/GallerySlider';
import ArticleCard from '@/components/ArticleCard';
import { useTranslations } from '@/hooks/useTranslations';

// TODO: ТУТ НАДО ВСТАВИТЬ ТЕКСТА НОРМАЛЬНЫЕ ТУТ ШЛЯПА ЩАС

const UsefulSection = () => {
    const t = useTranslations('useful');
    const articlesData = t.raw('articles') as Array<{
        id: number;
        image: string;
        title: string;
        date: string;
        description: string;
        href: string;
    }>;
    return (
        <section id='useful' className='mb-12'>
            <GallerySlider
                title={t('title')}
                slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
                spaceBetween={20}
                autoplay={false}
                showPagination={false}
            >
                {articlesData.map((article) => (
                    <SwiperSlide key={article.id}>
                        <ArticleCard
                            id={article.id}
                            image={article.image}
                            title={article.title}
                            date={article.date}
                            description={article.description}
                            href={article.href}
                            buttonLabel={t('readMore')}
                        />
                    </SwiperSlide>
                ))}
            </GallerySlider>
        </section>
    );
};

export default UsefulSection;
