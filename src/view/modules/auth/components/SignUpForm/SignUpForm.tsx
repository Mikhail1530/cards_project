import { useForm } from 'react-hook-form'
import { TextField } from '@/view/ui/TextField/TextField'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/view/ui/Card'
import { Typography } from '@/view/ui/Typography'
import s from './SignUpForm.module.scss'
import { Button } from '@/view/ui/Button'

type FormValues = z.infer<typeof signupSchema>

const signupSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(3, 'Too short password').max(25),
    confirmPassword: z.string().min(3, 'Too short password').max(25),
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
  onSubmit: (data: FormValues) => void
}

export const SignUpForm = ({ onSubmit }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Sign Up
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
            <Typography as={'a'} className={s.signupLink} variant={'link1'}>
              Sign in
            </Typography>
            {/*//FIXME: element should be clickable link */}
          </div>
        </div>
      </Card>
    </form>
  )
}
