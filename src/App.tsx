import "./App.css";
import { Home } from "./components/home";
import { DeleteFolderMOdal } from "./components/modals/delete-folder-modal";
import { EditColorModal } from "./components/modals/edit-color-modal";
import { FolderProvider } from "./context/folder-context";
import { ModalProvider } from "./context/modal-context";

function App() {
    return (
        <ModalProvider>
            <FolderProvider>
                <div className="layout">
                    <Home />
                </div>
                <DeleteFolderMOdal />
                <EditColorModal />
            </FolderProvider>
        </ModalProvider>
    );
}

export default App;
