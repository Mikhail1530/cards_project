import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from '@/components/ui/Сheckbox/Checkbox'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Default',
    className: 'buttonClassName',
  },
}

export const Checked: Story = {
  args: {
    label: 'Checked',
    checked: true,
  },
}

export const Unchecked: Story = {
  args: {
    label: 'Unchecked',
    checked: false,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    checked: true,
    disabled: true,
  },
}
