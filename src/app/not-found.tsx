import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
const NotFound = async () => {
    const t = await getTranslations('notFound');
    return (
        <section className="w-full mb-8 md:mb-16">
            <div className="container-custom py-16 text-center">
                <h1 className="text-[48px] max-md:text-[32px] font-regular text-foreground mb-3">{t('title')}</h1>
                <p className="text-[20px] max-md:text-[16px] text-foreground/70 mb-8">{t('description')}</p>
                <Link href="/" className="inline-block bg-[var(--color-secondary)] text-white rounded-[10px] px-6 py-3 text-[16px]">
                    {t('backHome')}
                </Link>
            </div>
        </section>
    );
};

export default NotFound;


