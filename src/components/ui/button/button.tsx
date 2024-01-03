import styles from "./button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    block?: boolean;
    type?: "button" | "submit" | "reset";
    color?: "primary" | "secondary" | "danger";
    isIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled = false,
    className,
    block = false,
    type = "button",
    color,
    isIcon = false,
}) => {
    return (
        <div>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`${styles.button} ${isIcon && styles.icon} ${
                    color === "primary" && styles.primary
                } ${color === "secondary" && styles.secondary}
                ${color === "danger" && styles.danger}
                ${className} ${block && styles.block} ${
                    disabled && styles.disabled
                }`}
            >
                {children}
            </button>
        </div>
    );
};
