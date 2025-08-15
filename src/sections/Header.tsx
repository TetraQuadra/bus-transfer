import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import Button from "@/components/Button";
import { getTranslations } from 'next-intl/server';

const Header = async () => {
    const t = await getTranslations('header');

    const navigationItems = [
        { label: t('navigation.handover'), href: "/handover" },
        { label: t('navigation.fleet'), href: "/fleet" },
        { label: t('navigation.services'), href: "/services" },
        { label: t('navigation.about'), href: "/about" },
        { label: t('navigation.contacts'), href: "/contacts" },
        { label: t('navigation.helpful'), href: "/helpful" },
        { label: t('navigation.reviews'), href: "/reviews" }
    ];

    return (
        <header className="py-2">
            <div className="mx-auto">
                <div className="flex items-center justify-between">
                    <Logo />
                    <Navigation items={navigationItems} />
                    <Button className="max-w-[220px] max-[1100px]:max-w-[160px]" variant="primary" size="sm">
                        {t('book')}
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
