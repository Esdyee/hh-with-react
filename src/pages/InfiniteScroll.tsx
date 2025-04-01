// https://stackblitz.com/edit/react-ektjug?file=Demo.tsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useRef, useState } from 'react';
import Label from '../components/Label';
import { Typography } from '@mui/material';

// 랜덤 문자열 생성 함수
const getRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
};

const pageSize = 30;

export default function StickyHeadTable() {
  const observerRef = useRef(null); // 관찰 대상이 될 DOM 요소(테이블 마지막 행)를 참조하기 위한 ref

  // 현재 페이지에 해당하는 데이터를 생성해 items 배열에 추가하는 함수
  const fetchMoreData = (page: number, pageSize: number) => {
    setTimeout(() => {
      // Simulate a fetch delay
      setItems((prevItems) => [...prevItems, ...getItems(page, pageSize)]);
    }, 1500);
  };

  // 주어진 페이지 번호와 페이지 크기를 기반으로 더미 아이템 배열을 생성
  const getItems = (page: number, pageSize: number) => {
    return Array.from({ length: pageSize }, (_, i) => ({
      label: getRandomString(),
    }));
  };

  const [items, setItems] = useState<object[]>([]); // 테이블에 렌더링할 데이터 배열 (각 항목은 { label: string } 형태)
  const [countFetches, setCountFetches] = useState(0); // 데이터를 몇 번 불러왔는지 카운트하는 상태

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          // 관찰 대상 요소가 뷰포트에 50% 이상 들어오면
          setCountFetches((prevCount) => ++prevCount); // fetch 횟수 증가
          fetchMoreData(countFetches, pageSize); // 새로운 데이터 요청
        }
      },
      { threshold: 0.5 }
    );

    // 컴포넌트가 마운트된 후, observerRef가 가리키는 DOM 요소를 관찰 대상으로 설정
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      // 언마운트 시 관찰 중단 (메모리 누수 방지)
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef]); // 빈 의존성 배열: 컴포넌트가 처음 마운트될 때만 실행됨

  return (
    <Stack direction="row" gap={2}>
      <Paper sx={{ width: '100%', overflow: 'hidden', flex: 1 }}>
        <pre>{JSON.stringify(items.length, null, 2)}</pre>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell key={'ID'}>{'ID'}</TableCell>
                <TableCell key={'Name'}>{'Name'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: any, i: number) => (
                <>
                  <TableRow key={`row-${i}`}>
                    <TableCell key={`id-${i}`}>{i}</TableCell>
                    <TableCell key={`Name-${i}`}>{item.label}</TableCell>
                  </TableRow>
                </>
              ))}
              {/* 이 행이 뷰포트에 노출되면 IntersectionObserver가 트리거됨 */}
              <TableRow ref={observerRef} style={{ height: '16px', backgroundColor: 'red' }} />
            </TableBody>
          </Table>
        </TableContainer>
        <p>RowsCount: {items.length}</p>
        <p>Count of fetches: {countFetches}</p>
      </Paper>
      <Stack flex={1}>
        <Grid container spacing={1.5}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Grid item key={index} xs={12}>
              <Card sx={{ height: '100%', maxHeight: '300px' }}>
                <CardContent>
                  <Label color="info" htmlFor="label">
                    잠재고객
                  </Label>
                  <Stack sx={{ mt: 2 }}>
                    <Typography>카드 내용 11111</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
