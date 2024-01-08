import { ChangeEvent, useId } from "react";
import styles from "./input.module.css";

interface ITextInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
    block?: boolean;
    required?: boolean;
}

export const TextInput = ({
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
}: ITextInputProps) => {
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
                onChange={onChange}
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
