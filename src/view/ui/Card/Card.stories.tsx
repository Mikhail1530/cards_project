import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/view/ui'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: Card,
  tags: ['autodocs'],
  title: 'UI/CardType',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const card: Story = {
  args: {
    children: 'Simple CardType',
  },
}
