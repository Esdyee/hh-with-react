import React, { useEffect, useRef, useState, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// function to generate random strings
const getRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
};

const pageSize = 30;

export default function StickyHeadTable() {
  const observer = useRef<IntersectionObserver | null>(null); // Observer 인스턴스 저장
  const [items, setItems] = useState<object[]>([]);
  const [page, setPage] = useState(0); // 페이지 번호 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  // const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지 (선택 사항)

  const getItems = (pageNum: number, size: number) => {
    // 실제 API 호출 시뮬레이션 또는 구현
    console.log(`Workspaceing page: ${pageNum}`);
    return Array.from({ length: size }, (_, i) => ({
      label: getRandomString(),
      id: pageNum * size + i, // 고유 ID 부여 (key prop 용도)
    }));
  };

  const fetchMoreData = useCallback(() => {
    if (loading) return; // 이미 로딩 중이면 중복 호출 방지

    setLoading(true);
    setTimeout(() => {
      // Simulate a fetch delay
      const newItems = getItems(page, pageSize);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
      setLoading(false);
      // if (newItems.length < pageSize) setHasMore(false); // 마지막 페이지 감지 (선택 사항)
    }, 1500);
  }, [page, loading]); // page와 loading 상태에 의존

  // 마지막 요소를 감지하기 위한 ref 콜백
  const lastItemRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (loading) return; // 로딩 중일 때는 observer 연결/해제 로직 건너뛰기

      // 기존 observer 연결 해제
      if (observer.current) observer.current.disconnect();

      // 새 observer 생성 및 연결
      observer.current = new IntersectionObserver(
        (entries) => {
          // isIntersecting과 hasMore 조건(선택) 확인
          if (entries[0].isIntersecting /*&& hasMore*/) {
            fetchMoreData(); // 데이터 로드 함수 호출
          }
        },
        // threshold를 낮추면 더 일찍 감지됨
        { threshold: 0.1, rootMargin: '100px' }
      );

      // 관찰 대상(node)이 존재하면 관찰 시작
      if (node) observer.current.observe(node);
    },
    [loading, fetchMoreData /*, hasMore*/] // 의존성 배열에 필요한 상태/함수 포함
  );

  // 초기 데이터 로드
  useEffect(() => {
    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 첫 마운트 시 한 번만 실행

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={'ID'}>{'ID'}</TableCell>
              <TableCell key={'Name'}>{'Name'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any, i: number) => {
              // 마지막 요소인지 확인
              const isLastItem = items.length === i + 1;
              return (
                <TableRow
                  // 마지막 요소에만 ref 콜백 적용
                  ref={isLastItem ? lastItemRef : null}
                  key={item.id} // 고유 key 사용 권장
                >
                  <TableCell>{item.id}</TableCell> {/* 실제 ID 사용 */}
                  <TableCell>{item.label}</TableCell>
                </TableRow>
              );
            })}
            {/* 로딩 중 인디케이터 (선택 사항) */}
            {loading && (
              <TableRow>
                <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {/* 빈 행 제거: <TableRow ref={observerRef} style={{ height: '20%' }} /> */}
          </TableBody>
        </Table>
      </TableContainer>
      <p>RowsCount: {items.length}</p>
      <p>Page Fetched: {page}</p> {/* 페이지 번호 표시 */}
    </Paper>
  );
}
