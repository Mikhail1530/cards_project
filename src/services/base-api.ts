import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetDecksArgs, GetDecksResponse } from '@/services/flashcards.types.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  // baseQuery consider as instance.axios
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true') // for this project to keep us "authorized" for server
    },
  }),
  // refetchOnFocus: true,
  endpoints: builder => {
    return {
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        // getDeck (key) is name of endpoint that we see in reduxTools
        // GetDecksResponse -> the endpoint response object that the server would return
        // GetDecksArgs -> data that we would pass to the hook
        query: args => {
          return {
            url: `v1/decks`,
            params: args ?? {},
          }
        },
        // The `query: () => 'v1/decks'` is defining the API endpoint URL
        // path that should be used for the `getDecks` query.
        //
        // This line means when you call the `useGetDecksQuery` hook in your component,
        // it's going to make an HTTP GET request to the endpoint
        // `'https://api.flashcards.andrii.es/v1/decks'`.
      }),
    }
  },
})

export const { useGetDecksQuery } = baseApi // hooks that createApi function returns
