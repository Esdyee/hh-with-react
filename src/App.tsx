import ReactDOM from "react-dom/client";
import "./App.css";
import TagList from "./components/TagList";
import useTimer from "./hooks/useTimer";
import { Link, Outlet } from "react-router-dom";

function App() {
    const time = useTimer(0);

    return (
        <div>
            <TagList
                tags={["태그1", "태그2", "태그3"]}
                onTagClick={(tag) => console.log(tag)}
            />
            <p>{time}</p>

            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="recoil">Recoil Test</Link>
                        </li>
                        <li>
                            <Link to="recoil-copy">Recoil Test Copy</Link>
                        </li>
                        <li>
                            <Link to="editor">Editor Test</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error("Failed to find the root element");
}

export default App;
