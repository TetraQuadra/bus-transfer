import Image from 'next/image';

export type InfoCardItem = {
    id: string | number;
    imageSrc: string;
    imageAlt?: string;
    title: string;
    description: string;
};

type InfoCardGridProps = {
    items: InfoCardItem[];
    className?: string;
};

const InfoCardGrid = ({ items, className }: InfoCardGridProps) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 ${className ?? ''}`}>
            {items.map((item) => (
                <div key={item.id} className="w-full bg-white rounded-[10px] shadow-sm p-4 md:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-[144px] rounded-[10px]">
                            <img src={item.imageSrc} alt={item.imageAlt ?? item.title} width={144} className="w-[134px] h-auto object-contain" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[22px] md:text-[24px] font-medium text-foreground mb-2">{item.title}</h3>
                            <p className="text-[16px] md:text-[18px] text-foreground/80">{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InfoCardGrid;


