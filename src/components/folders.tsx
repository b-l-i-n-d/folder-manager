import { useContext } from "react";

import { Card } from "./ui/card/card";
import { Dropdown } from "./ui/dropdown/dropdown";

import {
    FolderContext,
    FolderDispatchContext,
} from "../context/folder-context";
import { ModalDispatchContext } from "../context/modal-context";

import {
    FolderIcon,
    FoldersIcon,
    MenuVerticalIcon,
    PenIcon,
    TrashIcon,
} from "./icons";

export const Folders = () => {
    const { folders, sort, currentFolderId, path } = useContext(FolderContext);
    const { setCurrentFolderId, setPath } = useContext(FolderDispatchContext);
    const { onOpen } = useContext(ModalDispatchContext);

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

    const handleCurrentFolder = (id: string) => {
        addToPath(id);
        setCurrentFolderId(id);
    };

    const addToPath = (id: string) => {
        setPath([...path, id]);
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
                                <FoldersIcon color={folders[id].color} />
                            ) : (
                                <FolderIcon color={folders[id].color} />
                            )}
                            <p>{folders[id].title}</p>
                        </div>
                        <Dropdown
                            className="folder-dropdown"
                            label={<MenuVerticalIcon size={16} />}
                            options={[
                                {
                                    label: (
                                        <div className="dropdown-menu">
                                            <PenIcon />
                                            <span>Edit Color</span>
                                        </div>
                                    ),
                                    onClick: () => onOpen("editColor", id),
                                },
                                {
                                    label: (
                                        <div className="dropdown-menu">
                                            <TrashIcon />
                                            <span>Delete</span>
                                        </div>
                                    ),
                                    onClick: () => onOpen("deleteFolder", id),
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
        </div>
    );
};
