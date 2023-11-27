import { baseApi } from '@/view/services/base-api'
import {
  CreateCardResponseType,
  DeleteCardArgs,
  UpdateCardResponseType,
} from '@/view/services/cards/cards.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<
        CreateCardResponseType,
        { deckId: string | undefined; formData: FormData }
      >({
        query: ({ deckId, formData }) => {
          return {
            url: `v1/decks/${deckId}/cards`,
            method: 'POST',
            body: formData ?? {},
          }
        },
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation<
        UpdateCardResponseType,
        { cardId: string | undefined; formData: FormData }
      >({
        query: ({ cardId, formData }) => {
          console.log('123')
          return {
            url: `v1/cards/${cardId}`,
            method: 'PATCH',
            body: formData ?? {},
          }
        },
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation<void, DeleteCardArgs>({
        query: ({ cardId }) => {
          return {
            url: `v1/cards/${cardId}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useCreateCardMutation, useUpdateCardMutation, useDeleteCardMutation } = cardsService
