import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField/TextField.tsx'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/Card'
import { Typography } from '../../ui/Typography'
import s from './CreateNewPasswordForm.module.scss'

type FormValues = z.infer<typeof createNewPasswordSchema>

const createNewPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(3, 'Too short password').max(25),
  rememberMe: z.boolean().optional(),
})

type LoginProps = {
  onSubmit: (data: FormValues) => void
}

export const CreateNewPasswordForm = ({ onSubmit }: LoginProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Create new password
          </Typography>
          <div className={s.form}>
            <TextField
              {...register('password')}
              errorMessage={errors.password?.message}
              label={'Password'}
            />
            <Typography className={s.instructions} as={'a'} variant={'body2'}>
              Create new password and we will send you further instructions to email
            </Typography>
          </div>
          <div className={s.signupContainer}>
            <Button className={s.button} type="submit" variant={'primary'}>
              Create New Password
            </Button>
            {/*//FIXME: element should be clickable link */}
          </div>
        </div>
      </Card>
    </form>
  )
}
