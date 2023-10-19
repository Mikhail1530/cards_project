import type { Meta, StoryObj } from '@storybook/react'
import MyCheckbox from "@/components/ui/Сheckbox/MyCheckbox.tsx";

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: MyCheckbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof MyCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const checkboxDefault: Story = {
  args: {
    children: 'default Checkbox',
  },
}