import { CreateNewPasswordForm } from '@/view/modules/auth/components/CreateNewPasswordForm/CreateNewPasswordForm'
import { Header } from '@/view/modules'
import { useResetPasswordMutation } from '@/api/services/auth/auth.service'
import { ResetPasswordArgs } from '@/api/services/auth/auth.types'
import { ErrorModal } from '@/view/assets'
import { Page } from '@/view/ui'

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
    <>
      <Header />
      <Page>
        {isSuccess && <div>CONGRATS!!!!</div>}
        <CreateNewPasswordForm onSubmit={handleResetPassword} />
      </Page>
    </>
  )
}

export default ResetPasswordPage
