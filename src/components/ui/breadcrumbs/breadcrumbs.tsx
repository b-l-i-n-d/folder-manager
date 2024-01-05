import styles from "./breadcrumbs.module.css";

interface BreadCrumbsProps {
    children: React.ReactNode;
    className?: string;
}

export const BreadCrumbs = ({ className, children }: BreadCrumbsProps) => {
    return (
        <nav aria-level={1}>
            <ol className={`${styles.breadcrumbs} ${className}`}>{children}</ol>
        </nav>
    );
};

export const BreadCrumbsItem = ({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <li className={styles.item}>
            <span className={styles.separator}>/</span>
            <a onClick={onClick}>{children}</a>
        </li>
    );
};
