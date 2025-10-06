import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo.png" alt="Logo" width={85} height={85} quality={100} className="max-sm:w-[65px] max-sm:h-[65px]" />
        </Link>
    );
};

export default Logo;
