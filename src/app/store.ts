import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/api/base-api'
import { userReducer } from '@/view/modules/auth/slices/auth-slice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppRootStateType = ReturnType<typeof store.getState>
