import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField/TextField.tsx'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ControlledCheckbox from '@/components/controlled/ControlledCheckbox/ControlledCheckbox.tsx'
import { Card } from '@/components/ui/Card'
import { Typography } from '../../ui/Typography'
import s from './LoginForm.module.scss'

type FormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(3, 'Too short password').max(25),
  rememberMe: z.boolean().optional(),
})

type LoginProps = {
  onSubmit: () => void
}

export const LoginForm = ({ onSubmit }: LoginProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const handleFormSubmit = (data: FormValues) => {
    console.log(data)
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Sign in
          </Typography>
          <div className={s.form}>
            <TextField
              {...register('email')}
              errorMessage={errors.email?.message}
              label={'Email'}
            />
            <TextField
              {...register('password')}
              errorMessage={errors.password?.message}
              label={'Password'}
              type={'password'}
            />
            <ControlledCheckbox
              className={s.checkbox}
              {...register('rememberMe')}
              label={'Remember me'}
              control={control}
              // name={'rememberMe'} зачем в регистре же имя передаем
            />

            <Typography className={s.recoverPasswordLink} as={'a'} variant={'body2'}>
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
            <Typography as={'a'} className={s.signupLink} variant={'link1'}>
              Sign up
            </Typography>
            {/*//FIXME: element should be clickable link */}
          </div>
        </div>
      </Card>
    </form>
  )
}
