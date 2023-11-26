import { Meta, StoryObj } from '@storybook/react'
import { AddDeckForm } from '../../../../index'

const meta = {
  argTypes: {},
  component: AddDeckForm,
  tags: ['autodocs'],
  title: 'Components/AddDeckForm',
} satisfies Meta<typeof AddDeckForm>

export default meta

type Story = StoryObj<typeof meta>

export const aAddPack: Story = {
  args: {
    // header: 'Add New Pack',
    // acceptBtnText: 'Add New Pack',
    // onSubmit: () => {},
    // packName: 'packName',
  },
}
