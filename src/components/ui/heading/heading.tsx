import styles from "./heading.module.css";

interface IHeadingProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export const Heading = ({ title, subtitle, className }: IHeadingProps) => {
    return (
        <div className={`${styles.heading} ${className}`}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
        </div>
    );
};
