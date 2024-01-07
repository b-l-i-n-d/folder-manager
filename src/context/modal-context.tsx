import { createContext, useState } from "react";
import { TModalType } from "../types/types";

interface IModalContext {
    type: TModalType | null;
    isOpen: boolean;
    data?: string;
}

interface IModalDispatchContext {
    onOpen: (modalType: TModalType, data?: string) => void;
    onClose: () => void;
}

export const ModalContext = createContext<IModalContext>({
    type: null,
    isOpen: false,
});

export const ModalDispatchContext = createContext<IModalDispatchContext>({
    onOpen: () => {},
    onClose: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<TModalType | null>(null);
    const [data, setData] = useState<string>("");

    const onOpen = (type: TModalType, data?: string) => {
        setModalType(type);
        setData(data || "");
        setIsOpen(true);
    };
    const onClose = () => {
        setModalType(null);
        setData("");
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                type: modalType,
                data,
            }}
        >
            <ModalDispatchContext.Provider
                value={{
                    onOpen,
                    onClose,
                }}
            >
                {children}
            </ModalDispatchContext.Provider>
        </ModalContext.Provider>
    );
};
