import { SVGProps } from "react";

export type TIconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const FolderIcon = ({
    size = 36,
    width,
    height,
    color = "#000000",
    ...props
}: TIconSvgProps) => (
    <svg
        height={size || height}
        width={size || width}
        viewBox="0 0 24 24"
        fill={color}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
);

export const FoldersIcon = ({
    size = 36,
    width,
    height,
    color = "#000000",
    ...props
}: TIconSvgProps) => (
    <svg
        height={size || height}
        width={size || width}
        viewBox="0 0 24 24"
        fill={color}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z" />
        <path d="M2 8v11a2 2 0 0 0 2 2h14" />
    </svg>
);

export const TrashIcon = ({
    size = 16,
    width,
    height,
    ...props
}: TIconSvgProps) => (
    <svg
        height={size || height}
        width={size || width}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
);

export const XCrossIcon = ({
    size = 16,
    width,
    height,
    ...props
}: TIconSvgProps) => (
    <svg
        height={size || height}
        width={size || width}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
    </svg>
);

export const PenIcon = ({
    size = 16,
    width,
    height,
    ...props
}: TIconSvgProps) => (
    <svg
        height={size || height}
        width={size || width}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
);

export const MenuVerticalIcon = ({
    size = 16,
    height,
    width,
    ...props
}: TIconSvgProps) => (
    <svg
        height={size || height}
        width={size || width}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
    </svg>
);
