import { Meta, StoryObj } from '@storybook/react'
import { AddDeck as addPack } from '@/view/modules'

const meta = {
  argTypes: {},
  component: addPack,
  tags: ['autodocs'],
  title: 'Components/AddDeck',
} satisfies Meta<typeof addPack>

export default meta

type Story = StoryObj<typeof meta>

export const AddPack: Story = {
  args: {
    header: 'Add New Pack',
    acceptBtnText: 'Add New Pack',
    onSubmit: () => {},
    packName: 'packName',
  },
}
