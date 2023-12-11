import { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu as RDropDownMenu } from './DropDownMenu'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Bin } from '@/view/assets'
import { ExtraMenu } from '@/view/assets/icons/extraMenu/ExtraMenu'

const meta = {
  component: RDropDownMenu,
  tags: ['autodocs'],
  title: 'UI/DropDownMenu',
} satisfies Meta<typeof RDropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

const itemsToGenerate = ['Learn', 'Edit', 'Delete']
const icons = [<ChevronRightIcon />, <Bin />, <Bin />]
const triggerIcon = <ExtraMenu />
export const DropDownMenu: Story = {
  args: {
    triggerIcon,
    itemsToGenerate,
    icons,
  },
}
