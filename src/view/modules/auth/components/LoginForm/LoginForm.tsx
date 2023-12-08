import { useForm } from 'react-hook-form'
import { Button } from '@/view/ui/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/view/ui/Card'
import { Typography } from '@/view/ui/Typography'
import s from './LoginForm.module.scss'
import { ControlledCheckbox, ControlledTextField } from '../../../../ui'
import { Link } from 'react-router-dom'

export type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(3, 'Too short password. It should be at least 3 symbols').max(25),
  rememberMe: z.boolean().optional(),
})

type LoginProps = {
  onSubmit: (data: FormValues) => void
}

export const LoginForm = ({ onSubmit }: LoginProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Sign in
          </Typography>
          <div className={s.form}>
            <ControlledTextField
              control={control}
              errorMessage={errors.email?.message}
              label={'Email'}
              name={'email'}
            />
            <ControlledTextField
              control={control}
              errorMessage={errors.password?.message}
              label={'Password'}
              type={'password'}
              name={'password'}
            />
            <ControlledCheckbox
              className={s.checkbox}
              label={'Remember me'}
              control={control}
              name={'rememberMe'}
            />
            <Typography
              as={Link}
              to={'/forgotPassword'}
              className={s.recoverPasswordLink}
              variant={'body2'}
            >
              Forgot Password?
            </Typography>
          </div>
          <div className={s.signupContainer}>
            <Button className={s.button} type="submit" variant={'primary'}>
              Sign In
            </Button>
            <Typography className={s.signupItem} as={'div'} variant={'body2'}>
              Don't have an account?
            </Typography>
            <Typography as={Link} to={'/signUp'} className={s.signupLink} variant={'link1'}>
              Sign up
            </Typography>
            {/*//FIXME: element should be clickable link */}
          </div>
        </div>
      </Card>
    </form>
  )
}
