// https://stackblitz.com/edit/react-ektjug?file=Demo.tsx
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useRef, useState } from 'react';

// function to generate random strings
const getRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
};

const pageSize = 30;

export default function StickyHeadTable() {
  const observerRef = useRef(null);

  const fetchMoreData = (page: number, pageSize: number) => {
    setTimeout(() => {
      // Simulate a fetch delay
      setItems((prevItems) => [...prevItems, ...getItems(page, pageSize)]);
    }, 1500);
  };

  const getItems = (page: number, pageSize: number) => {
    return Array.from({ length: pageSize }, (_, i) => ({
      label: getRandomString(),
    }));
  };

  const [items, setItems] = useState<object[]>([]);
  const [countFetches, setCountFetches] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          //   alert(1);
          setCountFetches((prevCount) => ++prevCount);
          fetchMoreData(countFetches, pageSize);
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef]);

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
            {items.map((item: any, i: number) => (
              <>
                <TableRow key={`row-${i}`}>
                  <TableCell key={`id-${i}`}>{i}</TableCell>
                  <TableCell key={`Name-${i}`}>{item.label}</TableCell>
                </TableRow>
              </>
            ))}
            <TableRow ref={observerRef} style={{ height: '20%' }} />
          </TableBody>
        </Table>
      </TableContainer>
      <p>RowsCount: {items.length}</p>
      <p>Count of fetches: {countFetches}</p>
    </Paper>
  );
}
