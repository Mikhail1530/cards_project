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
    value: '1',
    disabled: false,
    options: [
      { label: 'Default One', value: '1' },
      { label: 'Default Two', value: '2' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    value: '1',
    disabled: true,
    options: [
      { label: 'disabled One', value: 'disabled-one', checked: true },
      { label: 'disabled Two', value: 'disabled-two' },
    ],
  },
}
