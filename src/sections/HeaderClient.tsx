"use client";

import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import Button from "@/components/Button";
import MobileMenu from "@/sections/MobileMenu";
import { useEffect, useState } from "react";

type NavigationItem = {
    label: string;
    href: string;
};

interface HeaderClientProps {
    navigationItems: NavigationItem[];
    bookLabel: string;
}

const HeaderClient = ({ navigationItems, bookLabel }: HeaderClientProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updateIsMobile = () => setIsMobile(window.innerWidth < 1000);
        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);
        return () => window.removeEventListener("resize", updateIsMobile);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 0);
        }
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const collapseToMobileBar = isMobile && isScrolled;

    if (collapseToMobileBar) {
        return (
            <>
                <div className="max-sm:h-[17px] sm:h-[42px]"></div>
                <header className="py-2 bg-transparent container-custom min-h-[50px]">
                    <div className="mx-auto">
                        <div className="flex items-center justify-end">
                            <div className="min-[1000px]:hidden bg-white shadow-md rounded-md p-1">
                                <MobileMenu items={navigationItems} bookLabel={bookLabel} />
                            </div>
                        </div>
                    </div>
                </header>
            </>
        );
    }

    return (
        <header className="py-2 bg-white shadow-sm w-full">
            <div className="mx-auto container-custom">
                <div className="flex items-center justify-between">
                    <Logo />
                    <Navigation items={navigationItems} />
                    <div className="hidden min-[1000px]:block">
                        <Button as="link" href="/#booking" className="max-w-[220px] max-[1100px]:max-w-[160px] min-w-[180px]" variant="primary" size="sm">
                            {bookLabel}
                        </Button>
                    </div>
                    <div className="min-[1000px]:hidden">
                        <MobileMenu items={navigationItems} bookLabel={bookLabel} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderClient;


