'use client'

import { SwiperSlide } from 'swiper/react';
import GallerySlider from '@/components/GallerySlider';
import ArticleCard from '@/components/ArticleCard';

export type UsefulArticleItem = {
    id: string;
    image: string;
    title: string;
    date: string;
    description: string;
    href: string;
};

type Props = {
    title: string;
    readMoreLabel: string;
    items: UsefulArticleItem[];
};

export default function UsefulArticlesClient({ title, readMoreLabel, items }: Props) {
    return (
        <GallerySlider
            title={title}
            slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
            spaceBetween={20}
            autoplay={false}
            showPagination={false}
        >
            {items.map((article) => (
                <SwiperSlide key={article.id}>
                    <ArticleCard
                        id={article.id}
                        image={article.image}
                        title={article.title}
                        date={article.date}
                        description={article.description}
                        href={article.href}
                        buttonLabel={readMoreLabel}
                    />
                </SwiperSlide>
            ))}
        </GallerySlider>
    );
}


