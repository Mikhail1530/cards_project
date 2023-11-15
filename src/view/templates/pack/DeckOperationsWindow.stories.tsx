import { Meta, StoryObj } from '@storybook/react'
import { DeckOperationsWindow } from '@/view/templates'

const meta = {
  argTypes: {},
  component: DeckOperationsWindow,
  tags: ['autodocs'],
  title: 'Templates/DeckOperationsWindow',
} satisfies Meta<typeof DeckOperationsWindow>

export default meta

type Story = StoryObj<typeof meta>

export const PackTemplateCard: Story = {
  args: {
    header: 'Header',
    packName: 'Pack name',
    acceptBtnText: 'Accept button',
  },
}
