import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import useTimer from './hooks/useTimer';

// 메뉴 아이템 타입 정의
type MenuItem = {
  path: string;
  label: string;
};

// 메뉴 아이템 배열
const menuItems: MenuItem[] = [
  { path: '/recoil', label: 'Recoil Test' },
  { path: '/recoil-copy', label: 'Recoil Test Copy' },
  { path: '/editor', label: 'Editor Test' },
  { path: '/full-calendar', label: 'Full Calendar Test' },
  { path: '/ckeditor', label: 'CKEditor Test' },
  { path: '/react-calendar', label: 'React Calendar' },
  { path: '/react-hook', label: 'React Hook Test' },
  { path: '/react-quill', label: 'React Quill Test' },
  { path: '/change-character', label: 'Change Character' },
  { path: '/multi-upload', label: 'Multi Upload' },
  { path: '/kakao-test', label: 'Kakao Test' },
  { path: '/circular-progress-bar-test', label: 'Circular Progress Bar Test' },
  { path: '/drag-and-drop', label: 'Drag And Drop' },
  { path: '/split-view', label: 'Split View' },
  { path: '/infinite-scroll', label: 'Infinite Scroll' },
  { path: '/start-transition-test', label: 'Start Transition Test' },
];

function App() {
  const time = useTimer(0);
  const [selectedMenu, setSelectedMenu] = useState('/');
  const path = useLocation().pathname;

  useEffect(() => {
    if (path) {
      setSelectedMenu(path);
    }
  }, [path]);

  return (
    <div>
      <div>
        <nav>
          <div className="flex">
            {/* 메뉴 목록 */}
            <ul className="flex flex-col bg-gray-200 h-full w-[200px]">
              {menuItems.map((item) => (
                <li
                  key={item.path}
                  className={`bg-gray-200 p-2 rounded hover:bg-gray-300 ${
                    selectedMenu === item.path ? 'bg-gray-300' : ''
                  }`}
                >
                  <Link to={item.path.replace('/', '')}>{item.label}</Link>
                </li>
              ))}
            </ul>
            {/* 컴포넌트 렌더링 */}
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
