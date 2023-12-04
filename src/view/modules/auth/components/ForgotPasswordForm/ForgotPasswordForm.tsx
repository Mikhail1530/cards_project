import { useForm } from 'react-hook-form'
import { Button } from '@/view/ui/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/view/ui/Card'
import { Typography } from '@/view/ui/Typography'
import s from './ForgotPasswordForm.module.scss'
import { ControlledTextField } from '../../../../ui'
import { Link } from 'react-router-dom'
import { RecoverPasswordArgs } from '@/api/services/auth/auth.types'

type FormValues = z.infer<typeof forgotPasswordSchema>

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

type ForgotPasswordFormProps = {
  onSubmit: (data: RecoverPasswordArgs) => void
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const handleFormSubmit = (data: FormValues) => {
    //FIXME how to handle typuzation errors
    // @ts-ignore
    data['html'] = htmlValue
    // @ts-ignore
    data['subject'] = ''
    // @ts-ignore
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/*TODO: since button is in form, then form automatically pass the ref to button and we don't have to specify that? */}
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Forgot your password?
          </Typography>
          <div className={s.form}>
            <ControlledTextField
              control={control}
              errorMessage={errors.email?.message}
              label={'Email'}
              name={'email'}
            />
            <Typography as={'div'} className={s.instructions} variant={'body2'}>
              Enter your email address and we will send you further instructions
            </Typography>
          </div>
          <div className={s.signupContainer}>
            <Button className={s.button} type="submit" variant={'primary'}>
              Send instructions
            </Button>
            <Typography className={s.signupItem} as={'div'} variant={'body2'}>
              Did you remember your password?
            </Typography>
            <Typography as={Link} to={'/login'} className={s.signupLink} variant={'link1'}>
              Try to log in
            </Typography>
          </div>
        </div>
      </Card>
    </form>
  )
}

const htmlValue = `<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:3000/reset-password/##token##">here</a> to recover your password</p>`
