import { GetDecksResponseItems as DeckType } from '@/view/services/decks/decks.types'

export type SelectedDeckStatusOptions = 'edit' | 'delete'
export type SetCurrentDeckUseStateType = {
  key: SelectedDeckStatusOptions
  val: DeckType
} | null
