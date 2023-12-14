import { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu as RDropDownMenu } from './DropDownMenu'
import { ExtraMenu } from '@/view/assets/icons/extraMenu/ExtraMenu'

const meta = {
  component: RDropDownMenu,
  tags: ['autodocs'],
  title: 'UI/DropDownMenu',
} satisfies Meta<typeof RDropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

const triggerIcon = <ExtraMenu />
export const DropDownMenu: Story = {
  args: {
    triggerIcon,
    children: triggerIcon,
  },
}
