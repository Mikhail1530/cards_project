import { SelectMenu } from '@/components/ui/select/Select'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: SelectMenu,
  tags: ['autodocs'],
  title: 'Components/SelectMenu',
} satisfies Meta<typeof SelectMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  args: {
    options: ['hello', 'goodbye', 'how are you?'],
    title: 'Select-box',
  },
}
