import { RadioGroup } from './radio.tsx'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/Radio',
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    options: [
      { label: 'Default One', value: 'default-one' },
      { label: 'Default Two', value: 'default-two' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { label: 'disabled One', value: 'disabled-one' },
      { label: 'disabled Two', value: 'disabled-two' },
    ],
  },
}
