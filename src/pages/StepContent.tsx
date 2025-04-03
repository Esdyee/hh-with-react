import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'; // styled-components 임포트

// --- styled-components를 사용한 커스텀 컨테이너 ---
// styled-components를 사용하여 전체 컴포넌트를 감싸는 div에 스타일 적용
const StyledStepperContainer = styled.div`
  width: 80%;
  margin: 40px auto; /* 페이지 중앙 정렬 및 상하 여백 */
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// --- 스텝 정의 ---
const steps = ['기본 정보 입력', '상세 설정', '최종 검토'];

// --- 각 스텝별 컨텐츠 (예시) ---
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return '첫 번째 단계: 사용자 이름과 이메일 등 기본 정보를 입력해주세요.';
    case 1:
      return '두 번째 단계: 알림 설정, 테마 등 상세 옵션을 설정합니다.';
    case 2:
      return '세 번째 단계: 입력하신 모든 정보를 확인하고 완료 버튼을 누르세요.';
    default:
      return '알 수 없는 단계';
  }
}

// --- 메인 스텝퍼 컴포넌트 ---
export default function MyCustomStepper() {
  const [activeStep, setActiveStep] = useState(0); // 현재 활성화된 스텝 상태

  // 다음 스텝으로 이동 핸들러
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // 이전 스텝으로 이동 핸들러
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // 처음으로 리셋 핸들러
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    // styled-components로 만든 컨테이너 사용
    <StyledStepperContainer>
      {/* <pre>{JSON.stringify(activeStep)}</pre>
      <pre>{JSON.stringify(steps)}</pre> */}
      {/* MUI Stepper 컴포넌트 */}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {/* 모든 스텝 완료 시 */}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
            모든 단계를 완료했습니다!
          </Typography>
          {/* 버튼 레이아웃을 위한 Box (MUI 컴포넌트, 내부적으로 Emotion 사용) */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} /> {/* 버튼 오른쪽 정렬 위한 빈 공간 */}
            <Button onClick={handleReset}>처음으로</Button>
          </Box>
        </React.Fragment>
      ) : (
        // 현재 스텝 진행 중일 때
        <React.Fragment>
          {/* 현재 스텝 컨텐츠 표시 */}
          <Typography sx={{ mt: 4, mb: 2 }}>{getStepContent(activeStep)}</Typography>

          {/* 이전/다음 버튼 */}
          {/* 버튼 레이아웃 Box (sx prop은 Emotion 기반 스타일링) */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0} // 첫 스텝에서는 '이전' 비활성화
              onClick={handleBack}
              sx={{ mr: 1 }} // 오른쪽 마진 (MUI sx prop 사용)
            >
              이전
            </Button>
            <Box sx={{ flex: '1 1 auto' }} /> {/* 버튼 사이 공간 채우기 */}
            <Button onClick={handleNext}>
              {/* 마지막 스텝에서는 '완료' 텍스트 표시 */}
              {activeStep === steps.length - 1 ? '완료' : '다음'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </StyledStepperContainer>
  );
}
