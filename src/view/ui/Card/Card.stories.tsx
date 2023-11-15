import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './index'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: Card,
  tags: ['autodocs'],
  title: 'UI/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const card: Story = {
  args: {
    children: 'Simple Card',
  },
}
