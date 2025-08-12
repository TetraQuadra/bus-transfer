import Link from "next/link";

interface NavItem {
    label: string;
    href: string;
    isActive?: boolean;
}

interface NavigationProps {
    items: NavItem[];
    className?: string;
}

const Navigation = ({ items, className = "" }: NavigationProps) => {
    return (
        <nav className={`hidden md:flex items-center gap-[18px] ${className}`}>
            {items.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className={`p-2 transition-colors duration-200 hover:text-[var(--color-primary)]`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default Navigation;
