import type { Meta, StoryObj } from '@storybook/react'

import LogOutOutline from '@/assets/icons/log-out-outline/LogOutOutline'

import { MyButton } from './'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: MyButton,
  tags: ['autodocs'],
  title: 'Components/MyButton',
} satisfies Meta<typeof MyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary MyButton',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary MyButton',
    disabled: false,
    variant: 'secondary',
  },
}
export const Tertiary: Story = {
  args: {
    children: 'Tertiary MyButton',
    disabled: false,
    variant: 'tertiary',
  },
}
export const Link: Story = {
  args: {
    children: 'Tertiary MyButton',
    disabled: false,
    variant: 'link',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width MyButton',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'button',
    children: 'Link that looks like a Button',
    href: 'www.google.com',
    variant: 'primary',
  },
}

export const WithIcon: Story = {
  args: {
    as: 'button',
    children: 'MyButton with Icon',
    icon: <LogOutOutline />,
    variant: 'primary',
  },
}
