export type GetDecksResponse = {
  maxCardsCount: number
  pagination: GetDecksResponsePagination
  items: GetDecksResponseItems[]
}

export type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  currentPage?: number
  itemsPerPage?: number
  name?: string
  authorId?: string
  orderBy?: string
}

export type GetDecksResponsePagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
export type GetDecksResponseItemsAuthor = {
  id: string
  name: string
}
export type GetDecksResponseItems = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: GetDecksResponseItemsAuthor
}
