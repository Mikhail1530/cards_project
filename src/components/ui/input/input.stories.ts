import { Input } from '@/components/ui/input/input'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const InputDefault: Story = {
  args: {
    className: 'default',
    label: 'Input',
    placeholder: 'Input',
    type: 'text',
    value: '',
  },
}
