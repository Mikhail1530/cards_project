import { string } from 'zod'

export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}
export type AuthMeResponseType = {
  avatar?: string
  id: string
  email: string
  isEmailVerified: boolean // TODO: optional task to make email verification
  name: string // TODO: optional to add name field to login/signup form
  created: string
  updated: string
}

export type SignUpResponseType = AuthMeResponseType
export type SignUpArgs = {
  html: string
  name: string
  password: string
  email: string
  subject: string
  sendConfirmationEmail: boolean
}

export type RecoverPasswordArgs = {
  html: string
  email: string
  subject: string
}
