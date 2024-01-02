import "./App.css";
import { Button } from "./components/ui/button/button";
import { TextInput } from "./components/ui/input/input";

function App() {
    return (
        <div>
            <h1>App</h1>

            <span>Text Input</span>
            <TextInput
                value=""
                onChange={() => {}}
                label="Folder Name"
                placeholder="Enter folder name"
                error="Folder name is required"
            />
            <Button onClick={() => {}}>Create Folder</Button>
        </div>
    );
}

export default App;
