import { createHashRouter, createBrowserRouter } from 'react-router-dom';
import App from './App';
import RecoilTest from './pages/RecoilTest';
import RecoilTestCopy from './pages/RecoilTestCopy';
import EditorTest from './pages/EditorTest';
import FullCalendarTest from './pages/FullCalendarTest';
import CKEditorTest from './pages/CKEditorTest';


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
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
                },
                {
                    path: '/full-calendar',
                    element: <FullCalendarTest />
                },
                {
                    path: '/ckeditor',
                    element: <CKEditorTest />
                }
            ]
        },

    ],
    {
        basename: '/'
    }
)


export default router;
