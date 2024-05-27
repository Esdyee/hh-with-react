import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import TagButton from '../components/TagButton.tsx';

const meta = {
  title: 'Example/Button/TagButton',
  component: TagButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isChecked: { control: 'boolean', description: '체크 여부' },
    children: { control: 'text', description: '버튼 내용' },
    onClick: { action: 'clicked', description: '버튼 클릭 이벤트' },
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof TagButton>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    isChecked: false,
    children: 'button',
    onClick: () => console.log('clicked'),
  },
};
