import IconButton from "./IconButton";

interface NavigationBarProps {
    isDark: boolean;
    title: string;
    onBack: () => void;
    onClose: () => void;
    isShowTitle: boolean;
    isShowBackButton: boolean;
    isShowCloseButton: boolean;
}
const NavigationBar = ({
    isDark,
    title,
    onBack,
    onClose,
    isShowTitle,
    isShowBackButton,
    isShowCloseButton,
}: NavigationBarProps) => {
    return (
        <div className={"w-full flex items-center"}>
            <div>
                {isShowBackButton && (
                    <IconButton
                        iconPath={isDark ? "/icons/back-dark.svg" : "/icons/back.svg"}
                        onClick={onBack}
                        alt="뒤로"
                    />
                )}
            </div>
            <div className={"flex-1 p-2 text-2xl"}>
                {isShowTitle && <div className={isDark ? "text-white" : "text-black"}>{title}</div>}
            </div>
            <div>
                {isShowCloseButton && (
                    <IconButton
                        width={16}
                        iconPath={isDark ? "/icons/close-dark.svg" : "/icons/close.svg"}
                        onClick={onClose}
                        alt="닫기"
                    />
                )}
            </div>
        </div>
    );
};

export default NavigationBar;
