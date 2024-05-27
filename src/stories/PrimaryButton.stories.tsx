import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import PrimaryButton from '../components/PrimaryButton.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button/PrimaryButton',
  component: PrimaryButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [(Story) => <div style={{ width: '300px' }}>{Story()}</div>],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    theme: {
      control: { type: 'select', options: ['dark', 'light', 'social', 'text'] },
      description: '버튼 테마',
    },
    isDisabled: { control: 'boolean', description: '버튼 비활성화 여부' },
    children: { control: 'text', description: '버튼 내용' },
    onClick: { action: 'onClick', description: 'onClick 이벤트' },
    className: { control: 'text', description: 'className 속성 옵션값' },
    // alt: { control: 'text', description: 'alt text' },
    // iconPath: { control: 'text', description: 'icon path' },
    // onClick: { action: 'onClick', description: 'onClick' },
    // width: { control: 'number', description: 'width' },
    // className: { control: 'text', description: 'className' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// import cancelIcon from '../assets/icons/cancel.svg';

export const Dark: Story = {
  args: {
    children: 'Primary Button',
    theme: 'dark',
    isDisabled: false,
    onClick: () => {
      console.log('clicked');
    },
    className: '',
  },
};

export const Light: Story = {
  args: {
    children: 'Primary Button',
    theme: 'light',
    isDisabled: false,
    onClick: () => {
      console.log('clicked');
    },
    className: '',
  },
};

export const Social: Story = {
  args: {
    children: 'Primary Button',
    theme: 'social',
    isDisabled: false,
    onClick: () => {
      console.log('clicked');
    },
    className: '',
  },
};

export const Text: Story = {
  args: {
    children: 'Primary Button',
    theme: 'text',
    isDisabled: false,
    onClick: () => {
      console.log('clicked');
    },
    className: '',
  },
};