import { Pagination } from './pagination'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta = {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/pagination',
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber)
    }

    return (
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={1}
        totalCount={100}
        itemsPerPage={10}
        currentPage={currentPage}
        handleSetItemsPerPage={() => {}}
      />
    )
  },
  args: {
    handlePageChange: () => {},
    totalPages: 1,
    totalCount: 100,
    itemsPerPage: 10,
    siblingCount: 2,
    currentPage: 1,
  },
}
