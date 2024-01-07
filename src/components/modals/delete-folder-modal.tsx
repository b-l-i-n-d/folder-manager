import { useContext } from "react";
import { FolderDispatchContext } from "../../context/folder-context";
import {
    ModalContext,
    ModalDispatchContext,
} from "../../context/modal-context";
import { Button } from "../ui/button/button";
import { Modal } from "../ui/modal/modal";

export const DeleteFolderMOdal = () => {
    const { setFolders } = useContext(FolderDispatchContext);
    const { isOpen, data: modalData, type } = useContext(ModalContext);
    const { onClose } = useContext(ModalDispatchContext);

    const isModalOpen = isOpen && type === "deleteFolder";

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

                onClose();
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

            onClose();
            return updatedFolders;
        });
    };
    return (
        <Modal
            isOpen={isModalOpen}
            onClose={onClose}
            title="Are you sure you want to delete this folder?"
            className="confirm-modal"
        >
            <div className="confirm-modal-btns">
                <Button onClick={onClose}>No</Button>
                <Button
                    color="danger"
                    onClick={() => handleDeleteFolder(modalData || "")}
                >
                    Yes
                </Button>
            </div>
        </Modal>
    );
};
