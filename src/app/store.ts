import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/api/base-api'
import { userReducer } from '@/view/modules/auth/slices/auth-slice'
import { decksReducer } from '@/view/modules/decks/slice/DecksSlice'
import { cardsReducer } from '@/view/modules/cards/slice/cards.slice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: userReducer,
    decks: decksReducer,
    cards: cardsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppRootStateType = ReturnType<typeof store.getState>
