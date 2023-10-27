import type { Meta, StoryObj } from '@storybook/react'
import { PersonalInformationForm } from './PersonalInformationForm'

const meta = {
  title: 'Profile/PersonalInformationForm',
  component: PersonalInformationForm,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformationForm>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalInformationFormStories: Story = {}
