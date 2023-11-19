export type GetDecksResponse = {
  maxCardsCount: number
  pagination: Pagination
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

export type RetrieveCardInDeckResponseType = {
  pagination: Pagination
  items: Card[]
}

export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo: string
  answerVideo: string
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}

export type GetDeckByIdResponse = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: any
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
}
export type UpdateDeckResponseType = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: any
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
  author: { id: string; name: string }
}

export type DeleteDeckResponseType = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export type DeleteDeckArgs = {
  id: string | undefined
}

export type GetCardsByDeckIdArgs = {
  id: string | undefined
  currentPage?: number
  itemsPerPage?: number
}

export type GetDeckByIdArgs = {
  id: string | undefined
}

export type CreateDeckArgs = {
  name: string
  cover?: string
  isPrivate?: boolean
}

export type UpdateDeckArgs = {
  id: string
  // cover?: string
  name?: string
  isPrivate?: boolean
}

export type Pagination = {
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
