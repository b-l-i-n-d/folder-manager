import React, { MouseEventHandler } from "react";
import styles from "./card.module.css";

interface ICardProps {
    className?: string;
    children: React.ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Card = ({ className, children, onClick }: ICardProps) => {
    return (
        <div className={`${styles.card} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};
