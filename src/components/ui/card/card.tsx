import React, { MouseEventHandler } from "react";
import styles from "./card.module.css";

interface CardProps {
    className?: string;
    children: React.ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Card = ({ className, children, onClick }: CardProps) => {
    return (
        <div className={`${styles.card} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};
