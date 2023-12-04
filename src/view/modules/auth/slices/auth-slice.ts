import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthMeResponseType } from '@/api/services/auth/auth.types'

// Make the initial state type partial or undefined.
// Otherwise you have to implement all properties of AuthMeResponseType and set defaultValues as '' etc...
const initialState: Partial<AuthMeResponseType> = {}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // @ts-ignore
    setUserDataAC(state, action: PayloadAction<AuthMeResponseType | {}>) {
      return action.payload
    },
    // @ts-ignore
    clearUsereDataAC: state => {
      return {}
    },
  },
})

export const userReducer = slice.reducer
export const userActions = slice.actions
