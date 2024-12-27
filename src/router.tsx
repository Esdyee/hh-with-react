import { createHashRouter, createBrowserRouter } from 'react-router-dom';
import App from './App';
import RecoilTest from './pages/RecoilTest';
import RecoilTestCopy from './pages/RecoilTestCopy';
import EditorTest from './pages/EditorTest';
import FullCalendarTest from './pages/FullCalendarTest';
import CKEditorTest from './pages/CKEditorTest';
import ReactCalendar from './pages/calendar/ReactCalendar';
import ReactQuillTest from './pages/ReactQuillTest';
import ChangeCharacter from './pages/ChangeCharacter';
import MultiUpload from './pages/MultiUpload';
import KakaoTest from './pages/KakaoTest';


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
                },
                {
                    path: '/react-calendar',
                    element: <ReactCalendar />
                },
                {
                    path: '/react-quill',
                    element: <ReactQuillTest />
                },
                {
                    path: '/change-character',
                    element: <ChangeCharacter />
                },
                {
                    path: '/multi-upload',
                    element: <MultiUpload />
                },
                {
                    path: '/kakao-test',
                    element: <KakaoTest />
                }
            ]
        },

    ],
    {
        basename: '/'
    }
)


export default router;
