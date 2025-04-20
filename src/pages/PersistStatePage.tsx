import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../store/PersistState';
import { useEffect } from 'react';

const PersistStatePage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  // 만약 마운트 시점에 초기값이 필요하다면 (Persist 기능과 중복될 수 있음)
  useEffect(() => {
    const navigationEntries = performance.getEntriesByType(
      'navigation'
    ) as PerformanceNavigationTiming[];

    const navigationType = navigationEntries.length > 0 ? navigationEntries[0].type : null;

    console.log(performance.getEntriesByType('navigation'), 'navigation');

    if (navigationType === 'reload') {
      console.log('브라우저 새로고침으로 진입');
    } else if (navigationType === 'navigate') {
      console.log('일반 네비게이션(라우터)으로 진입');
    } else if (navigationType === 'back_forward') {
      console.log('브라우저 뒤로가기/앞으로가기로 진입');
    }

    // 저장된 값이 없을 경우 등에만 초기화 로직 추가 가능
    if (!userInfo.name && !userInfo.email) {
      // 예시 조건
      setUserInfo({ name: '초기 이름', email: '초기 이메일' });
    }
  }, []); // 빈 배열: 마운트 시 1회 실행

  const handleReset = () => {
    setUserInfo({ name: '', email: '' });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">상태 유지 테스트</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">이름:</label>
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="border p-2 rounded"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label className="block mb-2">이메일:</label>
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            className="border p-2 rounded"
            placeholder="이메일을 입력하세요"
          />
        </div>

        <button onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded">
          초기화
        </button>

        <div className="mt-4">
          <h2 className="text-xl font-semibold">현재 상태:</h2>
          <p>이름: {userInfo.name}</p>
          <p>이메일: {userInfo.email}</p>
        </div>
      </div>
    </div>
  );
};

export default PersistStatePage;
