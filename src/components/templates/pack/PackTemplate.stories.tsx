import { Meta, StoryObj } from '@storybook/react'
import { PackTemplate } from '@/components/templates/pack/PackTemplate'

const meta = {
  argTypes: {},
  component: PackTemplate,
  tags: ['autodocs'],
  title: 'Components/PackTemplate',
} satisfies Meta<typeof PackTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const PackTemplateCard: Story = {
  args: {
    header: 'Add new pack',
    packName: 'Name',
  },
}
