import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import ErrorMessage from '../components/ErrorMessage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Label/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'ErrorMessage의 내용' },
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof ErrorMessage>;

export default meta;



type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '이메일',
  },
};