import { Meta, StoryObj } from '@storybook/react'
import { Slider as RSlider } from './Slider'

const meta = {
  component: RSlider,
  tags: ['autodocs'],
  title: 'UI/Slider',
} satisfies Meta<typeof RSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Slider: Story = {
  args: {
    cardsCount: [10],
    onSubmit: () => {},
    minCardsCount: 0,
    maxCardsCount: 100,
  },
}
