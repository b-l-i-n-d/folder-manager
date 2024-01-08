import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Button } from "../ui/button/button";
import { Modal } from "../ui/modal/modal";

import {
    useFolderContext,
    useFolderDispatchContext,
} from "../../context/folder-context";
import {
    useModalContext,
    useModalDispatchContext,
} from "../../context/modal-context";

const predefinedColor: {
    [key: string]: string;
} = {
    red: "#ff0000",
    yellow: "#ffff00",
    green: "#00ff00",
    default: "#000000",
};

export const EditColorModal = () => {
    const { isOpen, type, data } = useModalContext();
    const { onClose } = useModalDispatchContext();
    const { setFolders } = useFolderDispatchContext();
    const { folders } = useFolderContext();

    const [color, setColor] = useState<string>("#000000");

    const isModalOpen = isOpen && type === "editColor";

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };

    const handlePredefinedColorClick = (color: string) => {
        setColor(predefinedColor[color]);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFolders((prevFolders) => {
            const upldatedFolders = data
                ? {
                      ...prevFolders,
                      [data]: {
                          ...prevFolders[data],
                          color: color,
                      },
                  }
                : prevFolders;

            return upldatedFolders;
        });

        onClose();
        setColor("#000000");
    };

    useEffect(() => {
        if (data) {
            setColor(folders[data].color || "#000000");
        }
    }, [data, folders]);

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={onClose}
            title="Change Folder Color"
        >
            <div className="edit-color-modal">
                <form
                    id="color-form"
                    className="color-form"
                    onSubmit={onSubmit}
                >
                    <input
                        value={color}
                        type="color"
                        onChange={handleColorChange}
                    />

                    <span>{color}</span>
                </form>

                <div className="predefined-colors">
                    <Button onClick={() => handlePredefinedColorClick("red")}>
                        <div className="color-btn">
                            <div className="color red"></div>
                            Red
                        </div>
                    </Button>
                    <Button
                        onClick={() => handlePredefinedColorClick("yellow")}
                    >
                        <div className="color-btn">
                            <div className="color yellow"></div>
                            Yellow
                        </div>
                    </Button>
                    <Button onClick={() => handlePredefinedColorClick("green")}>
                        <div className="color-btn">
                            <div className="color green"></div>
                            Green
                        </div>
                    </Button>
                    <Button
                        onClick={() => handlePredefinedColorClick("default")}
                    >
                        Default
                    </Button>
                </div>

                <div className="edit-color-modal-btns">
                    <Button onClick={onClose}>Close</Button>
                    <Button form="color-form" color="primary" type="submit">
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
