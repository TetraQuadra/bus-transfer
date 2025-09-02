import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { listArticleSlugs, readArticleFile, type SupportedLocale } from '@/lib/articles-mdx';
import { notFound } from 'next/navigation';
import styles from './Article.module.css';
import BookingSection from '@/sections/BookingSection';
import UsefulSection from '@/sections/UsefulSection';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const slugs = await listArticleSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = (await getLocale()) as SupportedLocale;
    const { slug } = await params;
    const order = Array.from(new Set<SupportedLocale>([locale, 'uk', 'ru', 'en'] as SupportedLocale[]));
    let article: Awaited<ReturnType<typeof readArticleFile>> | undefined;
    for (const loc of order) {
        try { article = await readArticleFile(loc, slug); break; } catch { }
    }
    if (!article) return {};
    return {
        title: article.title,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            images: article.image ? [article.image] : undefined,
            type: 'article'
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.description,
            images: article.image ? [article.image] : undefined
        }
    };
}

export default async function ArticlePage({ params }: Props) {
    const locale = (await getLocale()) as SupportedLocale;
    const { slug } = await params;
    const order = Array.from(new Set<SupportedLocale>([locale, 'uk', 'ru', 'en'] as SupportedLocale[]));
    let article: Awaited<ReturnType<typeof readArticleFile>> | undefined;
    for (const loc of order) {
        try { article = await readArticleFile(loc, slug); break; } catch { }
    }
    if (!article) return notFound();
    const t = await getTranslations('articles');
    return (
        <main className="container-custom py-8 min-h-screen">
            <article className={styles.article}>
                <h1 className="text-3xl font-semibold mb-4">{article.title}</h1>
                {article.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={article.image} alt={article.title} className="w-full h-auto mb-6" />
                )}
                <MDXRemote
                    source={article.content}
                />
            </article>
            <BookingSection />
            <UsefulSection title={t('title')} />
        </main>
    );
}


