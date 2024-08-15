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
                    <div className="flex">
                        <ul className="flex flex-col bg-gray-200 h-full w-[200px]">
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
                            <li className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${selectedMenu === "/react-hook" ? "bg-gray-300" : ""}`}>
                                <Link to="react-hook">React Hook Test</Link>
                            </li>
                            <li className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${selectedMenu === "/react-quill" ? "bg-gray-300" : ""}`}>
                                <Link to="react-quill">React Quill Test</Link>
                            </li>
                            <li className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${selectedMenu === "/change-character" ? "bg-gray-300" : ""}`}>
                                <Link to="change-character">Change Character</Link>
                            </li>
                            <li className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${selectedMenu === "/multi-upload" ? "bg-gray-300" : ""}`}>
                                <Link to="multi-upload">Multi Upload</Link>
                            </li>
                        </ul>
                        <div className="flex-1">
                            <Outlet />
                        </div>
                    </div>
                </nav>
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
