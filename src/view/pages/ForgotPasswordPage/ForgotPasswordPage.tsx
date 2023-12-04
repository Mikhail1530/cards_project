import { useNavigate } from 'react-router-dom'
import { Header } from '@/view/modules'
import { Page } from '@/view/ui'
import { ForgotPasswordForm } from '@/view/modules/auth/components/ForgotPasswordForm/ForgotPasswordForm'
import { useForgotPasswordMutation } from '@/api/services/auth/auth.service'
import { RecoverPasswordArgs } from '@/api/services/auth/auth.types'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [callForgotPassword] = useForgotPasswordMutation()

  const handleForgotYourPassword = async (args: RecoverPasswordArgs) => {
    try {
      await callForgotPassword(args)
      navigate('/confirm-email/?')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Page>
      <Header text={'Login'} />
      <ForgotPasswordForm onSubmit={handleForgotYourPassword} />
    </Page>
  )
}
