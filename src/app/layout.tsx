import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import Topbar from '@/components/Topbar';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();
    return (
        <html lang={locale}>
            <body className="antialiased">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Topbar />
                    <div className="container-custom mx-auto">
                        <Header />
                        {children}
                    </div>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
