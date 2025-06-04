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
  // { path: '/react-hook', label: 'React Hook Test' },
  { path: '/react-quill', label: 'React Quill Test' },
  { path: '/change-character', label: 'Change Character' },
  { path: '/multi-upload', label: 'Multi Upload' },
  { path: '/kakao-test', label: 'Kakao Test' },
  { path: '/circular-progress-bar-test', label: 'Circular Progress Bar Test' },
  { path: '/drag-and-drop', label: 'Drag And Drop' },
  { path: '/split-view', label: 'Split View' },
  { path: '/infinite-scroll', label: 'Infinite Scroll' },
  { path: '/start-transition-test', label: 'Start Transition Test' },
  // { path: '/my-search', label: 'My-search' },
  { path: '/create-page', label: 'Create Page(MCP)' },
  { path: '/step-content', label: 'Step Content' },
  { path: '/persist-state', label: 'Persist State' },
  { path: '/react-hook-form-test', label: 'React Hook Form Test' },
  { path: '/excel-upload-view-tab', label: 'Excel Upload View Tab' },
];

function App() {
  const time = useTimer(0); // useTimer 훅 사용 (예시)
  const [selectedMenu, setSelectedMenu] = useState('/');
  const location = useLocation(); // useLocation 훅 사용
  const path = location.pathname; // 현재 경로 추출

  useEffect(() => {
    // 컴포넌트 마운트 시 또는 경로 변경 시 현재 경로로 selectedMenu 업데이트
    setSelectedMenu(path);
  }, [path]);

  return (
    <div>
      <div>
        <nav>
          <div className="flex">
            {/* 메뉴 목록 */}
            <ul className="flex flex-col bg-gray-200 h-full w-[200px]">
              {menuItems.map((item) => (
                // li는 이제 구조적인 역할만 함
                <li key={item.path}>
                  <Link
                    // Link의 to 속성은 정의된 path 그대로 사용
                    to={item.path}
                    // Link 요소가 전체 영역을 차지하도록 block 속성 추가
                    // 스타일 (패딩, 호버, 선택 상태)을 Link 요소에 직접 적용
                    className={`block p-2 hover:bg-gray-300 ${
                      selectedMenu === item.path
                        ? 'bg-gray-300 font-bold' // 선택된 메뉴 강조 (예: 배경색 + 굵은 글씨)
                        : 'bg-gray-200' // 기본 배경색 유지
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* 컴포넌트 렌더링 */}
            <div className="flex-1 p-4">
              {' '}
              {/* 콘텐츠 영역에 약간의 패딩 추가 (선택 사항) */}
              <Outlet />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
