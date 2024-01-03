import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

import { BreadCrumbs, BreadCrumbsItem } from "./ui/breadcrumbs/breadcrumbs";
import { Button } from "./ui/button/button";
import { Card } from "./ui/card/card";
import { Heading } from "./ui/heading/heading";
import { TextInput } from "./ui/input/input";

import { FolderIcon, FoldersIcon, TrashIcon } from "./icons";
import { Modal } from "./ui/modal/modal";

export interface folderProps {
    [key: string]: folderProps | Record<string, never>;
}

export const Home = () => {
    const [folders, setFolders] = useState<folderProps>({});
    const [currentFolders, setCurrentFolders] = useState<folderProps>({});
    const [folderName, setFolderName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [path, setPath] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<string>("");

    const isExists = (name: string) => {
        const folder = currentFolders[name];
        return folder !== undefined;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value);
    };

    const handleAddFolder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!folderName) {
            setError("Folder name is required");
            return;
        }

        if (isExists(folderName)) {
            setError("Folder already exists");
            return;
        }

        setError("");
        setCurrentFolders((prev) => {
            return {
                ...prev,
                [folderName]: {},
            };
        });
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

    const handleDeleteFolder = (name: string) => {
        setCurrentFolders((prev) => {
            const temp = { ...prev };
            delete temp[name];
            return temp;
        });

        setFolders((prev) => {
            let currentFolder = prev;

            path.forEach((folder) => {
                currentFolder[folder] = currentFolder[folder] || {};
                currentFolder = currentFolder[folder];
            });

            delete currentFolder[name];
            return { ...prev };
        });
        setIsModalOpen(false);
    };

    const handleCurrentFolder = (name: string) => {
        addToPath(name);
        setCurrentFolders(currentFolders[name]);
    };

    const addToPath = (name: string) => {
        setPath([...path, name]);
    };

    const navigateToHome = () => {
        setPath([]);
        setCurrentFolders(folders);
    };

    const handleNavigate = (index: number) => {
        let temp = { ...folders };

        path.slice(0, index + 1).forEach((p) => {
            temp = temp[p];
        });

        const newPath = path.slice(0, index + 1);
        setPath(newPath);
        setCurrentFolders(temp);
    };

    const handleModalOpen = (
        folder: string,
        e: MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();

        setIsModalOpen(true);
        setModalData(folder);
    };

    const handleModalClose = () => {
        setModalData("");
        setIsModalOpen(false);
    };

    return (
        <div className="home">
            <Heading title="Folder Manager" subtitle="Manage your folders" />
            <form onSubmit={handleAddFolder} className="input-section">
                <TextInput
                    value={folderName}
                    onChange={handleInputChange}
                    label="Folder Name"
                    error={error}
                    block
                    required
                />

                <Button
                    className="submit-button"
                    type="submit"
                    onClick={() => {}}
                    color="primary"
                >
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

            <div className="folders-section">
                {Object.keys(currentFolders).length > 0 ? (
                    Object.keys(currentFolders).map((folder) => (
                        <Card
                            key={folder}
                            onClick={() => handleCurrentFolder(folder)}
                            className="folder-card"
                        >
                            <div className="folder">
                                {Object.keys(currentFolders[folder]).length >
                                0 ? (
                                    <FoldersIcon />
                                ) : (
                                    <FolderIcon />
                                )}
                                <p>{folder}</p>
                            </div>
                            <Button
                                isIcon
                                color="danger"
                                // onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                //     handleDeleteFolder(folder, e);
                                // }}
                                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                    handleModalOpen(folder, e);
                                }}
                                className="folder-delete-btn"
                            >
                                <TrashIcon size={18} />
                            </Button>
                        </Card>
                    ))
                ) : (
                    <p>No folder found.</p>
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Are you sure you want to delete this folder?"
                className="confirm-modal"
            >
                <div className="confirm-modal-btns">
                    <Button onClick={handleModalClose}>No</Button>
                    <Button
                        color="danger"
                        onClick={() => handleDeleteFolder(modalData)}
                    >
                        Yes
                    </Button>
                </div>
            </Modal>
        </div>
    );
};
