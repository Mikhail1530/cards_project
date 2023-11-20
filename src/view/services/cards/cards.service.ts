import { baseApi } from '@/view/services/base-api'
import { CreateCardResponseType } from '@/view/services/cards/cards.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<CreateCardResponseType, { formData: FormData; id: string }>({
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
    }
  },
})

export const { useCreateCardMutation } = cardsService
