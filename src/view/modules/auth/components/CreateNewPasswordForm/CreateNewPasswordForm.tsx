import { useForm } from 'react-hook-form'
import { Button } from '@/view/ui/Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/view/ui/Card'
import { Typography } from '@/view/ui/Typography'
import s from './CreateNewPasswordForm.module.scss'
import { ControlledTextField } from '../../../../ui'
import { useParams } from 'react-router-dom'

type FormValues = z.infer<typeof createNewPasswordSchema>

const createNewPasswordSchema = z.object({
  password: z.string().min(3, 'Too short password. It should be at least 3 symbols').max(25),
  token: z.string(),
})

type CreateNewPasswordFormProps = {
  onSubmit: (data: FormValues) => void
}

export const CreateNewPasswordForm = ({ onSubmit }: CreateNewPasswordFormProps) => {
  const { token } = useParams()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: { password: '', token },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <div className={s.signInContainer}>
          <Typography as={'div'} className={s.caption} variant={'h1'}>
            Create new password
          </Typography>
          <div className={s.form}>
            <ControlledTextField
              control={control}
              errorMessage={errors.password?.message}
              label={'Password'}
              type={'password'}
              name={'password'}
            />
            <Typography className={s.instructions} variant={'body2'}>
              Create new password and we will send you further instructions to email
            </Typography>
          </div>
          <div className={s.signupContainer}>
            <Button className={s.button} type="submit" variant={'primary'}>
              Create New Password
            </Button>
          </div>
        </div>
      </Card>
    </form>
  )
}
