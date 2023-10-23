import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './'
import LogOutOutline from "@/assets/icons/log-out-outline/LogOutOutline.tsx";

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const NoFullWidth: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: false,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a Button',
    href: 'https://www.google.com',
    variant: 'link',
  },
}

export const WithIcon: Story = {
  args: {
    as: 'button',
    children: 'Button with Icon',
    icon: <LogOutOutline />,
    variant: 'primary',
  },
}

export const Disabled: Story = {
  args: {
    as: 'button',
    children: 'Button with Icon',
    disabled: true,
    variant: 'primary',
  },
}