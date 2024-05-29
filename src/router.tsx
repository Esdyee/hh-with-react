import { createHashRouter, createBrowserRouter } from 'react-router-dom';
import App from './App';
import RecoilTest from './pages/RecoilTest';
import RecoilTestCopy from './pages/RecoilTestCopy';
import EditorTest from './pages/EditorTest';


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />
        },
        {
            path: '/recoil',
            element: <RecoilTest />
        },
        {
            path: '/recoil-copy',
            element: <RecoilTestCopy />
        },
        {
            path: '/editor',
            element: <EditorTest />
        }
    ]
)


export default router;
