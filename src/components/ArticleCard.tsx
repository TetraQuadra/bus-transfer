import Image from 'next/image';
import Button from './Button';

interface ArticleCardProps {
    id: string | number;
    image: string;
    title: string;
    date: string;
    description: string;
    href: string;
    buttonLabel?: string;
}

const ArticleCard = ({ image, title, date, description, href, buttonLabel }: ArticleCardProps) => {
    return (
        <div className="bg-white rounded-[10px] shadow-lg max-w-[400px] mx-auto h-[450px] flex flex-col overflow-hidden">
            <div className="relative h-48 overflow-hidden flex-shrink-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    quality={100}
                    className="object-cover"
                />
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                    <h3 className="text-[18px] font-medium text-foreground mb-2 line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-[14px] text-gray-500 mb-3">
                        {date}
                    </p>
                    <p className="text-[16px] text-foreground leading-relaxed line-clamp-3 mb-4">
                        {description}
                    </p>
                </div>
                <Button
                    as="link"
                    href={href}
                    size="sm"
                    variant="primary"
                >
                    {buttonLabel ?? 'Читати повністю'}
                </Button>
            </div>
        </div>
    );
};

export default ArticleCard;
