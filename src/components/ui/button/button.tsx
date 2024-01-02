import styles from "./button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    block?: boolean;
    type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled = false,
    className,
    block = false,
    type = "button",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${className} ${block && "w-full"}`}
        >
            {children}
        </button>
    );
};
