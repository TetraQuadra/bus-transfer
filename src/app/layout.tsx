import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import Topbar from '@/components/Topbar';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    metadataBase: new URL('https://svitsuchasnykhperevezen.com'),
    alternates: { canonical: '/' }
};

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();
    return (
        <html lang={locale}
            suppressHydrationWarning={true}
            data-lt-installed={true} >
            <body className="antialiased">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Script id="organization-jsonld" type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                '@context': 'https://schema.org',
                                '@type': 'Organization',
                                name: 'Світ Сучасних Перевезень',
                                url: 'https://svitsuchasnykhperevezen.com',
                                logo: 'https://svitsuchasnykhperevezen.com/logo.png',
                                sameAs: [
                                    'https://www.facebook.com/svitperevezen/?locale=uk_UA',
                                    'https://www.instagram.com/svit_perevezen?igsh=M3p1cHJ6Nm9sb2cz',
                                    'https://t.me/svit_perevezen',
                                    'https://www.tiktok.com/@svitsuchasnykhperevezen?_t=8rPqANCQSsZ'
                                ],
                                contactPoint: [{
                                    '@type': 'ContactPoint',
                                    telephone: '+380982275197',
                                    contactType: 'customer support',
                                    availableLanguage: ['uk', 'ru', 'en']
                                }]
                            })
                        }}
                    />
                    <div className="sticky top-0 z-50 mb-4">
                        <Topbar />
                        <div className="">
                            <div className="mx-auto">
                                <Header />
                            </div>
                        </div>
                    </div>
                    <div className="container-custom mx-auto">
                        {children}
                    </div>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
