import React, { useState } from 'react';
import styled from 'styled-components';
import { Tabs, Tab, TextField, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow:
    0px 12px 24px -4px rgba(145, 158, 171, 0.12),
    0px 0px 2px 0px rgba(145, 158, 171, 0.2);
  width: 100%;
  overflow: hidden;
`;

const TabsContainer = styled.div`
  padding: 0 24px;
  border-bottom: 1px solid rgba(140, 149, 157, 0.2);
`;

const StyledTabs = styled(Tabs)`
  & .MuiTabs-indicator {
    background-color: #272b2f;
  }
`;

const StyledTab = styled(Tab)`
  font-family: 'HanwhaGothic', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #737c85;
  text-transform: none;

  &.Mui-selected {
    color: #272b2f;
  }
`;

const ContentContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    font-family: 'HanwhaGothic', sans-serif;

    & fieldset {
      border-color: rgba(140, 149, 157, 0.2);
    }

    &:hover fieldset {
      border-color: rgba(140, 149, 157, 0.3);
    }

    &.Mui-focused fieldset {
      border-color: #2196f3;
    }
  }

  & .MuiInputLabel-root {
    font-family: 'HanwhaGothic', sans-serif;
    font-size: 12px;
    color: rgba(140, 149, 157, 0.64);
  }
`;

const EditorContainer = styled.div`
  .quill {
    border-radius: 8px;
    border: 1px solid rgba(140, 149, 157, 0.2);

    .ql-toolbar {
      border-bottom: 1px solid rgba(140, 149, 157, 0.2);
    }

    .ql-container {
      font-family: 'HanwhaGothic', sans-serif;
      font-size: 14px;
      min-height: 120px;
    }
  }
`;

const ButtonSection = styled.div`
  border: 1px solid rgba(140, 149, 157, 0.12);
  border-radius: 16px;
  box-shadow: 0px 4px 8px 0px rgba(145, 158, 171, 0.16);
  margin-top: 24px;
`;

const ButtonHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid rgba(140, 149, 157, 0.2);

  h2 {
    font-family: 'HanwhaGothic', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #272b2f;
    margin: 0;
  }
`;

const ButtonContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid rgba(140, 149, 157, 0.2);
`;

const CreatePage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editorContent, setEditorContent] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Card>
      <TabsContainer>
        <StyledTabs value={tabValue} onChange={handleTabChange}>
          <StyledTab label="메인화면" />
          <StyledTab label="오픈그래프" />
          <StyledTab label="FP안내문구" />
        </StyledTabs>
      </TabsContainer>

      <ContentContainer>
        <StyledTextField
          fullWidth
          label="터치콘텐츠명 *"
          defaultValue="남자답게 참았다간 건강에 적신호! 암으로 이어질 수 있는 위험한 남성 질병 4"
        />

        <StyledTextField
          fullWidth
          label="서브 타이틀"
          placeholder="서브 타이틀에 표시할 문구를 입력하세요"
        />

        <StyledTextField
          fullWidth
          label="타이틀"
          multiline
          rows={2}
          defaultValue="남자답게 참으면 큰일!\n암으로 이어질 남성질병"
        />

        <EditorContainer>
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            placeholder="그동안 가볍게 여겼던 증상들 중에서 오늘 소개해 드린 질병과 관련된 경험이 있으신가요? 그렇다면 이번 기회에 병원에 방문하셔서 건강 검진을 받아보시는 것을 추천드립니다. 각 질병과 함께 소개해드린 예방법으로 일상 속 건강도 챙겨보세요!"
          />
        </EditorContainer>

        <ButtonSection>
          <ButtonHeader>
            <h2>버튼</h2>
          </ButtonHeader>
          <ButtonContent>
            <StyledTextField
              fullWidth
              label="툴팁 내용"
              defaultValue="🧐 내가 가입한 보험에 숨은 보장은 없을까?"
            />
            <ButtonRow>
              <StyledTextField
                fullWidth
                label="버튼명"
                defaultValue="내 보험 점검받기"
                helperText="글자수 제한 : 최대 23자"
              />
              <StyledTextField
                fullWidth
                label="페이지 이동경로"
                defaultValue="https://m.hanwhalife.com/mobile/insurance/counsel/MIN_IRN0000_P20000.do?DI_GUBUN=MHSPEVNT&CONTENT=%ED%8A%B8%EB%9D%BC%EC%9D%B4%EB%B8%8C&utm_source=offering_mo&utm_medium=hanwha&utm_campaign=offering_pop&utm_content=offering"
              />
            </ButtonRow>
          </ButtonContent>
        </ButtonSection>

        <ActionButtons>
          <Button
            variant="outlined"
            sx={{
              color: '#272B2F',
              borderColor: 'rgba(140, 149, 157, 0.32)',
              '&:hover': {
                borderColor: 'rgba(140, 149, 157, 0.48)',
              },
            }}
          >
            삭제하기
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'rgba(140, 149, 157, 0.2)',
              color: 'rgba(140, 149, 157, 0.64)',
              '&:hover': {
                backgroundColor: 'rgba(140, 149, 157, 0.3)',
              },
            }}
          >
            변경사항 저장하기
          </Button>
        </ActionButtons>
      </ContentContainer>
    </Card>
  );
};

export default CreatePage;
