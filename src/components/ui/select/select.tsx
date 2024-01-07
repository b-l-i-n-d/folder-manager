import { useId } from "react";
import styles from "./select.module.css";

interface SelectProps {
    title?: string;
    label?: string;
    options: {
        value: string;
        label: string;
    }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
}

export const Select = ({
    title,
    label,
    options,
    onChange,
    value,
    className,
}: SelectProps) => {
    const id = useId();
    return (
        <div className={styles.wrapper}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <select
                title={title}
                id={id}
                className={`${styles.select} ${className}`}
                value={value}
                onChange={onChange}
                name={title}
                aria-label={label}
                aria-labelledby={id}
            >
                {options.map((option) => (
                    <option
                        className={styles.option}
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
