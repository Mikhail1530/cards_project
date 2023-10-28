import type { Meta, StoryObj } from '@storybook/react'
import { PersonalInformationForm } from './PersonalInformationForm'

const meta = {
  title: 'Profile/PersonalInformationForm',
  component: PersonalInformationForm,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformationForm>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalInformationFormStories: Story = {
  args: {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRTYbYaWZbc9r4KKdclIUiwO6JRrHgSpRQjB7RTA&s',
    name: 'bob',
    email: 'dummy@data.com',
    changeAvatar: () => console.log('changeAvatar'),
    saveChangedName: () => console.log('saveChanges'),
    changeName: () => console.log('changeName'),
  },
}
