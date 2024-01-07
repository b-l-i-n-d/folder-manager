export interface folderProps {
    [key: string]: {
        title: string;
        parentFolderId: string;
        childFolderIds: string[];
    };
}

export type sortType = "" | "asc" | "desc";
