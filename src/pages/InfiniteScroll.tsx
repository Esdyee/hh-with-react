import CircularProgress from '@mui/material/CircularProgress'; // 로딩 인디케이터
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCallback, useEffect, useRef, useState } from 'react';

// function to generate random strings
const getRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
};

const pageSize = 30;

export default function InfiniteScroll() {
  const observerRef = useRef<IntersectionObserver | null>(null); // Observer 인스턴스 저장
  const triggerRef = useRef<HTMLTableRowElement | null>(null); // 감지할 요소(빈 행) ref

  const [items, setItems] = useState<any[]>([]); // item 타입 명시 권장 (any 대신)
  const [page, setPage] = useState(0); // 페이지 번호 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지

  // 데이터 생성 함수 (실제 API 호출로 대체)
  const getItems = (pageNum: number, size: number): Promise<any[]> => {
    console.log(`Fetching page: ${pageNum}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // 마지막 페이지 시뮬레이션 (예: 5페이지까지만 데이터가 있음)
        if (pageNum >= 5) {
          resolve([]); // 빈 배열 반환
          return;
        }
        const newItems = Array.from({ length: size }, (_, i) => ({
          label: getRandomString(),
          id: pageNum * size + i, // 고유 ID
        }));
        resolve(newItems);
      }, 1000); // 1초 딜레이 시뮬레이션
    });
  };

  // 데이터 로드 함수
  const loadMoreItems = useCallback(async () => {
    // 로딩 중이거나 더 이상 데이터가 없으면 실행 중지
    if (loading || !hasMore) return;

    setLoading(true);
    const newItems = await getItems(page, pageSize);

    if (newItems.length === 0) {
      // 받아온 데이터가 없으면 더 이상 로드할 데이터가 없는 것으로 간주
      setHasMore(false);
    } else {
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
    }
    setLoading(false);
  }, [loading, hasMore, page]); // 의존성 배열 업데이트

  // IntersectionObserver 설정 Effect
  useEffect(() => {
    // IntersectionObserver 콜백 함수
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      // 타겟이 보이고, 로딩 중이 아니며, 더 로드할 데이터가 있을 때만 실행
      if (target.isIntersecting && !loading && hasMore) {
        loadMoreItems();
      }
    };

    // Observer 인스턴스 생성
    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1, // 10%만 보여도 감지
      rootMargin: '100px', // 100px 먼저 감지 시작
      // root: document.querySelector('#table-container') // 필요시 스크롤 컨테이너 직접 지정
    });

    // 감지할 대상(triggerRef)이 있으면 관찰 시작
    const currentTrigger = triggerRef.current;
    if (currentTrigger) {
      observerRef.current.observe(currentTrigger);
    }

    // 컴포넌트 언마운트 시 observer 정리
    return () => {
      if (currentTrigger) {
        observerRef.current?.unobserve(currentTrigger);
      }
      observerRef.current?.disconnect();
    };
    // loadMoreItems 함수가 useCallback으로 메모이제이션 되어 있으므로,
    // loading, hasMore 상태가 변경되어도 loadMoreItems 참조는 유지될 수 있음.
    // 따라서 loadMoreItems를 의존성 배열에 포함하여 최신 상태를 반영하도록 함.
  }, [loadMoreItems, loading, hasMore]); // loading, hasMore 추가

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* 스크롤 컨테이너에 ID 부여 (필요시 observer root 옵션에 사용) */}
      <TableContainer sx={{ maxHeight: 440 }} id="table-container">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={'ID'}>{'ID'}</TableCell>
              <TableCell key={'Name'}>{'Name'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              // key prop은 item의 고유 ID 사용
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.label}</TableCell>
              </TableRow>
            ))}

            {/* 로딩 중이 아닐 때만 감지용 빈 행 렌더링 */}
            {/* 이 행이 보여야 다음 페이지 로드 트리거 */}
            {!loading && hasMore && (
              <TableRow ref={triggerRef} style={{ height: '1px', border: 'none' }}>
                <TableCell colSpan={2} style={{ padding: 0, border: 'none' }} />
              </TableRow>
            )}

            {/* 로딩 중 인디케이터 */}
            {loading && (
              <TableRow>
                <TableCell colSpan={2} align="center" style={{ border: 'none' }}>
                  <CircularProgress size={24} /> {/* Material UI 로딩 스피너 */}
                </TableCell>
              </TableRow>
            )}

            {/* 더 이상 로드할 데이터가 없을 때 메시지 (선택 사항) */}
            {!hasMore && items.length > 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No more data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <p>RowsCount: {items.length}</p>
      <p>Page Fetched: {page}</p>
      <p>Has More: {hasMore.toString()}</p>
      <p>Loading: {loading.toString()}</p>
      <p>Observer: {JSON.stringify(observerRef.current)}</p>
    </Paper>
  );
}
