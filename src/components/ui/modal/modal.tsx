import React from "react";
import { XCrossIcon } from "../../icons";
import styles from "./modal.module.css";
import { createPortal } from "react-dom";

interface IModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement>;
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
