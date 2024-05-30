import ReactDOM from "react-dom/client";
import "./App.css";
import TagList from "./components/TagList";
import useTimer from "./hooks/useTimer";
import { Link, Outlet, Route } from "react-router-dom";

function App() {
    const time = useTimer(0);

    return (
        <div>
            <div>
                <nav>
                    <ul className="flex bg-gray-200 w-full">
                        <li className="bg-gray-200 p-2 rounded hover:bg-gray-300">
                            <Link to="/recoil">Recoil Test</Link>
                        </li>
                        <li className="bg-gray-200 p-2 rounded hover:bg-gray-300">
                            <Link to="recoil-copy">Recoil Test Copy</Link>
                        </li>
                        <li className="bg-gray-200 p-2 rounded hover:bg-gray-300">
                            <Link to="recoil-copy">Recoil Test Copy</Link>
                        </li>
                        <li className="bg-gray-200 p-2 rounded hover:bg-gray-300">
                            <Link to="editor">Editor Test</Link>
                        </li>
                        <li className="bg-gray-200 p-2 rounded hover:bg-gray-300">
                            <Link to="full-calendar">Full Calendar Test</Link>
                        </li>
                    </ul>
                </nav>
                <TagList
                    tags={["태그1", "태그2", "태그4"]}
                    onTagClick={(tag) => console.log(tag)}
                />
                <p>{time}</p>
                <Outlet />
            </div>
        </div>
    );
}

// const rootElement = document.getElementById("root");
// if (rootElement) {
//     const root = ReactDOM.createRoot(rootElement);
//     root.render(<App />);
// } else {
//     console.error("Failed to find the root element");
// }

export default App;
