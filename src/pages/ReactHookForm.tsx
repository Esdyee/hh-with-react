import React from 'react';
import {
  useForm,
  FormProvider,
  useFormContext, // 추가
  Controller,
  SubmitHandler,
} from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  Grid, // 레이아웃을 위해 Grid 사용
} from '@mui/material';

// 1. 폼 데이터 타입 정의
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  city: string;
  country: string;
}

// --- 중첩된 컴포넌트 1: UserInfoSection ---
const UserInfoSection: React.FC = () => {
  // 2. useFormContext 훅을 사용하여 부모 FormProvider로부터 control, errors 등을 가져옴
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>(); // 제네릭 타입 명시 권장

  return (
    <Box mb={3}> {/* 섹션 구분을 위한 마진 */}
      <Typography variant="h6" gutterBottom>
        User Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control} // context에서 가져온 control 사용
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                required
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
           <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// --- 중첩된 컴포넌트 2: AddressSection ---
const AddressSection: React.FC = () => {
  // 여기에서도 동일하게 useFormContext 사용
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        Address Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="addressLine1"
            control={control}
            rules={{ required: 'Address is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Line 1"
                variant="outlined"
                fullWidth
                required
                error={!!errors.addressLine1}
                helperText={errors.addressLine1?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            rules={{ required: 'City is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                variant="outlined"
                fullWidth
                required
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
           <Controller
            name="country"
            control={control}
            rules={{ required: 'Country is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                variant="outlined"
                fullWidth
                required
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// --- 최상위 폼 컴포넌트 ---
const ReactHookFormTest: React.FC = () => {
  // 3. 최상위에서 useForm 호출하여 methods 객체 가져오기
  const methods = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      addressLine1: '',
      city: '',
      country: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form Data (Context):', data);
    // 실제 제출 로직
    return new Promise(resolve => setTimeout(() => {
        alert('Form submitted using context! Check console.');
        resolve(undefined);
        // methods.reset(); // 제출 후 초기화
      }, 1000));
  };

  return (
    // 4. FormProvider로 하위 컴포넌트 감싸고 methods 전달
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)} // methods에서 handleSubmit 사용
        noValidate
        sx={{ mt: 3, width: '100%', maxWidth: '600px', margin: 'auto' }}
      >
        <Typography variant="h5" gutterBottom>
          User Registration (with Context)
        </Typography>
        <Stack spacing={2}>
          {/* 중첩된 컴포넌트 렌더링 (props로 methods 넘겨줄 필요 없음) */}
          <UserInfoSection />
          <AddressSection />

          {/* 제출/초기화 버튼 */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={methods.formState.isSubmitting} // methods에서 formState 사용
            fullWidth
            sx={{ mt: 2 }}
          >
            {methods.formState.isSubmitting ? 'Submitting...' : 'Register'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => methods.reset()} // methods에서 reset 사용
            disabled={methods.formState.isSubmitting}
            fullWidth
          >
            Reset Form
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default ReactHookFormTest;