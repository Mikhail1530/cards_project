import { Meta, StoryObj } from '@storybook/react'
import { Table } from '@/view/ui'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: Table,
  tags: ['autodocs'],
  title: 'UI/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Table',
  },
}
