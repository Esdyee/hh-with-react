interface TagButtonProps {
    isChecked: boolean;
    children: React.ReactNode;
    onClick: () => void;
}

const TagButton = ({ isChecked, children, onClick }: TagButtonProps) => {

    const checkedClass = isChecked
        ? "bg-white text-black"
        : "bg-dark-opacity text-white";

    return (
        <div
            className={`
                w-full h-[33px] px-[10px] rounded-tag-button
                flex items-center justify-center
                text-sm font-medium
                border border-black
                ${checkedClass}
            `}
            onClick={onClick}>
            {children}
        </div>
    );
};

export default TagButton;
