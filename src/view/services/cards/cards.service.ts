import { baseApi } from '@/view/services/base-api'
import { CreateCardResponseType, UpdateCardResponseType } from '@/view/services/cards/cards.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<
        CreateCardResponseType,
        { formData: FormData; id: string | undefined }
      >({
        query: ({ formData, id }) => {
          debugger
          return {
            url: `v1/decks/${id}/cards`,
            method: 'POST',
            body: formData ?? {},
          }
        },
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation<
        UpdateCardResponseType,
        { formData: FormData; id: string | undefined }
      >({
        query: ({ formData, id }) => {
          return {
            url: `v1/cards/${id}`,
            method: 'PATCH',
            body: formData ?? {},
          }
        },
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useCreateCardMutation, useUpdateCardMutation } = cardsService
