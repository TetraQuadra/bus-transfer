'use client'

import { SwiperSlide } from 'swiper/react';
import GallerySlider from '@/components/GallerySlider';
import ArticleCard from '@/components/ArticleCard';

// Данные статей
const articlesData = [
    {
        id: 1,
        image: "/articles/1.png",
        title: "Правила перевезення речей до Європи: що потрібно знати",
        date: "15.12.2024",
        description: "Міжнародне перевезення речей до країн Європейського Союзу – процес, що регламентується як українським законодавством, так і нормами ЄС. Якщо плануєте переїзд або транспортуєте особисті речі, важливо заздалегідь ознайомитися з правилами, аби уникнути затримок на кордоні, штрафів чи навіть конфіскації вантажу...",
        href: "/articles/transportation-rules-europe"
    },
    {
        id: 2,
        image: "/articles/1.png",
        title: "Як правильно підготувати документи для поїздки до Європи",
        date: "10.12.2024",
        description: "Підготовка документів для поїздки до країн Європейського Союзу потребує уваги до деталей. Від правильно оформлених документів залежить успішність вашого переїзду та дотримання всіх необхідних вимог законодавства...",
        href: "/articles/documents-preparation-europe"
    },
    {
        id: 3,
        image: "/articles/1.png",
        title: "Транспортування домашніх тварин: особливості та вимоги",
        date: "05.12.2024",
        description: "Перевезення домашніх тварин між країнами має свої особливості та вимоги. Для успішного транспортування потрібно дотримуватися ветеринарних норм та мати відповідні документи...",
        href: "/articles/pet-transportation-europe"
    },
    {
        id: 4,
        image: "/articles/1.png",
        title: "Вибір оптимального маршруту для перевезення до Європи",
        date: "01.12.2024",
        description: "Вибір правильного маршруту для перевезення до Європи може значно вплинути на час у дорозі, вартість та комфорт подорожі. Розглянемо основні фактори, які варто враховувати при плануванні маршруту...",
        href: "/articles/route-selection-europe"
    },
    {
        id: 5,
        image: "/articles/1.png",
        title: "Страхування вантажу при міжнародних перевезеннях",
        date: "28.11.2024",
        description: "Страхування вантажу є важливим аспектом міжнародних перевезень. Правильно оформлена страховка захистить ваші речі від пошкоджень, втрати або затримки в дорозі...",
        href: "/articles/cargo-insurance-international"
    }
];

const UsefulSection = () => {
    return (
        <GallerySlider
            title="КОРИСНЕ"
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
                    />
                </SwiperSlide>
            ))}
        </GallerySlider>
    );
};

export default UsefulSection;
