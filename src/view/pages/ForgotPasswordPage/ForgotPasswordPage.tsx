import { Header } from '@/view/modules'
import { Page } from '@/view/ui'
import { ForgotPasswordForm } from '@/view/modules/auth/components/ForgotPasswordForm/ForgotPasswordForm'
import { useForgotPasswordMutation } from '@/api/services/auth/auth.service'
import { RecoverPasswordArgs } from '@/api/services/auth/auth.types'
import { useState } from 'react'
import { CheckEmailModal } from '@/view/modules/auth/components/CheckEmailModal/CheckEmailModal'

export const ForgotPasswordPage = () => {
  const [state, setState] = useState({
    email: '',
    isEmailModalVisible: false,
  })
  const [callForgotPassword] = useForgotPasswordMutation()

  const handleForgotYourPassword = async (args: RecoverPasswordArgs) => {
    try {
      await callForgotPassword(args)
      setState({ email: args.email, isEmailModalVisible: true })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Page>
      <Header text={'Login'} />
      {state.isEmailModalVisible ? (
        <CheckEmailModal email={state.email} />
      ) : (
        <ForgotPasswordForm onSubmit={handleForgotYourPassword} />
      )}
    </Page>
  )
}
