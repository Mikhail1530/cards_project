import { Meta, StoryObj } from '@storybook/react'
import { AddDeckForm } from '@/view/modules'

const meta = {
  argTypes: {},
  component: AddDeckForm,
  tags: ['autodocs'],
  title: 'Components/AddDeckForm',
} satisfies Meta<typeof AddDeckForm>

export default meta

type Story = StoryObj<typeof meta>

export const AddDeck: Story = {
  args: {
    onSubmit: () => {},
    open: true,
    onClose: () => {},
    icon: <span>icon</span>,
    // header: 'Add New Pack',
    // acceptBtnText: 'Add New Pack',
    // onSubmit: () => {},
    // packName: 'packName',
  },
}
