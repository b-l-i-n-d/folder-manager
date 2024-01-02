import { ChangeEvent, FormEvent, useState } from "react";

import { FolderIcon, FoldersIcon } from "./icons";
import { BreadCrumbs, BreadCrumbsItem } from "./ui/breadcrumbs/breadcrumbs";
import { Button } from "./ui/button/button";
import { Card } from "./ui/card/card";
import { Heading } from "./ui/heading/heading";
import { TextInput } from "./ui/input/input";

export interface folderProps {
    [key: string]: folderProps | Record<string, never>;
}

export const Home = () => {
    const [folders, setFolders] = useState<folderProps>({});
    const [renderedFolders, setRenderedFolders] = useState<folderProps>({});
    const [folderName, setFolderName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [path, setPath] = useState<string[]>([]);

    const isExists = (name: string) => {
        const folder = renderedFolders[name];
        return folder !== undefined;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value);
    };

    const handleAddFolder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!folderName) {
            setError("Folder name is required");
            return;
        }

        if (isExists(folderName)) {
            setError("Folder already exists");
            return;
        }

        setError("");
        const updatedFolders = {
            ...renderedFolders,
            [folderName]: {},
        };
        setRenderedFolders(updatedFolders);
        setFolderName("");
        setFolders((prev) => {
            let currentFolder = prev;

            path.forEach((folder) => {
                currentFolder[folder] = currentFolder[folder] || {};
                currentFolder = currentFolder[folder];
            });

            currentFolder[folderName] = {};

            return { ...prev };
        });
    };

    const handleCurrentFolder = (name: string) => {
        addToPath(name);
        setRenderedFolders(renderedFolders[name]);
    };

    const addToPath = (name: string) => {
        setPath([...path, name]);
    };

    const navigateToHome = () => {
        setPath([]);
        setRenderedFolders(folders);
    };

    const handleNavigate = (index: number) => {
        const newPath = path.slice(0, index + 1);
        setPath(newPath);
        const folder = newPath[newPath.length - 1];
        setRenderedFolders(folders[folder]);
    };

    return (
        <div className="home">
            <Heading title="Folder Manager" subtitle="Manage your folders" />
            <form onSubmit={handleAddFolder} className="input--section">
                <TextInput
                    value={folderName}
                    onChange={handleInputChange}
                    label="Folder Name"
                    error={error}
                />

                <Button type="submit" onClick={() => {}} color="primary">
                    Add Folder
                </Button>
            </form>

            <BreadCrumbs>
                <BreadCrumbsItem onClick={navigateToHome}>Home</BreadCrumbsItem>
                {path.map((folder, index) => (
                    <BreadCrumbsItem
                        key={folder}
                        onClick={
                            index === path.length - 1
                                ? () => {}
                                : () => handleNavigate(index)
                        }
                    >
                        {folder}
                    </BreadCrumbsItem>
                ))}
            </BreadCrumbs>

            <div className="folders--section">
                {Object.keys(renderedFolders).length > 0 ? (
                    Object.keys(renderedFolders).map((folder) => (
                        <Card
                            key={folder}
                            onClick={() => handleCurrentFolder(folder)}
                        >
                            <div className="folder">
                                {Object.keys(renderedFolders[folder]).length >
                                0 ? (
                                    <FoldersIcon />
                                ) : (
                                    <FolderIcon />
                                )}
                                <p>{folder}</p>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p>No folder found.</p>
                )}
            </div>
        </div>
    );
};
