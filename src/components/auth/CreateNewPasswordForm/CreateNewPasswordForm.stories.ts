import type { Meta, StoryObj } from '@storybook/react'
import { CreateNewPasswordForm } from '@/components/auth/CreateNewPasswordForm/CreateNewPasswordForm.tsx'

const meta = {
  title: 'Auth/CreateNewPasswordForm',
  component: CreateNewPasswordForm,
  tags: ['autodocs'],
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
