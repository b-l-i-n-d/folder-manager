import React, { createContext, useEffect, useState } from "react";
import { folderProps, sortType } from "../types/types";

interface IFolderContext {
    folders: folderProps;
    sort: string;
    currentFolderId: string;
    path: string[];
}

interface IFolderDispatchContext {
    setFolders: React.Dispatch<React.SetStateAction<folderProps>>;
    setSort: React.Dispatch<React.SetStateAction<sortType>>;
    setCurrentFolderId: React.Dispatch<React.SetStateAction<string>>;
    setPath: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FolderContext = createContext<IFolderContext>({
    folders: {},
    sort: "",
    currentFolderId: "",
    path: [],
});
export const FolderDispatchContext = createContext<IFolderDispatchContext>({
    setFolders: {} as React.Dispatch<React.SetStateAction<folderProps>>,
    setSort: {} as React.Dispatch<React.SetStateAction<sortType>>,
    setCurrentFolderId: {} as React.Dispatch<React.SetStateAction<string>>,
    setPath: {} as React.Dispatch<React.SetStateAction<string[]>>,
});

export const FolderProvider = ({ children }: { children: React.ReactNode }) => {
    const localFolders = JSON.parse(localStorage.getItem("folders") || "{}");
    const localSort = localStorage.getItem("sort") as sortType;
    const [folders, setFolders] = useState<folderProps>(localFolders);
    const [sort, setSort] = useState<sortType>(localSort);
    const [currentFolderId, setCurrentFolderId] = useState<string>("");
    const [path, setPath] = useState<string[]>([]);

    // useEffect(() => {
    //     const localFolders = JSON.parse(localStorage.getItem("folders") || "{}");
    //     const localSort = localStorage.getItem("sort") as sortType;

    //     setFolders(localFolders);
    //     setSort(localSort);
    // }, [])

    useEffect(() => {
        localStorage.setItem("sort", sort);
    }, [sort]);

    useEffect(() => {
        localStorage.setItem("folders", JSON.stringify(folders));
    }, [folders]);

    return (
        <FolderContext.Provider
            value={{
                folders,
                sort,
                currentFolderId,
                path,
            }}
        >
            <FolderDispatchContext.Provider
                value={{
                    setFolders,
                    setSort,
                    setCurrentFolderId,
                    setPath,
                }}
            >
                {children}
            </FolderDispatchContext.Provider>
        </FolderContext.Provider>
    );
};
