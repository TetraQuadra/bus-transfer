import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import Topbar from '@/components/Topbar';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();

    // TODO: set locale from user system settings
    return (
        <html lang={locale}>
            <body className="antialiased">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <div className="fixed top-3 right-3 z-[9999]">
                        <LanguageSwitcher />
                    </div>
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
