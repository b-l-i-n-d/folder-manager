import styles from "./button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    block?: boolean;
    type?: "button" | "submit" | "reset";
    color?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled = false,
    className,
    block = false,
    type = "button",
    color = "primary",
}) => {
    return (
        <div>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`${styles.button} ${
                    color === "primary" && styles.primary
                } ${color === "secondary" && styles.secondary} ${className} ${
                    block && styles.block
                } ${disabled && styles.disabled}`}
            >
                {children}
            </button>
        </div>
    );
};
