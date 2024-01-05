import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";

import { Button } from "./ui/button/button";
import { Heading } from "./ui/heading/heading";
import { TextInput } from "./ui/input/input";

import { generateFolderName } from "../utils/generateName";
import { FolderIcon, FoldersIcon, TrashIcon } from "./icons";
import { BreadCrumbs, BreadCrumbsItem } from "./ui/breadcrumbs/breadcrumbs";
import { Card } from "./ui/card/card";
import { Modal } from "./ui/modal/modal";
import { Select } from "./ui/select/select";

export interface folderProps {
    [key: string]: {
        title: string;
        parentFolderId: string;
        childFolderIds: string[];
    };
}

type sortType = "" | "asc" | "desc";

export const Home = () => {
    const [folders, setFolders] = useState<folderProps>({});
    const [currentFolderId, setCurrentFolderId] = useState<string>("");
    const [folderName, setFolderName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [path, setPath] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<string>("");
    const [sort, setSort] = useState<sortType>("");

    const folderIds = Object.keys(folders);
    const renderedFolderIds = (
        !currentFolderId
            ? folderIds.filter((id) => !folders[id].parentFolderId)
            : folders[currentFolderId].childFolderIds
    ).sort((a, b) => {
        if (sort === "asc") {
            return folders[a].title.localeCompare(folders[b].title);
        } else if (sort === "desc") {
            return folders[b].title.localeCompare(folders[a].title);
        } else {
            return 0;
        }
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value.trim());
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value as sortType);
    };

    const handleAddFolder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!folderName) {
            setError("Folder name is required");
            return;
        }

        const rennderedFoldersNames = renderedFolderIds.map(
            (id) => folders[id].title
        );

        const generatedFolderName = generateFolderName(
            folderName,
            rennderedFoldersNames
        );

        setError("");
        setFolders((prev) => {
            if (!currentFolderId) {
                return {
                    ...prev,
                    [Date.now().toString()]: {
                        title: generatedFolderName,
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
                    title: generatedFolderName,
                    parentFolderId: currentFolderId,
                    childFolderIds: [],
                },
            };
        });
        setFolderName("");
    };

    const handleDeleteFolder = (folderIdToDelete: string) => {
        setFolders((prevFolders) => {
            const { parentFolderId, childFolderIds } =
                prevFolders[folderIdToDelete];

            if (!parentFolderId) {
                const updatedFolders = { ...prevFolders };
                delete updatedFolders[folderIdToDelete];

                childFolderIds.forEach((childId) => {
                    delete updatedFolders[childId];
                });

                setIsModalOpen(false);
                return updatedFolders;
            }

            const parentFolder = prevFolders[parentFolderId];
            const updatedChildFolderIds = parentFolder.childFolderIds.filter(
                (childId) => childId !== folderIdToDelete
            );

            const updatedFolders = {
                ...prevFolders,
                [parentFolderId]: {
                    ...parentFolder,
                    childFolderIds: updatedChildFolderIds,
                },
            };
            delete updatedFolders[folderIdToDelete];

            childFolderIds.forEach((childId) => {
                delete updatedFolders[childId];
            });

            setIsModalOpen(false);
            return updatedFolders;
        });
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

    useEffect(() => {
        const localSort = localStorage.getItem("sort") as sortType;

        if (localSort) {
            setSort(localSort);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("sort", sort);
    }, [sort]);

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

                <Button className="submit-button" type="submit" color="primary">
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

            <div className="filters-section">
                <Select
                    options={[
                        {
                            value: "",
                            label: "None",
                        },
                        {
                            value: "asc",
                            label: "Ascending",
                        },
                        {
                            value: "desc",
                            label: "Descending",
                        },
                    ]}
                    value={sort}
                    onChange={handleSelectChange}
                    label="Sort by"
                />
            </div>

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
