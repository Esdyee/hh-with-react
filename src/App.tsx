import ReactDOM from "react-dom/client";
import "./App.css";
import TagList from "./components/TagList";
import useTimer from "./hooks/useTimer";
import { Link, Outlet, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
    const time = useTimer(0);
    const [selectedMenu, setSelectedMenu] = useState("/");

    // url의 경로를 가져온다.
    const path = useLocation().pathname;

    // url의 경로를 selectedMenu에 넣는다.
    const menuCheck = () => {
        if(path) {
            setSelectedMenu(path);
        }
    }
    
    useEffect(() => {
        menuCheck();
    }, [path]);


    return (
        <div>
            <div>
                <nav>
                    <p>{time}</p>
                    <ul className="flex bg-gray-200 w-full">
                        <li className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${selectedMenu === "/recoil" ? "bg-gray-300" : ""}`}>
                            <Link to="/recoil">Recoil Test</Link>
                        </li>
                        <li className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${selectedMenu === "/recoil-copy" ? "bg-gray-300" : ""}`}>
                            <Link to="recoil-copy">Recoil Test Copy</Link>
                        </li>
                        <li className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${selectedMenu === "/editor" ? "bg-gray-300" : ""}`}>
                            <Link to="editor">Editor Test</Link>
                        </li>
                        <li className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${selectedMenu === "/full-calendar" ? "bg-gray-300" : ""}`}>
                            <Link to="full-calendar">Full Calendar Test</Link>
                        </li>
                        <li className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${selectedMenu === "/ckeditor" ? "bg-gray-300" : ""}`}>
                            <Link to="ckeditor">CKEditor Test</Link>
                        </li>
                        <li className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${selectedMenu === "/react-calendar" ? "bg-gray-300" : ""}`}>
                            <Link to="react-calendar">React Calendar</Link>
                        </li>
                    </ul>
                </nav>
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
