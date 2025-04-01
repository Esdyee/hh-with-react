import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ReactCalendar from './pages/calendar/ReactCalendar';
import ChangeCharacter from './pages/ChangeCharacter';
import CircularProgressBarTest from './pages/CircularProgressBarTest';
import CKEditorTest from './pages/CKEditorTest';
import DragAndDrop from './pages/DragAndDrop';
import EditorTest from './pages/EditorTest';
import FullCalendarTest from './pages/FullCalendarTest';
import KakaoTest from './pages/KakaoTest';
import MultiUpload from './pages/MultiUpload';
import ReactQuillTest from './pages/ReactQuillTest';
import RecoilTest from './pages/RecoilTest';
import RecoilTestCopy from './pages/RecoilTestCopy';
import SplitView from './pages/SplitView';
import InfiniteScroll from './pages/InfiniteScroll';
import StartTransitionTest from './startTransitionTest';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/recoil',
          element: <RecoilTest />,
        },
        {
          path: '/recoil-copy',
          element: <RecoilTestCopy />,
        },
        {
          path: '/editor',
          element: <EditorTest />,
        },
        {
          path: '/full-calendar',
          element: <FullCalendarTest />,
        },
        {
          path: '/ckeditor',
          element: <CKEditorTest />,
        },
        {
          path: '/react-calendar',
          element: <ReactCalendar />,
        },
        {
          path: '/react-quill',
          element: <ReactQuillTest />,
        },
        {
          path: '/change-character',
          element: <ChangeCharacter />,
        },
        {
          path: '/multi-upload',
          element: <MultiUpload />,
        },
        {
          path: '/kakao-test',
          element: <KakaoTest />,
        },
        {
          path: '/circular-progress-bar-test',
          element: <CircularProgressBarTest />,
        },
        {
          path: '/drag-and-drop',
          element: <DragAndDrop />,
        },
        {
          path: '/split-view',
          element: <SplitView />,
        },
        {
          path: '/infinite-scroll',
          element: <InfiniteScroll />,
        },
        {
          path: '/start-transition-test',
          element: <StartTransitionTest />,
        },
      ],
    },
  ],
  {
    basename: '/',
  }
);

export default router;
