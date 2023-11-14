import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField/TextField.tsx'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import s from './ForgotPasswordForm.module.scss'

type FormValues = z.infer<typeof forgotPasswordSchema>

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

type ForgotPasswordFormProps = {
  onSubmit: (data: FormValues) => void
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*TODO: since button is in form, then form automatically pass the ref to button and we don't have to specify that? */}
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Forgot your password?
          </Typography>
          <div className={s.form}>
            <TextField
              {...register('email')}
              errorMessage={errors.email?.message}
              label={'Email'}
            />
            <Typography as={'div'} className={s.instructions} variant={'body2'}>
              Enter your email address and we will send you further instructions
            </Typography>
          </div>
          <div className={s.signupContainer}>
            <Button className={s.button} type="submit" variant={'primary'}>
              Sign Up
            </Button>
            <Typography className={s.signupItem} as={'div'} variant={'body2'}>
              Did you remember your password?
            </Typography>
            <Typography as={'a'} className={s.signupLink} variant={'link1'}>
              Try logging in
            </Typography>
            {/*//FIXME: element should be clickable link */}
          </div>
        </div>
      </Card>
    </form>
  )
}
