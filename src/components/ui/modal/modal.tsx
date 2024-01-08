import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { XCrossIcon } from "../../icons";
import styles from "./modal.module.css";

interface IModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    title?: string;
    data?: Record<string, unknown>;
}

export const Modal = ({
    children,
    isOpen,
    onClose,
    className,
    title,
}: IModalProps) => {
    const handleClick = (e: Event) => {
        if (!(e.target as HTMLElement).closest(`.${styles.body}`)) {
            onClose();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        });
        document.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    onClose();
                }
            });
            document.removeEventListener("click", handleClick);
        };
    });

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <section className={styles.modal}>
            <div className={styles.body}>
                {/* Close btn */}
                <button className={styles.closeBtn} onClick={onClose}>
                    <XCrossIcon size={24} />
                </button>
                {/* Main content */}
                <div className={`${styles.content} ${className}`}>
                    <h1 className={styles.title}>{title}</h1>
                    {children}
                </div>
            </div>
        </section>,
        document.getElementById("modal-root") as HTMLElement
    );
};
