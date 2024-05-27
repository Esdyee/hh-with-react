type PrimaryButtonTheme = "dark" | "light" | "social" | "text";

interface PrimaryButtonProps {
    theme: PrimaryButtonTheme;
    isDisabled: boolean;
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const dark = "bg-primary text-white";
const light = "bg-white text-black";
const social = "bg-social text-white";
const text = "bg-mono200 text-white";
const disabledStyle = "disabled:bg-mono100 disabled:text-black disabled:border-none";

const color: Record<PrimaryButtonTheme, string> = {
    dark,
    light,
    social,
    text,
};

const PrimaryButton = ({
    theme,
    isDisabled,
    children,
    onClick,
    className,
}: PrimaryButtonProps) => {
    return (
        <button
            className={`
                w-full h-[59px]
                border rounded-primary-button
                ${disabledStyle}
                ${!isDisabled ? color[theme] : ''}
                ${className}
            `}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
