import React, { useState, useTransition, Profiler, useEffect } from 'react';

/**
 * 이 컴포넌트는 상태 업데이트 자체는 빠르지만,
 * 그 결과로 렌더링해야 할 DOM 요소가 매우 많아
 * '렌더링 부하'가 발생하는 상황을 시뮬레이션합니다.
 *
 * `startTransition`이 이러한 렌더링 부하 상황에서
 * 어떻게 UI 반응성을 개선하는지 비교할 수 있습니다.
 */
const StartTransitionTest = () => {
  // useTransition 훅: 상태 업데이트를 트랜지션으로 감싸기 위함
  // isPending: 트랜지션(setItemsToRender)이 진행 중인지 여부
  const [isPending, startTransition] = useTransition();

  // 입력 필드의 현재 값 (문자열)
  const [inputValue, setInputValue] = useState('1000');

  // 화면에 렌더링할 아이템들의 배열 (숫자 배열)
  const [itemsToRender, setItemsToRender] = useState<number[]>([]);

  // --- 초기 렌더링 시 아이템 생성 (컴포넌트 마운트 시 1회 실행) ---
  // 이 부분의 연산은 비교적 가볍습니다.
  useEffect(() => {
    console.log('컴포넌트 마운트: 초기 아이템 생성');
    const num = parseInt(inputValue, 10) || 0;
    // 초기 아이템 개수 제한 (너무 많으면 초기 로딩도 느려짐)
    const initialCount = Math.min(num, 2000);
    const initialItems = Array.from({ length: initialCount }, (_, i) => i + 1);
    setItemsToRender(initialItems);
  }, [inputValue]); // inputValue는 초기값 설정용으로만 사용

  // --- 입력 값 변경 핸들러 ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 1. 긴급한 업데이트: 입력 필드 값은 즉시 변경되어야 사용자 경험이 좋음
    setInputValue(value);

    // 2. 상태 업데이트 준비 (연산 자체는 가벼움)
    // 입력값을 숫자로 변환하고, 렌더링할 아이템 배열을 생성하는 과정.
    // 이 계산 자체는 매우 빠릅니다.
    const numItems = parseInt(value, 10) || 0;
    // 렌더링 부하를 위해 최대 아이템 개수 설정 (너무 크면 브라우저가 멈출 수 있음)
    const count = Math.min(numItems, 2000); // 최대 2만개
    const newItems = Array.from({ length: count }, (_, i) => i + 1);

    // --- 여기서 렌더링 부하 발생 ---
    // `setItemsToRender(newItems)`가 호출되면, React는 'count'개의 div를
    // 새로 렌더링해야 합니다. 이 과정이 느릴 수 있습니다.

    // [Before] startTransition 없이 상태 업데이트
    // - 이 코드를 활성화하면, setItemsToRender로 인한 느린 렌더링이
    //   메인 스레드를 점유하여 입력 필드 타이핑이 버벅일 수 있습니다.
    //----------------------------------------------------
    console.time('Rendering without transition');
    setItemsToRender(newItems);
    // 시간 측정은 렌더링 완료 시점이 아닌 코드 실행 직후 종료되므로
    // Profiler 탭에서 실제 렌더링 시간을 확인하는 것이 더 정확합니다.
    console.timeEnd('Rendering without transition');
    //----------------------------------------------------

    // [After] startTransition 사용하여 상태 업데이트
    // - 아래 주석을 해제하고 위 코드를 주석 처리하면, setItemsToRender 업데이트가
    //   '긴급하지 않은' 것으로 표시됩니다.
    // - React는 입력 필드 업데이트(setInputValue)를 먼저 처리하고,
    //   느린 렌더링(setItemsToRender)은 백그라운드에서 처리하거나 지연시킵니다.
    // - 결과적으로 입력 필드는 버벅이지 않고 부드럽게 유지됩니다.
    //----------------------------------------------------
    // startTransition(() => {
    //   console.time('Rendering WITH transition (startTransition call)');
    //   setItemsToRender(newItems);
    //   // 이 시점은 startTransition 콜백이 끝나는 시점이며,
    //   // 실제 렌더링 완료 시점과는 다릅니다. isPending으로 확인.
    //   console.timeEnd('Rendering WITH transition (startTransition call)');
    // });
    //----------------------------------------------------
  };

  // Profiler 콜백: 렌더링 성능 측정 (React DevTools의 Profiler 탭에서 확인)
  const onRender = (id: string, phase: string, actualDuration: number) => {
    // console.log(
    //   `Profiler: ${id} (${phase}) - 실제 렌더링 시간: ${actualDuration.toFixed(2)}ms`
    // );
  };

  return (
    <Profiler id="SlowRenderingDemo" onRender={onRender}>
      <div className="p-4 border rounded m-2">
        <h2 className="text-xl font-bold mb-4">느린 렌더링 데모 (startTransition 비교)</h2>
        <div className="mb-4">
          <label htmlFor="itemCount" className="block mb-2 font-semibold">
            렌더링할 아이템 수 (숫자 변경 시 렌더링 부하 발생):
          </label>
          <input
            id="itemCount"
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="아이템 수를 입력하세요 (예: 10000)"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p className="text-sm text-gray-600 mt-1">
            숫자를 빠르게 변경해보세요. (권장: 1000 ~ 20000 사이)
          </p>
        </div>

        {/* startTransition 사용 시 렌더링이 지연되는 동안 표시됨 */}
        {isPending && (
          <div className="text-blue-600 mb-2 animate-pulse">
            아이템 목록 업데이트 중 (렌더링 부하 처리 중)...
          </div>
        )}

        <div className="font-bold mb-2">렌더링된 아이템: {itemsToRender.length}개</div>
        <div className="h-[300px] overflow-auto border rounded p-2 bg-gray-100 shadow-inner">
          {/* 이 부분이 렌더링 부하의 원인: 많은 수의 div를 렌더링 */}
          {itemsToRender.map((item) => (
            <div key={item} className="p-1 border-b border-gray-200 text-xs truncate">
              아이템 {item}의 내용입니다. 이 요소가 많아지면 렌더링이 느려집니다.
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-sm">
          <h3 className="font-semibold mb-1">테스트 방법:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              위 입력 필드에 큰 숫자 (예: 5000, 10000, 15000)를 빠르게 입력하거나 백스페이스로
              지워보세요.
            </li>
            <li>
              코드 내에서 `handleInputChange` 함수의 `[Before]`와 `[After]` 부분의 주석 처리를
              변경하며 테스트해보세요.
            </li>
            <li>
              <b>`startTransition` 없을 때 (`[Before]` 활성화):</b> 숫자를 빠르게 변경하면 입력 필드
              자체가 잠시 멈칫거리거나 입력이 느리게 반영될 수 있습니다. (느린 렌더링이 UI 스레드를
              막기 때문)
            </li>
            <li>
              <b>`startTransition` 사용 시 (`[After]` 활성화):</b> 숫자를 빠르게 변경해도 입력
              필드는 즉시 부드럽게 업데이트됩니다. 아이템 목록은 잠시 후 ('업데이트 중...' 메시지와
              함께) 갱신됩니다.
            </li>
            <li>
              (선택) 브라우저 개발자 도구의 'Performance' 탭이나 React DevTools의 'Profiler' 탭에서
              렌더링 시간을 직접 확인해보세요.
            </li>
          </ol>
        </div>
      </div>
    </Profiler>
  );
};

export default StartTransitionTest;
