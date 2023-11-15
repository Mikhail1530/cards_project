import type { Meta, StoryObj } from '@storybook/react'
import { ForgotPasswordForm } from '@/view/modules/auth/components/ForgotPasswordForm/ForgotPasswordForm'

const meta = {
  title: 'Auth/ForgotPasswordForm',
  component: ForgotPasswordForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPassword: Story = {}
