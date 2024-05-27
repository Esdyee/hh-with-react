import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router.tsx'
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/700.css";
import {RouterProvider} from "react-router-dom";  // Router component imported

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
