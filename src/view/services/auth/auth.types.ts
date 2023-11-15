export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}
export type AuthMeResponseType = {
  avatar?: null | string
  id: string
  email: string
  isEmailVerified: boolean // TODO: optional task to make email verification
  name: string // TODO: optional to add name field to login/signup form
  created: string
  updated: string
}
