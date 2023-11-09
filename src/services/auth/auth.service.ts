import { baseApi } from '@/services/base-api'
import { AuthMeResponseType, LoginArgs } from '@/services/auth/auth.types'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<void, LoginArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: `v1/auth/login`,
      }),
      invalidatesTags: ['AuthMe'],
    }),
    authMe: builder.query<AuthMeResponseType, void>({
      query: () => `v1/auth/me`,
      providesTags: ['AuthMe'],
    }),
  }),
})

export const { useLoginMutation, useAuthMeQuery } = authService
