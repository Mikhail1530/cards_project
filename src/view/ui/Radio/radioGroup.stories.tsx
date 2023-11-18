import { RadioGroup } from '@/view/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'UI/Radio',
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    options: [
      { label: 'Default One', value: 'text' },
      { label: 'Default Two', value: 'text2' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { label: 'disabled One', value: 'disabled-one', checked: true },
      { label: 'disabled Two', value: 'disabled-two' },
    ],
  },
}
