import { useForm } from 'react-hook-form'
import { TextField } from '@/view/ui/TextField/TextField'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/view/ui/Card'
import { Typography } from '@/view/ui/Typography'
import s from './SignUpForm.module.scss'
import { Button } from '@/view/ui/Button'
import { ControlledTextField } from '@/view/components/shared-controlled/ControlledTextField/ControlledTextField'
import { SignUpArgs } from '@/api/services/auth/auth.types'
import { Link } from 'react-router-dom'

type FormValues = z.infer<typeof signupSchema>

const signupSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(3, 'Too short password. It should be at lesst 3 symbols').max(25),
    confirmPassword: z
      .string()
      .min(3, 'Too short password. It should be at least 3 symbols')
      .max(25),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })

type SignUpProps = {
  onSubmit: (data: SignUpArgs) => void
}

export const SignUpForm = ({ onSubmit }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const handleSignUpSubmit = (data: FormValues) => {
    // Remove "confirmPassword" property
    const { confirmPassword, ...newData } = data

    // Add new properties
    const modifiedData = {
      ...newData,
      html: htmlValue,
      email: data.email,
      password: data.password,
      name: data.email.slice(0, 6),
      subject: '',
      sendConfirmationEmail: false,
    }

    onSubmit(modifiedData)
  }

  return (
    <form onSubmit={handleSubmit(handleSignUpSubmit)}>
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Sign Up
          </Typography>
          <div className={s.form}>
            <ControlledTextField
              name={'email'}
              control={control}
              errorMessage={errors.email?.message}
              label={'Email'}
            />
            <ControlledTextField
              control={control}
              name={'password'}
              errorMessage={errors.password?.message}
              label={'Password'}
            />
            <TextField
              {...register('confirmPassword')}
              errorMessage={errors.confirmPassword?.message}
              label={'Confirm password'}
            />
          </div>
          <div className={s.signupContainer}>
            <Button className={s.button} type="submit" variant={'primary'}>
              Sign Up
            </Button>
            <Typography className={s.signupItem} as={'div'} variant={'body2'}>
              Don't have an account?
            </Typography>
            <Typography as={Link} to={'/login'} className={s.signupLink} variant={'link1'}>
              Sign in
            </Typography>
          </div>
        </div>
      </Card>
    </form>
  )
}

const htmlValue =
  '<b>Hello, ##name##!</b><br/>Please confirm your email by clicking on the link below:<br/><a href="http://localhost:3000/confirm-email/##token##">Confirm email</a>. If it doesn\'t work, copy and paste the following link in your browser:<br/>http://localhost:3000/confirm-email/##token##'
