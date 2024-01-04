import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

import { Button } from "./ui/button/button";
import { Heading } from "./ui/heading/heading";
import { TextInput } from "./ui/input/input";

import { FolderIcon, FoldersIcon, TrashIcon } from "./icons";
import { BreadCrumbs, BreadCrumbsItem } from "./ui/breadcrumbs/breadcrumbs";
import { Card } from "./ui/card/card";
import { Modal } from "./ui/modal/modal";

export interface folderProps {
    [key: string]: {
        title: string;
        parentFolderId: string;
        childFolderIds: string[];
    };
}

export const Home = () => {
    const [folders, setFolders] = useState<folderProps>({
        "1": {
            title: "Folder 1",
            parentFolderId: "",
            childFolderIds: ["2"],
        },
        "2": {
            title: "Folder 2",
            parentFolderId: "1",
            childFolderIds: [],
        },
        "3": {
            title: "Folder 3",
            parentFolderId: "",
            childFolderIds: [],
        },
    });
    const [currentFolderId, setCurrentFolderId] = useState<string>("");
    const [folderName, setFolderName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [path, setPath] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<string>("");

    const folderIds = Object.keys(folders);
    const renderedFolderIds = !currentFolderId
        ? folderIds.filter((id) => !folders[id].parentFolderId)
        : folders[currentFolderId].childFolderIds;

    // const isExists = (name: string) => {
    //     const folder = currentFolders[name];
    //     return folder !== undefined;
    // };
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value);
    };

    const handleAddFolder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!folderName) {
            setError("Folder name is required");
            return;
        }

        // if (isExists(folderName)) {
        //     setError("Folder already exists");
        //     return;
        // }

        setError("");
        setFolders((prev) => {
            if (!currentFolderId) {
                return {
                    ...prev,
                    [Date.now().toString()]: {
                        title: folderName,
                        parentFolderId: "",
                        childFolderIds: [],
                    },
                };
            }

            const currentFolder = prev[currentFolderId];
            const newFolderId = Date.now().toString();
            return {
                ...prev,
                [currentFolderId]: {
                    ...currentFolder,
                    childFolderIds: [
                        ...currentFolder.childFolderIds,
                        newFolderId,
                    ],
                },
                [newFolderId]: {
                    title: folderName,
                    parentFolderId: currentFolderId,
                    childFolderIds: [],
                },
            };
        });
        setFolderName("");
    };

    const handleDeleteFolder = (id: string) => {
        const { parentFolderId } = folders[id];

        if (!parentFolderId) {
            setFolders((prev) => {
                const { childFolderIds } = prev[id];
                const newFolders = { ...prev };
                delete newFolders[id];

                childFolderIds.forEach((folderId) => {
                    delete newFolders[folderId];
                });

                return newFolders;
            });
            setIsModalOpen(false);
            return;
        }

        setFolders((prev) => {
            const parent = prev[parentFolderId];
            const childFolderIds = parent.childFolderIds.filter(
                (folderId) => folderId !== id
            );

            return {
                ...prev,
                [parentFolderId]: {
                    ...parent,
                    childFolderIds,
                },
            };
        });

        setIsModalOpen(false);
    };

    const handleCurrentFolder = (id: string) => {
        addToPath(id);
        setCurrentFolderId(id);
    };

    const addToPath = (id: string) => {
        setPath([...path, id]);
    };

    const navigateToHome = () => {
        setPath([]);
        setCurrentFolderId("");
    };

    const handleNavigate = (id: string, index: number) => {
        const temp = [...path];
        // indexof id
        if (index === -1 || index === temp.length - 1) {
            return;
        }

        temp.splice(index + 1, temp.length - index - 1);
        setPath(temp);
        setCurrentFolderId(id);
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
                {path.map((id, index) => (
                    <BreadCrumbsItem
                        key={id}
                        onClick={() => handleNavigate(id, index)}
                    >
                        {folders[id].title}
                    </BreadCrumbsItem>
                ))}
            </BreadCrumbs>

            <div className="folders-section">
                {renderedFolderIds.length > 0 ? (
                    renderedFolderIds.map((id) => (
                        <Card
                            key={id}
                            className="folder-card"
                            onClick={() => handleCurrentFolder(id)}
                        >
                            <div className="folder">
                                {folders[id].childFolderIds.length > 0 ? (
                                    <FoldersIcon />
                                ) : (
                                    <FolderIcon />
                                )}
                                <p>{folders[id].title}</p>
                            </div>
                            <Button
                                isIcon
                                color="danger"
                                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                    handleModalOpen(id, e);
                                }}
                                className="folder-delete-btn"
                            >
                                <TrashIcon size={18} />
                            </Button>
                        </Card>
                    ))
                ) : (
                    <p>No folders.</p>
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
