import { Meta, StoryObj } from '@storybook/react'
import { Dialog as _Dialog } from '@/view/ui'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: _Dialog,
  tags: ['autodocs'],
  title: 'UI/Dialog',
} satisfies Meta<typeof _Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Dialog: Story = {
  args: {
    title: 'Add new card',
  },
}
