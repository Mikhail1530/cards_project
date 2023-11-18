import { Meta, StoryObj } from '@storybook/react'
import { AddDeck } from '../..'

const meta = {
  argTypes: {},
  component: AddDeck,
  tags: ['autodocs'],
  title: 'Components/AddDeck',
} satisfies Meta<typeof AddDeck>

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
