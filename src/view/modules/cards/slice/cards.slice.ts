import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppRootStateType } from '@/app/store'

type ImagePreviewType = string | ArrayBuffer | null

const initialState = {
  questionImagePreview: '' as ImagePreviewType,
  answerImagePreview: '' as ImagePreviewType,
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setQuestionImagePreview(state, action: PayloadAction<ImagePreviewType>) {
      state.questionImagePreview = action.payload
    },
    setAnswerImagePreview(state, action: PayloadAction<ImagePreviewType>) {
      state.answerImagePreview = action.payload
    },
  },
})

export const cardsReducer = cardsSlice.reducer
export const cardsActions = cardsSlice.actions

export const questionImgSelector = (state: AppRootStateType) => state.cards.questionImagePreview
export const answerImgSelector = (state: AppRootStateType) => state.cards.answerImagePreview
