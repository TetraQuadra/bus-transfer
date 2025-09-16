import { getTranslations } from 'next-intl/server';
import HeaderClient from '@/sections/HeaderClient';

const Header = async () => {
    const t = await getTranslations('header');

    const navigationItems = [
        { label: t('navigation.handover'), href: "/#parcels" },
        { label: t('navigation.fleet'), href: "/#fleet" },
        { label: t('navigation.services'), href: "/#services" },
        { label: t('navigation.about'), href: "/about" },
        { label: t('navigation.contacts'), href: "/#footer" },
        { label: t('navigation.helpful'), href: "/#useful" },
        { label: t('navigation.reviews'), href: "/#reviews" }
    ];

    return (
        <HeaderClient navigationItems={navigationItems} bookLabel={t('book')} />
    );
};

export default Header;
