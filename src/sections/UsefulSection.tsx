import UsefulArticlesClient from './UsefulArticlesClient';
import { getLocale, getTranslations } from 'next-intl/server';
import { listArticleSlugs, readArticleFile, type SupportedLocale } from '@/lib/articles-mdx';

type Props = { title?: string };

const UsefulSection = async ({ title }: Props) => {
    const t = await getTranslations('useful');
    const locale = (await getLocale()) as SupportedLocale;

    const slugs = await listArticleSlugs();
    const order = Array.from(new Set<SupportedLocale>([locale, 'uk', 'ru', 'en'] as SupportedLocale[]));

    const articles = await Promise.all(
        slugs.map(async (slug) => {
            for (const loc of order) {
                try {
                    const a = await readArticleFile(loc, slug);
                    return {
                        id: slug,
                        image: a.image || '/articles/1.png',
                        title: a.title,
                        date: a.date || '',
                        description: a.description || '',
                        href: `/articles/${slug}`
                    };
                } catch { }
            }
            return null;
        })
    );

    const items = (articles.filter(Boolean) as Array<{
        id: string;
        image: string;
        title: string;
        date: string;
        description: string;
        href: string;
    }>).sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    return (
        <section id='useful' className='w-full mb-15 md:mb-16'>
            <UsefulArticlesClient title={title ?? t('title')} readMoreLabel={t('readMore')} items={items} />
        </section>
    );
};

export default UsefulSection;
