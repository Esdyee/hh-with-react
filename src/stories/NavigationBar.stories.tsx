import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import NavigationBar from '../components/NavigationBar.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/NavigationBar',
  component: NavigationBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <div className={'w-full min-w-[300px]'}>{Story()}</div>],
  argTypes: {
    isDark: { control: 'boolean', description: '다크 모드 여부' },
    title: { control: 'text', description: '타이틀' },
    onBack: { action: 'onBack', description: '뒤로 버튼 클릭 이벤트' },
    onClose: { action: 'onClose', description: '닫기 버튼 클릭 이벤트' },
    isShowTitle: { control: 'boolean', description: '타이틀 표시 여부' },
    isShowBackButton: { control: 'boolean', description: '뒤로 버튼 표시 여부' },
    isShowCloseButton: { control: 'boolean', description: '닫기 버튼 표시 여부' },
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof NavigationBar>; 

export default meta;
type Story = StoryObj<typeof meta>;

// import cancelIcon from '../assets/icons/cancel.svg';

export const Default: Story = {
  args: {
    isDark: false,
    title: '타이틀',
    onBack: () => { console.log('뒤로 버튼 클릭'); },
    onClose: () => { console.log('닫기 버튼 클릭'); },
    isShowTitle: true,
    isShowBackButton: true,
    isShowCloseButton: true,
  },
};
