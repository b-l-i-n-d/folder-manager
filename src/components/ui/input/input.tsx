import { useId } from "react";
import styles from "./input.module.css";

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
    block?: boolean;
    required?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    label,
    placeholder,
    type = "text",
    disabled = false,
    error,
    className,
    block = false,
    required = false,
}) => {
    const id = useId();
    return (
        <div className={styles.wrapper}>
            <label htmlFor={id} className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`${styles.input} ${block && styles.block} ${
                    error && styles.invalid
                } ${className}`}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};
