interface ReviewCardProps {
    id: string | number;
    name: string;
    date: string;
    text: string;
}

const ReviewCard = ({ name, date, text }: ReviewCardProps) => {
    return (
        <div className="bg-white rounded-[10px] p-5 shadow-lg h-[290px] flex flex-col max-w-[300px] mx-auto">
            <div className="mb-4">
                <h3 className="text-[18px] font-medium text-foreground mb-1">
                    {name}
                </h3>
                <p className="text-[14px] text-gray-500">
                    {date}
                </p>
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-[16px] text-foreground leading-relaxed line-clamp-7">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default ReviewCard;
