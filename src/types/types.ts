export interface IFolderProps {
    [key: string]: {
        title: string;
        color?: string;
        parentFolderId: string;
        childFolderIds: string[];
    };
}

export type TSortType = "" | "asc" | "desc";

export type TModalType = "deleteFolder" | "editColor";
