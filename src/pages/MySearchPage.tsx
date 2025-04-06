import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  Switch,
  IconButton,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow:
    '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.2)',
  borderRadius: '16px',
  '.MuiCardHeader-root': {
    padding: '24px 16px 24px 24px',
  },
  '.MuiCardContent-root': {
    padding: '0px 24px 24px',
  },
}));

const ButtonContainer = styled(Card)(({ theme }) => ({
  border: '1px solid rgba(140, 149, 157, 0.12)',
  boxShadow: '0px 4px 8px 0px rgba(145, 158, 171, 0.16)',
  borderRadius: '16px',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const MySearchPage: React.FC = () => {
  const [content, setContent] = useState({
    title: '',
    subtitle: '',
    mainTitle: '',
    mainContent: '',
    buttonTooltip: '',
    buttonText: '',
    buttonUrl: '',
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent({ ...content, [name]: event.target.value });
  };

  const handleEditorChange = (value: string) => {
    setContent({ ...content, mainContent: value });
  };

  return (
    <StyledCard>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={700}>
            메인화면
          </Typography>
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField fullWidth label="기존 콘텐츠 불러오기" />
          <Button
            variant="contained"
            sx={{
              bgcolor: 'rgba(140, 149, 157, 0.08)',
              color: '#272B2F',
              '&:hover': {
                bgcolor: 'rgba(140, 149, 157, 0.12)',
              },
            }}
          >
            검색하기
          </Button>
        </Box>

        <TextField
          fullWidth
          label="터치콘텐츠명 *"
          placeholder="터치거리 관리에 표시할 제목을 입력하세요"
          value={content.title}
          onChange={handleChange('title')}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="서브 타이틀"
          placeholder="서브 타이틀에 표시할 문구를 입력하세요"
          value={content.subtitle}
          onChange={handleChange('subtitle')}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="타이틀"
          placeholder="타이틀에 표시할 문구를 입력하세요"
          value={content.mainTitle}
          onChange={handleChange('mainTitle')}
          helperText="2줄까지 작성 가능"
          sx={{ mb: 3 }}
        />

        <ReactQuill
          value={content.mainContent}
          onChange={handleEditorChange}
          placeholder="메인화면에 표시할 내용을 입력하세요"
          style={{ height: '150px', marginBottom: '24px' }}
        />

        <ButtonContainer>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">버튼</Typography>
                <Switch />
              </Box>
            }
          />
          <CardContent>
            <TextField
              fullWidth
              label="툴팁 내용"
              placeholder="🧐 내가 가입한 보험에 숨은 보장은 없을까?"
              value={content.buttonTooltip}
              onChange={handleChange('buttonTooltip')}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="버튼명"
                placeholder="내 보험 점검받기"
                value={content.buttonText}
                onChange={handleChange('buttonText')}
                helperText="글자수 제한 : 최대 23자"
              />
              <TextField
                fullWidth
                label="페이지 이동경로"
                placeholder="https://m.hanwhalife.com/..."
                value={content.buttonUrl}
                onChange={handleChange('buttonUrl')}
              />
            </Box>
          </CardContent>
        </ButtonContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'rgba(140, 149, 157, 0.2)',
              color: 'rgba(140, 149, 157, 0.64)',
              '&:hover': {
                bgcolor: 'rgba(140, 149, 157, 0.3)',
              },
            }}
          >
            오픈그래프 설정
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default MySearchPage;
