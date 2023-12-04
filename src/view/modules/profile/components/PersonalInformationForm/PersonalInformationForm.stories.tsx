import type { Meta, StoryObj } from '@storybook/react'
import { PersonalInformationForm } from '@/view/modules/profile'
import { useState } from 'react'
import { Bin } from '@/view/assets'

const meta = {
  title: 'Profile/PersonalInformationForm',
  component: PersonalInformationForm,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformationForm>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalInformationFormStories: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <PersonalInformationForm
        avatar={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRTYbYaWZbc9r4KKdclIUiwO6JRrHgSpRQjB7RTA&s'
        }
        nickname="bob"
        email="dummy@data.com"
        open={open}
        onClose={() => setOpen(!open)}
        onSubmit={() => {}}
        icon={<Bin />}
        logout={() => {}}
      />
    )
  },
  args: {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRTYbYaWZbc9r4KKdclIUiwO6JRrHgSpRQjB7RTA&s',
    nickname: 'bob',
    email: 'dummy@data.com',
    open: false,
    onClose: () => {},
    icon: <Bin />,
  },
}
