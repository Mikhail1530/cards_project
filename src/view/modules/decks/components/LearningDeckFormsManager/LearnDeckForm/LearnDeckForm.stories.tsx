import { Meta, StoryObj } from '@storybook/react'
import { LearnDeckForm as SLearnDeckCard } from '@/view/modules/decks'

const meta = {
  argTypes: {},
  component: SLearnDeckCard,
  tags: ['autodocs'],
  title: 'Components/LearnDeckForm',
} satisfies Meta<typeof SLearnDeckCard>

export default meta

type Story = StoryObj<typeof meta>

export const LearnDeckForm: Story = {
  args: {},
}
