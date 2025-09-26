import Link from "next/link";
import ParcelDropdown from "./ParcelDropdown";

interface NavItem {
    label: string;
    href: string;
    isActive?: boolean;
    isDropdown?: boolean;
}

interface NavigationProps {
    items: NavItem[];
    className?: string;
}

const Navigation = ({ items, className = "" }: NavigationProps) => {
    return (
        <nav className={`hidden max-[1000px]:hidden min-[1000px]:flex items-center gap-[18px] ${className}`}>
            {items.map((item, index) => {
                if (item.isDropdown) {
                    return <ParcelDropdown key={index} />;
                }
                return (
                    <Link
                        key={index}
                        href={item.href}
                        className={`p-2 transition-colors duration-200 hover:text-[var(--color-primary)]`}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Navigation;
