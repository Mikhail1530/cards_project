import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sort } from '@/view/ui/Table/Table'
import { AppRootStateType } from '@/app/store'

// Make the initial state type partial or undefined.
// Otherwise you have to implement all properties of AuthMeResponseType and set defaultValues as '' etc...
type ActiveTab = {
  myDeck: boolean
  allDecks: boolean
}

const initialState = {
  sort: null as Sort,
  currentPage: 1,
  itemsPerPage: 10,
  minCardsCount: 0,
  maxCardsCount: 100,
  activeTab: {
    myDeck: false,
    allDecks: true,
  },
  name: '',
  authorId: '',
  orderBy: null as string | null,
}

const decksSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload
    },
    setMinCardsCount(state, action: PayloadAction<number>) {
      state.minCardsCount = action.payload
    },
    setMaxCardsCount(state, action: PayloadAction<number>) {
      state.maxCardsCount = action.payload
    },
    setActiveTab(state, action: PayloadAction<ActiveTab>) {
      state.activeTab = action.payload
    },
    setOrderBy(state, action: PayloadAction<string | null>) {
      state.orderBy = action.payload
    },
    setAuthorId(state, action: PayloadAction<string>) {
      state.authorId = action.payload
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    cleanFilters(state) {
      state.sort = null
      state.currentPage = 1
      state.itemsPerPage = 10
      state.minCardsCount = 0
      state.maxCardsCount = 100
      state.activeTab = {
        myDeck: false,
        allDecks: true,
      }
      state.name = ''
      state.authorId = ''
      state.orderBy = null
    },
  },
})

export const decksReducer = decksSlice.reducer
export const {
  setSort,
  setCurrentPage,
  setItemsPerPage,
  setMinCardsCount,
  setMaxCardsCount,
  setActiveTab,
  setAuthorId,
  setName,
  cleanFilters,
} = decksSlice.actions

export const selectSort = (state: AppRootStateType) => state.decks.sort
export const selectCurrentPage = (state: AppRootStateType) => state.decks.currentPage
export const selectItemsPerPage = (state: AppRootStateType) => state.decks.itemsPerPage
export const selectActiveTab = (state: AppRootStateType) => state.decks.activeTab
export const selectMinCardsCount = (state: AppRootStateType) => state.decks.minCardsCount
export const selectMaxCardsCount = (state: AppRootStateType) => state.decks.maxCardsCount
export const selectAuthorId = (state: AppRootStateType) => state.decks.authorId
export const name = (state: AppRootStateType) => state.decks.name
// memoized
export const selectSortedString = createSelector([selectSort], sort => {
  if (!sort) return null
  return `${sort.key}-${sort.direction}`
})
export const selectOrderBy = createSelector([selectSortedString], sortedString => sortedString)
// instead of
//   const sortedString = useMemo(() => {
//   if (!sort) return null
//   return `${sort.key}-${sort.direction}`
// }, [sort])
