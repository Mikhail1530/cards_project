import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/api/base-query-with-reauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  // baseQuery consider as instance.axios
  tagTypes: ['Decks', 'AuthMe', 'Cards', 'login'],
  baseQuery: baseQueryWithReauth,
  // refetchOnFocus: true,
  endpoints: () => ({}),
})
