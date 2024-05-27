import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import IconButton from "./IconButton";

interface DefaultTextFieldProps {
    id: string;
    errorMessage?: string;
    isError: boolean;
    iconPath: string;
    iconAlt: string;
    onIconClick: React.MouseEventHandler<HTMLButtonElement>;
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
}

const DefaultTextField = ({
    id,
    errorMessage,
    isError,
    iconPath,
    iconAlt,
    onIconClick,
    placeholder,
    onChange,
    value,
}: DefaultTextFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const borderColor = isFocused
        ? "border-secondary"
        : !value
          ? "border-mono300"
          : "border-primary";
    return (
        <div className="relative">
            <div
                className={`text-primary border-b ${borderColor}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                <input
                    id={id}
                    className="bg-transparent outline-none"
                    placeholder={placeholder}
                    type="text"
                    value={value}
                    onChange={onChange}
                />
                {value && (
                    <IconButton
                        alt={iconAlt}
                        iconPath={iconPath}
                        onClick={onIconClick}
                    />
                )}
            </div>

            {isError && (
                <ErrorMessage>
                    {errorMessage || "정의되지 않은 에러 메세지"}
                </ErrorMessage>
            )}
        </div>
    );
};

export default DefaultTextField;
