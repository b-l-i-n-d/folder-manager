import "./App.css";
import { Home } from "./components/home";
import { FolderProvider } from "./context/folder-context";

function App() {
    return (
        <FolderProvider>
            <div className="layout">
                <Home />
            </div>
        </FolderProvider>
    );
}

export default App;
