import { useLoginMutation, useSignUpMutation } from '@/api/services/auth/auth.service'
import { SignUpArgs } from '@/api/services/auth/auth.types'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/view/modules'
import { Page } from '@/view/ui'
import { SignUpForm } from '@/view/modules/auth/components/SignUpForm/SignUpForm'
import Loading from '@/view/assets/components/Loading/Loading'

export const SignUpPage = () => {
  const [signUp, { isLoading }] = useSignUpMutation()
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  if (isLoading) {
    return <Loading />
  }

  const handleSignUp = async (args: SignUpArgs) => {
    try {
      await signUp(args)
      await login(args)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Page>
      <Header text={'Login'} />
      <SignUpForm onSubmit={handleSignUp} />
    </Page>
  )
}
