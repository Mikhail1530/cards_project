import { usePagination, DOTS } from './usePagination'
import s from './pagination.module.scss'
import { clsx } from 'clsx'

export const Pagination = (props: PaginatorPropsType) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props

  const classNames = {
    paginationContainer: clsx(s.paginationContainer, className),
  }

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })
  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={classNames['paginationContainer']}>
      {/* Left navigation arrow */}
      <li className={clsx(s.paginationItem, { disabled: currentPage === 1 })} onClick={onPrevious}>
        <div className={s.arrowLeft} />
      </li>
      {paginationRange.map((pageNumber, idx) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={idx} className={s.paginationItemDots}>
              &#8230;
            </li>
          )
        }

        // Render our Page Pills
        return (
          <li
            key={idx}
            className={clsx(s.paginationItem, { selected: pageNumber === currentPage })}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        )
      })}
      {/*  Right Navigation arrow */}
      <li
        className={clsx(s.paginationItem, {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className={s.arrowRight} />
      </li>
    </ul>
  )
}

type PaginatorPropsType = {
  onPageChange: (pageNumber: number) => void
  totalPages: number
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
  className?: string
}

// function getPaginationNumbers(currentPage: number, totalPages: number, numPagesToShow: number) {
//   let startPage = 1
//   let endPage = totalPages
//   let pages = []
//
//   if (totalPages <= numPagesToShow) {
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i)
//     }
//   } else {
//     const maxPagesBeforeCurrentPage = Math.floor(numPagesToShow / 2)
//     const maxPagesAfterCurrentPage = Math.ceil(numPagesToShow / 2) - 1
//
//     // When current page is near the beginning
//     if (currentPage <= maxPagesBeforeCurrentPage) {
//       endPage = numPagesToShow
//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i)
//       }
//       pages.push('...')
//     }
//
//     // When current page is near the end
//     else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
//       startPage = totalPages - numPagesToShow + 1
//       for (let i = startPage; i <= totalPages; i++) {
//         pages.push(i)
//       }
//       pages.unshift('...')
//     }
//
//     // When current page is in the middle
//     else {
//       startPage = currentPage - maxPagesBeforeCurrentPage
//       endPage = currentPage + maxPagesAfterCurrentPage
//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i)
//       }
//       pages.push('...')
//       pages.unshift('...')
//     }
//   }
//   return pages
// }
