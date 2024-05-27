import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import TagList from '../components/TagList.tsx';

const meta = {
  title: 'List/TagList',
  component: TagList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tags: { control: { type: 'object' }, description: '태그 목록' },
    onTagClick: { action: 'clicked', description: '태그 클릭 이벤트' },
  },
  // args: { onClick: fn() },
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    tags: ['태그1', '태그2', '태그3'],
    onTagClick: (tag: string) => console.log(tag),
  },
};
