import React, {
    MouseEvent,
    MouseEventHandler,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";
import styles from "./dropdown.module.css";

interface IDropdownProps {
    label: string | React.ReactNode;
    options: {
        label: string | React.ReactNode;
        color?: "primary" | "secondary" | "danger";
        onClick?: () => void;
    }[];
    color?: "ghost";
    isIcon?: boolean;
    className?: string;
}

export const Dropdown = ({
    label,
    options,
    color,
    isIcon,
    className,
}: IDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const id = useId().split(":")[1];
    const drop = useRef<HTMLDivElement>(null);

    const handleClick = (e: MouseEvent<Element>) => {
        if (
            !(e.target as HTMLElement).closest(`#${drop.current?.id}`) &&
            isOpen
        ) {
            setIsOpen(false);
        }
    };

    const handleDropdownOpen: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleDropdownMenuClick = (
        e: MouseEvent<HTMLLIElement>,
        onClick?: () => void
    ) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);

        onClick && onClick();
    };

    useEffect(() => {
        document.addEventListener("click", (e) => handleClick(e));
        return () => {
            document.removeEventListener("click", (e) => handleClick(e));
        };
    });

    return (
        <div ref={drop} id={id} className={`${styles.dropdown}`}>
            <button
                onClick={handleDropdownOpen}
                className={`${styles.button} ${className} ${
                    color === "ghost" && styles.ghost
                } ${isIcon && styles.icon}`}
            >
                {label}
            </button>
            {isOpen && (
                <ul className={styles.content}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={(e) =>
                                handleDropdownMenuClick(e, option.onClick)
                            }
                            className={`${styles.menu} ${
                                option.color === "danger" && styles.danger
                            }`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
