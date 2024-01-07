import { useContext, useState } from "react";

import { Button } from "./ui/button/button";
import { Card } from "./ui/card/card";
import { Dropdown } from "./ui/dropdown/dropdown";
import { Modal } from "./ui/modal/modal";

import {
    FolderContext,
    FolderDispatchContext,
} from "../context/folder-context";
import { FolderIcon, FoldersIcon, MenuVerticalIcon, TrashIcon } from "./icons";

export const Folders = () => {
    const { folders, sort, currentFolderId, path } = useContext(FolderContext);
    const { setFolders, setCurrentFolderId, setPath } = useContext(
        FolderDispatchContext
    );
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<string>("");

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

    const handleModalOpen = (folder: string) => {
        setIsModalOpen(true);
        setModalData(folder);
    };

    const handleModalClose = () => {
        setModalData("");
        setIsModalOpen(false);
    };

    return (
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
                        {/* <Button
                        isIcon
                        color="danger"
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            handleModalOpen(id, e);
                        }}
                        className="folder-delete-btn"
                    >
                        <TrashIcon size={18} />
                    </Button> */}
                        <Dropdown
                            className="folder-dropdown"
                            label={<MenuVerticalIcon size={16} />}
                            options={[
                                // {
                                //     label: (
                                //         <div className="dropdown-menu">
                                //             <PenIcon />
                                //             <span>Edit</span>
                                //         </div>
                                //     ),
                                // },
                                {
                                    label: (
                                        <div className="dropdown-menu">
                                            <TrashIcon />
                                            <span>Delete</span>
                                        </div>
                                    ),
                                    onClick: () => {
                                        handleModalOpen(id);
                                    },
                                    color: "danger",
                                },
                            ]}
                            color="ghost"
                        />
                    </Card>
                ))
            ) : (
                <p>No folders.</p>
            )}
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
