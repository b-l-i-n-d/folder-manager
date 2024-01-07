import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

import { BreadCrumbs, BreadCrumbsItem } from "./ui/breadcrumbs/breadcrumbs";
import { Button } from "./ui/button/button";
import { Heading } from "./ui/heading/heading";
import { TextInput } from "./ui/input/input";
import { Select } from "./ui/select/select";

import {
    FolderContext,
    FolderDispatchContext,
} from "../context/folder-context";
import { sortType } from "../types/types";
import { generateFolderName } from "../utils/generateName";
import { Folders } from "./folders";

export const Home = () => {
    const { folders, sort, currentFolderId, path } = useContext(FolderContext);
    const { setFolders, setSort, setCurrentFolderId, setPath } = useContext(
        FolderDispatchContext
    );
    const [folderName, setFolderName] = useState<string>("");
    const [error, setError] = useState<string>("");

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

    useEffect(() => {
        localStorage.setItem("sort", sort);
    }, [sort]);

    useEffect(() => {
        localStorage.setItem("folders", JSON.stringify(folders));
    }, [folders]);

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
                    label="Sort by name"
                />
            </div>

            <Folders />
        </div>
    );
};
