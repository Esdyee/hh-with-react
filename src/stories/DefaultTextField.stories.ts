import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import DefaultTextField from '../components/DefaultTextField.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/DefaultTextField',
  component: DefaultTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    errorMessage: { control: 'text', description: '에러 메세지' },
    isError: { control: 'boolean', description: '에러 상태' },
    iconAlt: { control: 'text', description: '아이콘 이미지의 alt 속성' },
    iconPath: { control: 'text', description: '아이콘 이미지의 경로' },
    onIconClick: { action: 'onIconClick', description: 'onIconClick' },
    placeholder: { control: 'text', description: 'placeholder' },
    onChange: { action: 'onChange', description: 'onChange 이벤트' },
    value: { control: 'text', description: 'value 값' },
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof DefaultTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// import cancelIcon from '../assets/icons/cancel.svg';

export const Default: Story = {
  args: {
    id: 'testid',
    errorMessage: 'error message',
    isError: false,
    iconAlt: 'delete-icon',
    iconPath: '/icons/cancel.svg',
    onIconClick: () => { console.log('icon clicked'); },
    placeholder: '값을 입력해주세요.',
    onChange: () => {
      console.log('changed');
    },
    value: '',
  },
};
