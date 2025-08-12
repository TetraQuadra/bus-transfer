import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import Button from "@/components/Button";

//TODO: add links, add burger menu
const navigationItems = [
    {
        label: "Передачі",
        href: "/transfers",
    },
    {
        label: "Автопарк",
        href: "/fleet",
    },
    {
        label: "Послуги",
        href: "/services",
    },
    {
        label: "Про нас",
        href: "/about",
    },
    {
        label: "Контакти",
        href: "/contacts",
    },
    {
        label: "Корисне",
        href: "/useful",
    },
    {
        label: "Відгуки",
        href: "/reviews",
    },
];

const Header = () => {
    return (
        <header className="py-2">
            <div className="mx-auto">
                <div className="flex items-center justify-between">
                    <Logo />
                    <Navigation items={navigationItems} />
                    <Button className="max-w-[220px] max-[1100px]:max-w-[160px]" variant="primary" size="sm">
                        Забронювати
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
