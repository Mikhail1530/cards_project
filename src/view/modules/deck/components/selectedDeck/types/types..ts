import { GetDecksResponseItems } from '@/view/services/decks/decks.types'

export type CurrentDeckOptions = 'edit' | 'delete'
export type SetCurrentDeckUseStateType = {
  key: CurrentDeckOptions
  val: GetDecksResponseItems
} | null
