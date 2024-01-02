import styles from "./breadcrumbs.module.css";

interface BreadCrumbsProps {
    children?: React.ReactNode;
    className?: string;
}

export const BreadCrumbs = ({ className, children }: BreadCrumbsProps) => {
    return <ol className={`${styles.breadcrumbs} ${className}`}>{children}</ol>;
};

export const BreadCrumbsItem = ({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <>
            <span className={styles.separator}>/</span>
            <li className={styles.item} onClick={onClick}>
                {children}
            </li>
        </>
    );
};
