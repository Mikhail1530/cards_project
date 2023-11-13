import { Select } from '@/components/ui/Select/Select'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/SelectMenu',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectStory: Story = {
  args: {
    options: ['hello', 'goodbye', 'how are you?'],
    title: 'Select-box',
  },
}
