import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    w?: number;
    as?: "button" | "link";
    href?: string;
    target?: string;
    rel?: string;
}

const Button = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    onClick,
    type = "button",
    disabled = false,
    as = "button",
    href,
    target,
    rel,
}: ButtonProps) => {
    const baseClasses = `inline-flex items-center justify-center font-regular rounded-[10px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full text-center`;

    const variantClasses = {
        primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] focus:ring-[var(--color-primary)]",
        secondary: "bg-[var(--white)] text-black hover:text-white hover:bg-[var(--color-primary)] focus:ring-[var(--color-secondary)]",
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 h-[50px]",
        md: "px-4 py-2 h-[73px] text-[25px]",
        lg: "px-6 py-3 h-[100px]"
    };

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

    const commonProps = {
        className: `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`,
    };

    if (as === "link" && href) {
        return (
            <Link
                href={href}
                target={target}
                rel={rel}
                {...commonProps}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            {...commonProps}
        >
            {children}
        </button>
    );
};

export default Button;
