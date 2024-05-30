import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router.tsx";
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/700.css";
import { BrowserRouter, Link, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RecoilRoot>
            <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
        </RecoilRoot>
    </React.StrictMode>,
);
