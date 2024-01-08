import "./App.css";

import { Home } from "./components/home";

import { FolderProvider } from "./context/folder-context";
import { ModalProvider } from "./context/modal-context";

function App() {
    return (
        <FolderProvider>
            <ModalProvider>
                <div className="layout">
                    <Home />
                </div>
            </ModalProvider>
        </FolderProvider>
    );
}

export default App;
