import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import RecoilTest from './pages/RecoilTest';
import RecoilTestCopy from './pages/RecoilTestCopy';


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
        }
    ]
)


export default router;
