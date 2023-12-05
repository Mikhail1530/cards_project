import { baseApi } from '@/api/base-api'
import {
  AuthMeResponseType,
  LoginArgs,
  RecoverPasswordArgs,
  ResetPasswordArgs,
  SignUpArgs,
  SignUpResponseType,
} from '@/api/services/auth/auth.types'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<void, LoginArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: `v1/auth/login`,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => {
        return {
          method: 'POST',
          url: `v1/auth/logout`,
        }
      },
      invalidatesTags: ['AuthMe'],
    }),
    signUp: builder.mutation<SignUpResponseType, SignUpArgs>({
      query: body => {
        return {
          body,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }
      },
    }),
    authMe: builder.query<AuthMeResponseType, { skip: boolean } | void>({
      query: () => `v1/auth/me`,
      providesTags: ['AuthMe'],
    }),
    updatePersonalInfo: builder.mutation<AuthMeResponseType, FormData>({
      query: body => ({
        body,
        method: 'PATCH',
        url: `v1/auth/me`,
      }),
      invalidatesTags: ['AuthMe'],
    }),
    forgotPassword: builder.mutation<void, RecoverPasswordArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: `v1/auth/recover-password`,
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordArgs>({
      query: ({ password, token }) => ({
        method: 'POST',
        url: `v1/auth/reset-password/${token}`,
        body: { password },
      }),
    }),
  }),
})

export const {
  useAuthMeQuery,
  useUpdatePersonalInfoMutation,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authService
