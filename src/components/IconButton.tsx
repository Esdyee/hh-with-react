interface IconButtonProps {
    alt: string;
    iconPath: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    width?: number;
    className?: string;
}

const IconButton = ({ alt, iconPath, onClick, width, className }: IconButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={"bg-transparent p-2 border-none outline-none" + className}
        >
            <img
                alt={alt}
                src={iconPath}
                style={width ? { width } : undefined} // width가 있으면 적용, 없으면 undefined
            />
        </button>
    );
};

export default IconButton;
