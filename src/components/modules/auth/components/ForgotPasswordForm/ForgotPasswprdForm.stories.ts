import type { Meta, StoryObj } from '@storybook/react'
import { ForgotPasswordForm } from '@/components/modules/auth/components/ForgotPasswordForm/ForgotPasswordForm.tsx'

const meta = {
  title: 'Auth/ForgotPasswordForm',
  component: ForgotPasswordForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPassword: Story = {}
