import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface CSVData {
  headers: string[];
  rows: string[][];
}

const ExcelUploadViewTab: React.FC = () => {
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const parseCSV = (text: string): CSVData => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) {
      throw new Error('CSV 파일이 비어있습니다.');
    }

    const headers = lines[0].split(',').map(header => header.trim());
    const rows = lines.slice(1).map(line => 
      line.split(',').map(cell => cell.trim())
    );

    return { headers, rows };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('CSV 파일만 업로드 가능합니다.');
      return;
    }

    setLoading(true);
    setError(null);
    setFileName(file.name);

    try {
      const text = await file.text();
      const data = parseCSV(text);
      setCsvData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '파일을 읽는 중 오류가 발생했습니다.');
      setCsvData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCsvData(null);
    setFileName('');
    setError(null);
    const input = document.getElementById('csv-file-input') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        CSV 파일 업로드
      </Typography>

      <Box sx={{ mb: 3 }}>
        <input
          id="csv-file-input"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <label htmlFor="csv-file-input">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            disabled={loading}
          >
            CSV 파일 선택
          </Button>
        </label>

        {fileName && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            선택된 파일: {fileName}
          </Typography>
        )}

        {csvData && (
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{ ml: 2 }}
          >
            초기화
          </Button>
        )}
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {csvData && !loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {csvData.headers.map((header, index) => (
                  <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {csvData.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {csvData && csvData.rows.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
          데이터가 없습니다.
        </Typography>
      )}
    </Box>
  );
};

export default ExcelUploadViewTab;