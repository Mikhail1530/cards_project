import { CreateNewPasswordForm } from '@/view/modules/auth/components/CreateNewPasswordForm/CreateNewPasswordForm'
import { Header } from '@/view/modules'
import s from './ResetPasswordPage.module.scss'
import { useResetPasswordMutation } from '@/api/services/auth/auth.service'
import { ResetPasswordArgs } from '@/api/services/auth/auth.types'
import { ErrorModal } from '@/view/assets'

const ResetPasswordPage = () => {
  // We pass resetPassword hook where we pass all args that goes to API call.
  const [resetPassword, { isSuccess, isError, error }] = useResetPasswordMutation()

  const handleResetPassword = async (args: ResetPasswordArgs) => {
    try {
      await resetPassword(args)
    } catch {
      console.log(error)
    }
  }

  if (isError) {
    // @ts-ignore
    return <ErrorModal errorMessage={error?.data.message} />
  }

  return (
    <div className={s.resetPasswordPageContainer}>
      <Header />
      {isSuccess && <div>CONGRATS!!!!</div>}
      <CreateNewPasswordForm onSubmit={handleResetPassword} />
    </div>
  )
}

export default ResetPasswordPage
